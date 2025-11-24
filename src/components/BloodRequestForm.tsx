// components/BloodRequestForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface BloodRequestFormData {
  patientName: string;
  bloodGroup: string;
  mobileNumber: string;
  sickDetails: string;
  hospitalName: string;
  location: string;
  requiredUnits: number;
  urgency: string;
  neededDate: string;
  additionalInfo?: string;
  requestedBy?: string;
  requesterEmail?: string;
  requesterBloodGroup?: string;
}

export default function BloodRequestForm() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    bloodGroup: ''
  });

  const [formData, setFormData] = useState<BloodRequestFormData>({
    patientName: '',
    bloodGroup: '',
    mobileNumber: '',
    sickDetails: '',
    hospitalName: '',
    location: '',
    requiredUnits: 1,
    urgency: 'normal',
    neededDate: '',
    additionalInfo: '',
    requestedBy: '',
    requesterEmail: '',
    requesterBloodGroup: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // User information from session
  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      setUserInfo({
        name: user.name || '',
        email: user.email || '',
        bloodGroup: user.bloodGroup || ''
      });

      // Autofill requester information
      setFormData(prev => ({
        ...prev,
        requestedBy: user.name || '',
        requesterEmail: user.email || '',
        requesterBloodGroup: user.bloodGroup || ''
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/bloods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requestedBy: userInfo.name,
          requesterEmail: userInfo.email,
          requesterBloodGroup: userInfo.bloodGroup,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('Blood request submitted:', result);
      alert('Blood request submitted successfully!');
      
      // Form reset
      setFormData({
        patientName: '',
        bloodGroup: '',
        mobileNumber: '',
        sickDetails: '',
        hospitalName: '',
        location: '',
        requiredUnits: 1,
        urgency: 'normal',
        neededDate: '',
        additionalInfo: '',
        requestedBy: userInfo.name,
        requesterEmail: userInfo.email,
        requesterBloodGroup: userInfo.bloodGroup
      });
      
      // Redirect to blood request page (existing page)
      router.push('/blood-request');
      
    } catch (error) {
      console.error('Error submitting blood request:', error);
      setError('Error submitting blood request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'requiredUnits' ? parseInt(value) : value
    }));
  };

  // If user is not logged in
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to submit a blood request
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-red-700 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Requesting as</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {userInfo.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {userInfo.email}
                  </p>
                  {userInfo.bloodGroup && (
                    <p className="text-gray-700">
                      <span className="font-medium">Your Blood Group:</span> 
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {userInfo.bloodGroup}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">
                  {userInfo.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Blood Request Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🩸</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Request Blood Donation
              </h1>
              <p className="text-gray-600">
                Fill out the form below to request blood donation for a patient in need
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Enter patient's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group Needed *
                  </label>
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Enter mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Units *
                  </label>
                  <input
                    type="number"
                    name="requiredUnits"
                    required
                    min="1"
                    max="10"
                    value={formData.requiredUnits}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Number of units needed"
                  />
                </div>
              </div>

              {/* Hospital Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    required
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Enter hospital name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Enter city/district"
                  />
                </div>
              </div>

              {/* Medical Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sickness Details *
                </label>
                <textarea
                  name="sickDetails"
                  required
                  rows={4}
                  value={formData.sickDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Describe the patient's condition and reason for blood requirement"
                />
              </div>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Needed By Date *
                  </label>
                  <input
                    type="date"
                    name="neededDate"
                    required
                    value={formData.neededDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Any additional information for donors..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Blood Request'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}