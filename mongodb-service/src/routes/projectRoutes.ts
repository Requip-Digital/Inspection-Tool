import express from 'express';
import { projectController } from '../controllers/projectController';
import { authenticateToken } from '../utils/jwt';

const router = express.Router();

// Project routes - all protected with authentication
router.get('', authenticateToken, projectController.getAllProjects);
router.get('/:id', authenticateToken, projectController.getProjectById);
router.post('', authenticateToken, projectController.createProject);
router.put('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);
router.post('/:id/export', authenticateToken, projectController.exportProject);

export default router; 