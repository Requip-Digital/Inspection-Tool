import Machine, { IMachine } from '../models/Machine';
import Project, { IProject, IMachineForPDF } from '../models/Project';

export const projectService = {
  // Get all projects for a specific user
  async getAllProjects(userId: string) {
    return await Project.find({ userId });
  },

  // Get a single project by ID (only if owned by the user)
  async getProjectById(id: string, userId: string) {
    return await Project.findOne({ _id: id, userId });
  },

  // Create a new project
  async createProject(projectData: any) {
    const project = new Project(projectData);
    return await project.save();
  },

  // Update a project (only if owned by the user)
  async updateProject(id: string, projectData: any, userId: string) {
    return await Project.findOneAndUpdate(
      { _id: id, userId },
      projectData,
      { new: true }
    );
  },

  // Delete a project (only if owned by the user)
  async deleteProject(id: string, userId: string) {
    return await Project.findOneAndDelete({ _id: id, userId });
  },

  // Get project with machines (only if owned by the user)
  async getProjectWithMachines(id: string, userId: string) {
    return await Project.findOne({ _id: id, userId })
      .populate({
        path: 'machines.id',
        select: 'name sections'
      });
  },
}; 