import express from 'express';
import {
  createMachineController,
  updateMachineController,
  getMachineController,
  getMachinesByProjectController
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

export default router; 