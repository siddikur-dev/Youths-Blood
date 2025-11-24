// app/my-profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';

interface User {
  name: string;
  email: string;
  bloodType?: string;
  phone?: string;
  location?: string;
  dateOfBirth?: string;
}

function MyProfileContent() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    bloodType: '',
    phone: '',
    location: '',
    dateOfBirth: ''
  });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setFormData(userObj);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    // Trigger storage event to update navbar
    window.dispatchEvent(new Event('storage'));
  };

  const handleCancel = () => {
    if (user) {
      setFormData(user);
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                  {isEditing ? (
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">{user.bloodType || 'Not specified'}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">{user.phone || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">{user.location || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">{user.dateOfBirth || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">3</div>
                  <div className="text-sm text-gray-600">Donations</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Lives Saved</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">2</div>
                  <div className="text-sm text-gray-600">Requests</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">120</div>
                  <div className="text-sm text-gray-600">Days to Next</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyProfile() {
  return (
    <ProtectedRoute>
      <MyProfileContent />
    </ProtectedRoute>
  );
}