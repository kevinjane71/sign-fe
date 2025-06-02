"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../../firebase';
import {  RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import ForgotPassword from './forgotpassword';
// const GOOGLE_SCOPES = [
//   'https://www.googleapis.com/auth/calendar',
//   'https://www.googleapis.com/auth/calendar.events',
//   'https://www.googleapis.com/auth/gmail.send',
//   'https://www.googleapis.com/auth/gmail.compose',
//   'https://mail.google.com/',
//   'https://www.googleapis.com/auth/userinfo.profile',
//   'https://www.googleapis.com/auth/userinfo.email',
//   'https://www.googleapis.com/auth/script.projects',
//   'https://www.googleapis.com/auth/calendar.events.readonly',
//   'https://www.googleapis.com/auth/calendar.readonly',
//   'https://www.googleapis.com/auth/calendar.settings.readonly'
// ];

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',  // Calendar events access
  'https://www.googleapis.com/auth/gmail.send',       // Gmail send access
  'https://www.googleapis.com/auth/userinfo.profile', // Basic profile info
  'https://www.googleapis.com/auth/userinfo.email'    // Email address
];


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // Use refs to track component state and cleanup
  const isMountedRef = useRef(true);
  const recaptchaContainerRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && isMountedRef.current) {
      handleAuthRequest('google', { code });
    }

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      cleanupRecaptcha();
    };
  }, []);

  // Cleanup function for reCAPTCHA
  const cleanupRecaptcha = () => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } catch (error) {
      console.log('Recaptcha cleanup error (safe to ignore):', error);
    }
  };

  const handleInputChange = (e) => {
    if (!isMountedRef.current) return;
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  // Generic auth request handler
  const handleAuthRequest = async (provider, data) => {
    if (!isMountedRef.current) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/meetflow/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!isMountedRef.current) return;

      if (result.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(result.data));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userStateChanged'));
        
        toast.success(result.message || 'Authentication successful');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
          if (isMountedRef.current) {
            window.location.href = '/dashboard';
          }
        }, 1000);
      } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error(`${provider} auth error:`, error);
      if (isMountedRef.current) {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  // Phone auth handlers
  const setupRecaptcha = () => {
    try {
      // Clean up any existing verifier first
      cleanupRecaptcha();
      
      if (!window.recaptchaVerifier && recaptchaContainerRef.current) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
          size: 'invisible',
          callback: () => {
            console.log('Captcha solved');
          },
          'expired-callback': () => {
            console.log('Captcha expired');
          }
        });
      }
    } catch (error) {
      console.error('RecaptchaVerifier setup error:', error);
      throw error;
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!isMountedRef.current) return;
    
    if (!formData.phone) {
      setError('Please enter a valid phone number');
      return;
    }
  
    setIsLoading(true);
    try {
      // Make sure we have the auth instance
      if (!auth) {
        throw new Error('Firebase auth not initialized');
      }
  
      // Setup Recaptcha
      setupRecaptcha();
      
      const formattedPhone = formData.phone.startsWith('+91') ? 
        formData.phone : `+91${formData.phone}`;
      
      console.log('Sending OTP to:', formattedPhone);
  
      // Get the recaptchaVerifier instance
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error('RecaptchaVerifier not initialized');
      }
  
      const confirmation = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        appVerifier
      );
      
      if (!isMountedRef.current) return;
      
      console.log('OTP sent successfully');
      setVerificationId(confirmation);
      setOtpSent(true);
      toast.success('OTP sent successfully');
  
    } catch (error) {
      console.error('Send OTP error:', error);
      if (isMountedRef.current) {
        toast.error('Failed to send OTP. Please try again.');
      }
      
      // Reset recaptcha on error
      cleanupRecaptcha();
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!isMountedRef.current) return;
    
    if (!formData.otp || !verificationId) {
      setError('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const result = await verificationId.confirm(formData.otp);
      const idToken = await result.user.getIdToken();
      
      if (!isMountedRef.current) return;
      
      // After Firebase verification, call our backend
      await handleAuthRequest('phone', {
        phone: formData.phone,
        idToken
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      if (isMountedRef.current) {
        toast.error('Invalid OTP. Please try again.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  // Google auth handler
  const handleGoogleLogin = () => {
    if (!isMountedRef.current) return;
    
    try {
      setIsLoading(true);
      localStorage.clear();
      const redirectUri = encodeURIComponent(`${window.location.origin}/login`);
      const scope = encodeURIComponent(GOOGLE_SCOPES.join(' '));
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1087929121342-sq0cd1gq0oo85ond6c11in1u83spc0mv.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&include_granted_scopes=true`;
      window.location.assign(authUrl);
    } catch (error) {
      console.error('Google login error:', error);
      if (isMountedRef.current) {
        toast.error('Failed to initialize Google login');
        setIsLoading(false);
      }
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMountedRef.current) return;
    
    setIsLoading(true);

    try {
      if (loginMethod === 'email') {
        if (isSignup) {
          // Email signup validation
          if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            throw new Error('Please fill in all fields');
          }
          if (formData.password !== formData.confirmPassword) {
            throw new Error('Passwords do not match');
          }
          if (formData.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
          }
          await handleAuthRequest('email-signup', {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            confirmPassword: formData.confirmPassword,
          });
        } else {
          // Email login validation
          if (!formData.email || !formData.password) {
            throw new Error('Please fill in all fields');
          }
          await handleAuthRequest('email-login', {
            email: formData.email,
            password: formData.password
          });
        }
      } else if (loginMethod === 'phone') {
        if (!formData.otp) {
          throw new Error('Please enter OTP');
        }
        await handleVerifyOTP();
      }
    } catch (error) {
      console.error('Submission error:', error);
      if (isMountedRef.current) {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center px-4 py-8 bg-gray-50">
       {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700">Please wait...</p>
          </div>
        </div>
      )}
      {/* Invisible reCAPTCHA container */}
      <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
      <div className="w-full max-w-md mt-16 p-6 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : (
        <>
          <h2 className="text-2xl md:text-2xl font-bold text-center mb-6 text-blue-600">SignFlow</h2>
{/* Social Login Options */}
<div className="space-y-3 mb-6">
          <button
            onClick={() => handleGoogleLogin('google')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <img src="/gmail.png" alt="Google" width="20" height="20"/>
            <span className="text-gray-700 text-sm md:text-base">Continue with Google</span>
          </button>
        </div>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Login Method Switcher */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 rounded-md text-sm transition-all duration-200 ${
              loginMethod === 'email' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Mail className="inline-block w-4 h-4 mr-1" />
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2 rounded-md text-sm transition-all duration-200 ${
              loginMethod === 'phone' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Phone className="inline-block w-4 h-4 mr-1" />
            Phone
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === 'email' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isSignup ? "Full Name" : "Email Address"}
                </label>
                {isSignup && (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 mb-3"
                    placeholder="Enter your full name"
                    required
                  />
                )}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {isSignup && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                )}
                {!isSignup && (
                  <div className="flex justify-end mt-1">
                    <button 
                      type="button" 
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
              {otpSent ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter OTP"
                    maxLength="6"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                  >
                    Resend OTP
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="w-full py-2 px-3 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send OTP
                </button>
              )}
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-3 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center text-sm"
          >
            {isSignup ? "Sign Up" : "Login"}
            <ArrowRight className="ml-1 w-4 h-4" />
          </button>
          
          <p className="mt-6 text-center text-xs text-gray-600">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button 
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </form>
        </>
      )}
        

        
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: 'green',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'red',
            },
          },
        }}
      />
    </div>
  );
};

export default LoginForm;