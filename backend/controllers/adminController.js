import jwt from 'jsonwebtoken';
import Lead from '../models/Lead.js';
import { blacklistToken, extractToken } from '../middlewares/authMiddleware.js';

const normalizeStatus = (status) => {
  if (!status) {
    return 'pending';
  }

  const allowedStatuses = ['pending', 'in_progress', 'delivered'];
  const lowerCaseStatus = status.toLowerCase();

  return allowedStatuses.includes(lowerCaseStatus) ? lowerCaseStatus : 'pending';
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.JWT_SECRET;

    if (!adminEmail || !adminPassword || !secret) {
      console.error('Missing admin credentials or JWT secret in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '8h';
    const token = jwt.sign({ email }, secret, { expiresIn });

    return res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
      token,
      expiresIn
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to login admin'
    });
  }
};

export const adminLogout = (req, res) => {
  try {
    const token = req.token || extractToken(req);

    if (token) {
      blacklistToken(token);
    }

    return res.status(200).json({
      success: true,
      message: 'Admin logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to logout admin'
    });
  }
};

export const getAllClientsData = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    console.error('Error fetching clients for admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch clients data'
    });
  }
};

export const getStatusOverview = async (req, res) => {
  try {
    const leads = await Lead.find().select('name email projectType status createdAt updatedAt').sort({ updatedAt: -1 });

    const summary = {
      pending: 0,
      in_progress: 0,
      delivered: 0
    };

    const clientsByStatus = {
      pending: [],
      in_progress: [],
      delivered: []
    };

    leads.forEach((lead) => {
      const status = normalizeStatus(lead.status);
      summary[status] += 1;
      clientsByStatus[status].push(lead);
    });

    const recentActivities = leads.slice(0, 5);

    return res.status(200).json({
      success: true,
      data: {
        summary,
        clientsByStatus,
        recentActivities
      }
    });
  } catch (error) {
    console.error('Error fetching status overview:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch status overview'
    });
  }
};

export const updateClientStatus = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status, note } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status value is required'
      });
    }

    const normalizedStatus = normalizeStatus(status);
    const lead = await Lead.findById(clientId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    lead.status = normalizedStatus;
    lead.statusHistory.push({
      status: normalizedStatus,
      note,
      updatedAt: new Date()
    });

    await lead.save();

    return res.status(200).json({
      success: true,
      message: 'Client status updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error updating client status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update client status'
    });
  }
};

