import express from 'express';
import {
  createMachineController,
  updateMachineController,
  getMachineController,
  getMachinesByProjectController,
  deleteMachineController
} from '../controllers/machineController';

const router = express.Router();

// Create a new machine
router.post('/:projectId', createMachineController);

// Update a machine
router.put('/:machineId', updateMachineController);

// Get a single machine
router.get('/:machineId', getMachineController);

// Get all machines for a project
router.get('/project/:projectId', getMachinesByProjectController);

// Delete a machine
router.delete('/:machineId', deleteMachineController);

export default router; 