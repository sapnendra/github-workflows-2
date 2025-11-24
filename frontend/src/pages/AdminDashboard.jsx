import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { getAllClientsData, getStatusOverview } from '../services/api';
import StatusCard from '../components/admin/StatusCard';
import ClientsTable from '../components/admin/ClientsTable';
import RecentActivities from '../components/admin/RecentActivities';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminToken, isAuthenticated, logout } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState(null);
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statusResponse, clientsResponse] = await Promise.all([
        getStatusOverview(adminToken),
        getAllClientsData(adminToken)
      ]);

      if (statusResponse.success) {
        setStatusData(statusResponse.data);
      }

      if (clientsResponse.success) {
        setClients(clientsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalClients = clients.length;
  // const totalPending = statusData?.summary.pending || 0;
  // const totalInProgress = statusData?.summary.in_progress || 0;
  // const totalDelivered = statusData?.summary.delivered || 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 border">
      {/* Header */}
      <div className="w-7xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Manage your clients and track project status
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">{totalClients} Total</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:-rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50 shadow-lg inline-flex">
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Overview</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'clients'
                    ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>All Clients</span>
                  <span className="ml-1 px-2 py-0.5 bg-white/20 dark:bg-gray-800/20 rounded-full text-xs font-bold">
                    {clients.length}
                  </span>
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && statusData && (
          <div className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard
                title="Pending"
                count={statusData.summary.pending || 0}
                status="pending"
                icon={
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatusCard
                title="In Progress"
                count={statusData.summary.in_progress || 0}
                status="in_progress"
                icon={
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <StatusCard
                title="Delivered"
                count={statusData.summary.delivered || 0}
                status="delivered"
                icon={
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            {/* Recent Activities and Status Groups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivities activities={statusData.recentActivities || []} />
              
              {/* Clients by Status */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Clients by Status</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {Object.entries(statusData.clientsByStatus || {}).map(([status, statusClients]) => {
                    const statusColors = {
                      pending: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
                      in_progress: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
                      delivered: 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    };
                    const color = statusColors[status] || statusColors.pending;
                    return (
                      <div key={status} className={`border-l-4 ${color} pl-4 py-3 rounded-r-lg hover:shadow-md transition-all duration-200`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-200 capitalize">
                            {status.replace('_', ' ')}
                          </span>
                          <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-extrabold text-blue-600 dark:text-blue-400 shadow-sm">
                            {statusClients.length}
                          </span>
                        </div>
                        <div className="space-y-1.5 mt-2">
                          {statusClients.slice(0, 3).map((client) => (
                            <div key={client._id} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                              <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                              <span>{client.name}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 dark:text-gray-500">{client.projectType}</span>
                            </div>
                          ))}
                          {statusClients.length > 3 && (
                            <div className="text-xs text-gray-500 dark:text-gray-500 font-bold mt-2">
                              +{statusClients.length - 3} more clients
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="animate-fade-in-up">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">All Clients</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Manage and update client statuses
                </p>
              </div>
              <button
                onClick={fetchData}
                className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl flex items-center space-x-2 group"
              >
                <svg className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
            <ClientsTable clients={clients} onUpdate={fetchData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

