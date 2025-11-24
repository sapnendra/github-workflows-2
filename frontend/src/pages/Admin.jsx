import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default Admin;

