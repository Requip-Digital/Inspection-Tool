import { Request, Response } from 'express';
import { createMachine, updateMachine, getMachine, getMachinesByProject, deleteMachine } from '../services/machineService';

export const createMachineController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const machine = await createMachine(projectId, req.body);
    res.status(201).json(machine);
  } catch (error: any) {
    res.status(400).json({ message: error?.message || 'Failed to create machine' });
  }
};

export const updateMachineController = async (req: Request, res: Response) => {
  try {
    const { machineId } = req.params;
    const machine = await updateMachine(machineId, req.body);
    if (!machine) {
      return res.status(404).json({ message: 'Machine not found' });
    }
    res.json(machine);
  } catch (error: any) {
    res.status(400).json({ message: error?.message || 'Failed to update machine' });
  }
};

export const getMachineController = async (req: Request, res: Response) => {
  try {
    const { machineId } = req.params;
    const machine = await getMachine(machineId);
    if (!machine) {
      return res.status(404).json({ message: 'Machine not found' });
    }
    res.json(machine);
  } catch (error: any) {
    res.status(400).json({ message: error?.message || 'Failed to get machine' });
  }
};

export const getMachinesByProjectController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const machines = await getMachinesByProject(projectId);
    res.json(machines);
  } catch (error: any) {
    res.status(400).json({ message: error?.message || 'Failed to get machines' });
  }
}; 

export const deleteMachineController = async (req: Request, res: Response) => {
  try {
    const { machineId } = req.params;
    await deleteMachine(machineId);
    res.json({ message: 'Machine deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error?.message || 'Failed to delete machine' });
  }
};