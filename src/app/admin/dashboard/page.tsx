// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  bloodType?: string;
  phone?: string;
  location?: string;
  createdAt: string;
  lastLogin?: string;
  loginCount: number;
  status: string;
}

interface Activity {
  _id: string;
  email: string;
  activityType: string;
  timestamp: string;
  userAgent: string;
  ip: string;
}

interface Statistics {
  totalUsers: number;
  todayLogins: number;
  totalLogins: number;
  todayRegistrations: number;
  totalBloodRequests: number;
  pendingBloodRequests: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [usersRes, activitiesRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/auth/users'),
        fetch('http://localhost:5000/auth/activities?limit=50'),
        fetch('http://localhost:5000/auth/statistics')
      ]);

      const usersData = await usersRes.json();
      const activitiesData = await activitiesRes.json();
      const statsData = await statsRes.json();

      if (usersData.success) setUsers(usersData.data);
      if (activitiesData.success) setActivities(activitiesData.data);
      if (statsData.success) setStatistics(statsData.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor user activities and system statistics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'activities'
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Activities ({activities.length})
          </button>
        </div>

        {activeTab === 'dashboard' && statistics && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{statistics.totalUsers}</div>
              <div className="text-gray-600 font-medium">Total Users</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{statistics.todayLogins}</div>
              <div className="text-gray-600 font-medium">Today's Logins</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{statistics.totalLogins}</div>
              <div className="text-gray-600 font-medium">Total Logins</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{statistics.todayRegistrations}</div>
              <div className="text-gray-600 font-medium">New Registrations</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{statistics.totalBloodRequests}</div>
              <div className="text-gray-600 font-medium">Blood Requests</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{statistics.pendingBloodRequests}</div>
              <div className="text-gray-600 font-medium">Pending Requests</div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Registered Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logins</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.bloodType ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.bloodType || 'Not set'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.location || 'Not set'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.loginCount || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">User Activities</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <tr key={activity._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activity.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.activityType === 'login' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {activity.activityType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(activity.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.ip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}