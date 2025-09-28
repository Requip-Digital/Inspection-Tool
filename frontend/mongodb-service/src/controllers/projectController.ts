import { Request, Response } from 'express';
import { projectService } from '../services/projectService';
import { generatePDF } from '../services/pdfService';
import fs from 'fs';
import { promisify } from 'util';
import { IProject } from '../models/Project';
import { Types } from 'mongoose';

const unlinkAsync = promisify(fs.unlink);

interface ErrorResponse {
  message: string;
  error?: any;
}

// Extend Request type to include user from JWT middleware
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const projectController = {
  // Get all projects for the authenticated user
  async getAllProjects(req: AuthRequest, res: Response<any[] | ErrorResponse>) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const projects = await projectService.getAllProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Error fetching projects', error });
    }
  },

  // Get a single project by ID (only if owned by the user)
  async getProjectById(req: AuthRequest, res: Response<any | ErrorResponse>) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const project = await projectService.getProjectById(req.params.id, userId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'Error fetching project', error });
    }
  },

  // Create a new project with user ID
  async createProject(req: AuthRequest, res: Response<any | ErrorResponse>) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const projectData = {
        name: req.body.name,
        templateId: req.body.templateId,
        userId, // Add userId to project data
        details: {
          inspectionDate: req.body.details?.inspectionDate,
          city: req.body.details?.city,
          originallyBought: req.body.details?.originallyBought,
          nearestAirport: req.body.details?.nearestAirport,
          condition: req.body.details?.condition,
          millName: req.body.details?.millName,
          country: req.body.details?.country,
          delivery: req.body.details?.delivery,
          askingPrice: req.body.details?.askingPrice,
          noOfMachines: req.body.details?.noOfMachines
        }
      };

      const savedProject = await projectService.createProject(projectData);
      res.status(201).json(savedProject);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(400).json({ message: 'Error creating project', error });
    }
  },

  // Update a project (only if owned by the user)
  async updateProject(req: AuthRequest, res: Response<any | ErrorResponse>) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const projectData = {
        name: req.body.name,
        templateId: req.body.templateId,
        details: {
          inspectionDate: req.body.details?.inspectionDate,
          city: req.body.details?.city,
          originallyBought: req.body.details?.originallyBought,
          nearestAirport: req.body.details?.nearestAirport,
          condition: req.body.details?.condition,
          millName: req.body.details?.millName,
          country: req.body.details?.country,
          delivery: req.body.details?.delivery,
          askingPrice: req.body.details?.askingPrice,
          noOfMachines: req.body.details?.noOfMachines
        }
      };

      const project = await projectService.updateProject(req.params.id, projectData, userId);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(400).json({ message: 'Error updating project', error });
    }
  },

  // Delete a project (only if owned by the user)
  async deleteProject(req: AuthRequest, res: Response<{ message: string } | ErrorResponse>) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const project = await projectService.deleteProject(req.params.id, userId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Error deleting project', error });
    }
  },

  // Export project as PDF (only if owned by the user)
  async exportProject(req: AuthRequest, res: Response) {
    let pdfPath: string | null = null;
    
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const projectDoc = await projectService.getProjectWithMachines(req.params.id, userId);
      
      if (!projectDoc) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }

      // Convert MongoDB document to a plain object
      const projectObj = JSON.parse(JSON.stringify(projectDoc));

      // Generate PDF
      pdfPath = await generatePDF(projectObj);

      // Set headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="inspection_report_${projectObj.name}.pdf"`);

      // Stream the file instead of loading it entirely into memory
      const fileStream = fs.createReadStream(pdfPath);
      fileStream.pipe(res);

      // Handle streaming errors
      fileStream.on('error', async (error) => {
        console.error('Error streaming PDF:', error);
        if (pdfPath) {
          try {
            await unlinkAsync(pdfPath);
          } catch (unlinkError) {
            console.error('Error deleting PDF file:', unlinkError);
          }
        }
        if (!res.headersSent) {
          res.status(500).json({ message: 'Error streaming PDF file' });
        }
      });

      // Clean up after successful stream
      fileStream.on('end', async () => {
        if (pdfPath) {
          try {
            await unlinkAsync(pdfPath);
          } catch (unlinkError) {
            console.error('Error deleting PDF file:', unlinkError);
          }
        }
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      if (pdfPath) {
        try {
          await unlinkAsync(pdfPath);
        } catch (unlinkError) {
          console.error('Error deleting PDF file:', unlinkError);
        }
      }
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error generating PDF', error });
      }
    }
  }
}; 