"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Building, Calendar, Edit2, Save, X } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import { useToast } from '../components/LayoutWrapper'

export default function ProfilePage() {
  const router = useRouter()
  const toast = useToast()
  const { user, isLoading, isRefreshing } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    bio: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        bio: user.bio || ''
      })
    }
  }, [user])

  if (isLoading || isRefreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    toast.success('Profile updated successfully!')
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100/50 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name || 'User'} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-purple-200 hover:bg-purple-50 transition-all duration-200">
                  <Edit2 className="w-4 h-4 text-purple-600" />
                </button>
              )}
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                  {user.name || 'Your Name'}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-600 mb-2">{user.email}</p>
              {/* <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p> */}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100/50 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="w-full sm:w-1/3 text-sm font-medium text-gray-700">Full Name</label>
              <div className="w-full sm:w-2/3">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-900">
                    <User className="w-5 h-5 text-purple-600" />
                    <span>{formData.name || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="w-full sm:w-1/3 text-sm font-medium text-gray-700">Email Address</label>
              <div className="w-full sm:w-2/3">
                <div className="flex items-center gap-2 text-gray-900">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>{formData.email}</span>
                </div>
              </div>
            </div>

            {/* Phone Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="w-full sm:w-1/3 text-sm font-medium text-gray-700">Phone Number</label>
              <div className="w-full sm:w-2/3">
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-900">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <span>{formData.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Company Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="w-full sm:w-1/3 text-sm font-medium text-gray-700">Company</label>
              <div className="w-full sm:w-2/3">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your company name"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-900">
                    <Building className="w-5 h-5 text-purple-600" />
                    <span>{formData.company || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="w-full sm:w-1/3 text-sm font-medium text-gray-700">Bio</label>
              <div className="w-full sm:w-2/3">
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Tell us about yourself"
                  />
                ) : (
                  <div className="text-gray-900">
                    <p className="whitespace-pre-wrap">{formData.bio || 'No bio provided'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button (only shown when editing) */}
            {isEditing && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 