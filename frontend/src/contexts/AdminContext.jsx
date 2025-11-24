import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, adminLogout as logoutAPI } from '../services/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('adminToken') || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!adminToken);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  }, [adminToken]);

  const login = async (credentials) => {
    try {
      const response = await adminLogin(credentials);
      if (response.success && response.token) {
        setAdminToken(response.token);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to login',
      };
    }
  };

  const logout = async () => {
    try {
      if (adminToken) {
        await logoutAPI(adminToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAdminToken(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AdminContext.Provider value={{ adminToken, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
