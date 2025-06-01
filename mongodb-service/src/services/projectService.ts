import Machine from '../models/Machine';
import Project, { IProject } from '../models/Project';

export const projectService = {
  // Get all projects
  async getAllProjects(): Promise<IProject[]> {
    return await Project.find();
  },

  // Get a single project by ID
  async getProjectById(id: string): Promise<IProject | null> {
    return await Project.findById(id);
  },

  // Create a new project
  async createProject(projectData: {
    name: string;
    templateId: string;
    details?: {
      inspectionDate?: Date;
      city?: string;
      originallyBought?: string;
      nearestAirport?: string;
      condition?: string;
      millName?: string;
      country?: string;
      delivery?: string;
      askingPrice?: number;
    };
  }): Promise<IProject> {
    const project = new Project(projectData);
    return await project.save();
  },

  // Update a project
  async updateProject(
    id: string,
    projectData: {
      name?: string;
      templateId?: string;
      details?: {
        inspectionDate?: Date;
        city?: string;
        originallyBought?: string;
        nearestAirport?: string;
        condition?: string;
        millName?: string;
        country?: string;
        delivery?: string;
        askingPrice?: number;
      };
    }
  ): Promise<IProject | null> {
    return await Project.findByIdAndUpdate(id, projectData, {
      new: true,
      runValidators: true,
    });
  },

  // Delete a project
  async deleteProject(id: string): Promise<IProject | null> {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    await Machine.deleteMany({ projectId: project._id });
    return await Project.findByIdAndDelete(id);
  },
}; 