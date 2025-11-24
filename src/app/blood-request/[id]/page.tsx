// app/blood-requests/[id]/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BloodRequest {
  _id: string;
  patientName: string;
  bloodGroup: string;
  requiredUnits: number;
  mobileNumber: string;
  sickDetails: string;
  hospitalName: string;
  location: string;
  urgency: string;
  neededDate: string;
  additionalInfo?: string;
  status: string;
  createdAt: string;
  requestedBy?: string;
  requesterEmail?: string;
}

export default function BloodRequestDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [bloodRequest, setBloodRequest] = useState<BloodRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    fetchBloodRequest();
  }, [id, session, router]);

  const fetchBloodRequest = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/bloods/${id}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch blood request details');
      }

      const data = await res.json();
      if (data.success) {
        setBloodRequest(data.data);
      } else {
        throw new Error('Blood request not found');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => router.back()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bloodRequest) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-600">Blood request not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <span className="mr-2">←</span> Back
            </button>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                bloodRequest.status === 'completed' ? 'bg-green-100 text-green-800' :
                bloodRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {bloodRequest.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                bloodRequest.urgency === 'emergency' ? 'bg-red-100 text-red-800' :
                bloodRequest.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {bloodRequest.urgency}
              </span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{bloodRequest.patientName}</h1>
                  <p className="text-red-100">Blood Group: <span className="font-bold text-xl">{bloodRequest.bloodGroup}</span></p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{bloodRequest.requiredUnits}</div>
                  <div className="text-red-100">Units Needed</div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Hospital Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">🏥</span> Hospital Information
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Hospital:</strong> {bloodRequest.hospitalName}</p>
                    <p><strong>Location:</strong> {bloodRequest.location}</p>
                    <p><strong>Contact:</strong> {bloodRequest.mobileNumber}</p>
                  </div>
                </div>

                {/* Timing Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">📅</span> Timing Information
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Needed By:</strong> {new Date(bloodRequest.neededDate).toLocaleDateString()}</p>
                    <p><strong>Requested On:</strong> {new Date(bloodRequest.createdAt).toLocaleDateString()}</p>
                    {bloodRequest.requestedBy && (
                      <p><strong>Requested By:</strong> {bloodRequest.requestedBy}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">💊</span> Medical Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700">{bloodRequest.sickDetails}</p>
                </div>
              </div>

              {/* Additional Information */}
              {bloodRequest.additionalInfo && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">📝</span> Additional Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700">{bloodRequest.additionalInfo}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                  I Can Help Donate
                </button>
                <button className="flex-1 border border-red-600 text-red-600 py-3 px-6 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                  Share Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}