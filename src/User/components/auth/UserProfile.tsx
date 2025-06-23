import React, { useState } from 'react';
import { useAppSelector } from '../../../Redux/store/hooks';
import { selectUser } from '../../../Redux/store/selectors/authSelectors';
import { User, Mail, Shield, Calendar, Edit3, Save, X } from 'lucide-react';

const UserProfile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states for editing - only name can be edited based on your User type
  const [formData, setFormData] = useState({
    name: user?.name || '',
  });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center py-10 text-gray-500">
          <User size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No user data found. Please log in again.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      // Here you would dispatch an action to update the user profile
      // For now, just simulate the update
      console.log('Updating profile with:', formData);
      
      // Simulate API call
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
    });
    setEditing(false);
    setError(null);
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'staff':
        return 'bg-blue-100 text-blue-800';
      case 'customer':
      default:
        return 'bg-lime-100 text-lime-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-lime-600">My Profile</h1>
        <div className="flex gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700 transition"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 text-center border">
            <div className="w-32 h-32 mx-auto mb-4 bg-lime-100 rounded-full flex items-center justify-center">
              <User size={48} className="text-lime-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {user.name || 'No name provided'}
            </h2>
            <p className="text-gray-500 mb-3">{user.email}</p>
            
            {/* Role Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                <Shield size={14} />
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
              </span>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h3 className="text-lg font-semibold text-emerald-700 mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  <User size={16} className="inline mr-1" />
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-700">{user.name || 'Not provided'}</p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  <Mail size={16} className="inline mr-1" />
                  Email Address
                </label>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Role (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  <Shield size={16} className="inline mr-1" />
                  Account Role
                </label>
                <p className="text-gray-700 capitalize">{user.role}</p>
              </div>

              {/* User ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  User ID
                </label>
                <p className="text-gray-700 font-mono">#{user.id}</p>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-4">Account Information</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-lime-50 p-3 rounded-lg text-center">
                  <p className="font-semibold text-lime-700">Member Since</p>
                  <p className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg text-center">
                  <p className="font-semibold text-emerald-700">Account Status</p>
                  <p className="text-gray-600">Active</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="font-semibold text-blue-700">User ID</p>
                  <p className="text-gray-600 font-mono">#{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <a
          href="/dashboard"
          className="bg-lime-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-lime-700 transition"
        >
          Back to Dashboard
        </a>
        <a
          href="/settings"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-emerald-700 transition"
        >
          Account Settings
        </a>
        <a
          href="/support"
          className="bg-gray-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-gray-700 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default UserProfile;