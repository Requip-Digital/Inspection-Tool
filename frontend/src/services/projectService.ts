import { Project as ProjectType } from '../types';
import { config } from '../config';

const API_URL = config.apiUrl;

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const projectService = {
  async getAllProjects(): Promise<ProjectType[]> {
    const response = await fetch(`${API_URL}/projects`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  async getProjectById(id: string): Promise<ProjectType | null> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
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
        ...getAuthHeaders(),
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
        ...getAuthHeaders(),
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
      headers: {
        ...getAuthHeaders(),
      },
    });
    return response.ok;
  },

  async exportProject(id: string): Promise<Blob> {
    const response = await fetch(`${API_URL}/projects/${id}/export`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    return response.blob();
  }
}; 