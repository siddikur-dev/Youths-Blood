// app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome to Dashboard, {session.user?.name}!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Your Profile</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Blood Group:</strong> {session.user?.bloodGroup || 'Not set'}</p>
                <p><strong>Role:</strong> {session.user?.role}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/blood-request')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Request Blood
                </button>
                <button 
                  onClick={() => router.push('/my-profile')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Update Profile
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Statistics</h3>
              <div className="space-y-2">
                <p>Blood Requests: 0</p>
                <p>Donations: 0</p>
                <p>Active Requests: 0</p>
              </div>
            </div>
          </div>

          {/* Session Debug Info (Remove in production) */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Session Debug Info:</h4>
            <pre className="text-xs">{JSON.stringify(session, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}