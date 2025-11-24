import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lead API
export const createLead = async (leadData) => {
  try {
    const response = await api.post('/leads', leadData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit lead' };
  }
};

// Admin API
export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to login' };
  }
};

export const getAllClientsData = async (token) => {
  try {
    const response = await api.get('/admin/all-clients', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch clients' };
  }
};

export const getStatusOverview = async (token) => {
  try {
    const response = await api.get('/admin/status', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch status overview' };
  }
};

export const updateClientStatus = async (clientId, statusData, token) => {
  try {
    const response = await api.patch(`/admin/clients/${clientId}/status`, statusData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update client status' };
  }
};

export const adminLogout = async (token) => {
  try {
    const response = await api.post('/admin/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to logout' };
  }
};

