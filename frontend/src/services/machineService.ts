import { Project as ProjectType, Machine as MachineType } from '../types';

const API_URL = 'http://localhost:5001/api';

export const machineService = {
  async getMachine(machineId: string): Promise<MachineType | null> {
    const response = await fetch(`${API_URL}/machines/${machineId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to get machine');
    }
    return response.json();
  },

  async addMachine(projectId: string, machineData: Omit<MachineType, 'id'>): Promise<ProjectType | null> {
    const response = await fetch(`${API_URL}/machines/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(machineData),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to add machine');
    }
    return response.json();
  },

  async updateMachine(machineId: string, machineData: Partial<MachineType>): Promise<ProjectType | null> {
    const response = await fetch(`${API_URL}/machines/${machineId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(machineData),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update machine');
    }
    return response.json();
  },

  async deleteMachine(projectId: string, machineId: string): Promise<ProjectType | null> {
    const response = await fetch(`${API_URL}/machines/${machineId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to delete machine');
    }
    return response.json();
  }
}; 