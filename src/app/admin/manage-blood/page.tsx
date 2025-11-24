"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface BloodRequest {
  _id: string;
  patientName: string;
  bloodGroup: string;
  mobileNumber?: string;
  hospitalName?: string;
  location?: string;
  requiredUnits?: number;
  urgency?: string;
  neededDate?: string;
  requestedBy?: string;
  requesterEmail?: string;
  status?: string;
}

export default function ManageBloodPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch('http://localhost:5000/bloods');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);

        // If user is admin, show all. Otherwise filter to requests created by this user.
        const currentEmail = session?.user?.email ? String(session.user.email).toLowerCase() : '';
        const currentRole = session?.user?.role ? String(session.user.role) : '';

        if (currentRole === 'admin') {
          setItems(list);
        } else if (currentEmail) {
          const filtered = list.filter((r: any) => {
            const re = String(r.requesterEmail || r.requestedBy || '').toLowerCase();
            return re === currentEmail;
          });
          setItems(filtered);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      const res = await fetch(`http://localhost:5000/bloods/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Manage Blood Requests</h1>
            <div>
              <button onClick={() => router.push('/blood-request')} className="px-4 py-2 bg-red-600 text-white rounded-lg">New Request</button>
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <div className="text-red-600">{error}</div>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="text-left bg-gray-100">
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Blood Group</th>
                    <th className="px-4 py-3">Units</th>
                    <th className="px-4 py-3">Urgency</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const currentEmailSafe = session?.user?.email ? String(session.user.email).toLowerCase() : '';
                    const currentRoleSafe = ((session as unknown) as { user?: { role?: string } })?.user?.role || '';
                    const isOwner = currentEmailSafe && String(item.requesterEmail || item.requestedBy || '').toLowerCase() === currentEmailSafe;
                    const canDelete = currentRoleSafe === 'admin' || isOwner;
                    return (
                    <tr key={item._id} className="border-b">
                      <td className="px-4 py-3">{item.patientName}</td>
                      <td className="px-4 py-3">{item.bloodGroup}</td>
                      <td className="px-4 py-3">{item.requiredUnits ?? '-'}</td>
                      <td className="px-4 py-3">{item.urgency}</td>
                      <td className="px-4 py-3">{item.location}</td>
                      <td className="px-4 py-3">{item.status}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => router.push(`/blood-request/${item._id}`)} className="px-3 py-1 bg-gray-100 rounded">View</button>
                          {canDelete ? (
                            <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                          ) : (
                            <button disabled className="px-3 py-1 bg-gray-200 text-gray-500 rounded">Delete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
