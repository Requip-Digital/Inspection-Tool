import express from 'express';
import { projectController } from '../controllers/projectController';

const router = express.Router();

// Project routes
router.get('', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/export', projectController.exportProject);

export default router; 