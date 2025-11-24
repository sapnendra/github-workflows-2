import express from 'express';
import {
  adminLogin,
  adminLogout,
  getAllClientsData,
  getStatusOverview,
  updateClientStatus
} from '../controllers/adminController.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/all-clients', authenticateAdmin, getAllClientsData);
router.get('/status', authenticateAdmin, getStatusOverview);
router.patch('/clients/:clientId/status', authenticateAdmin, updateClientStatus);
router.post('/logout', authenticateAdmin, adminLogout);

export default router;