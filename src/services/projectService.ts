import { Project as ProjectType } from '../types';

const API_URL = 'http://localhost:5001/api';

export const projectService = {
  async getAllProjects(): Promise<ProjectType[]> {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  async getProjectById(id: string): Promise<ProjectType | null> {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch project');
    }
    return response.json();
  },

  async createProject(projectData: Omit<ProjectType, 'id'>): Promise<ProjectType> {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  async updateProject(id: string, projectData: Partial<ProjectType>): Promise<ProjectType | null> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update project');
    }
    return response.json();
  },

  async deleteProject(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
}; 