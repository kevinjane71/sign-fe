"use client";

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Eye, EyeOff, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import ForgotPassword from './ForgotPassword';
import LoadingSpinner from './LoadingSpinner';

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function LoginForm() {
  // State management
  const [isClient, setIsClient] = useState(false);
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

  // Refs
  const isMountedRef = useRef(true);
  const recaptchaContainerRef = useRef(null);

  // Initialize client-side
  useEffect(() => {
    setIsClient(true);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Handle Google auth
  useEffect(() => {
    if (!isClient) return;

    const handleGoogleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });

        const result = await response.json();
        if (result.success) {
          localStorage.setItem('user', JSON.stringify(result.data));
          window.dispatchEvent(new Event('userStateChanged'));
          toast.success(result.message || 'Authentication successful');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          throw new Error(result.error || 'Google authentication failed');
        }
      } catch (error) {
        toast.error(error.message || 'Google authentication failed');
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleAuth();
  }, [isClient]);

  // Show loading state while initializing
  if (!isClient) {
    return <LoadingSpinner />;
  }

  // Form handlers
  const handleInputChange = (e) => {
    if (!isMountedRef.current) return;
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleAuthRequest = async (provider, data) => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!isMountedRef.current) return;

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.data));
        window.dispatchEvent(new Event('userStateChanged'));
        toast.success(result.message || 'Authentication successful');
        setTimeout(() => {
          window.location.href = '/dashboard';
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
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      if (!window.recaptchaVerifier && recaptchaContainerRef.current) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
          size: 'invisible',
          callback: () => console.log('Captcha solved'),
          'expired-callback': () => console.log('Captcha expired')
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
      if (!auth) throw new Error('Firebase auth not initialized');

      setupRecaptcha();
      const formattedPhone = formData.phone.startsWith('+91') ?
        formData.phone : `+91${formData.phone}`;

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) throw new Error('RecaptchaVerifier not initialized');

      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);

      if (!isMountedRef.current) return;

      setVerificationId(confirmation);
      setOtpSent(true);
      toast.success('OTP sent successfully');
    } catch (error) {
      console.error('Send OTP error:', error);
      if (isMountedRef.current) {
        toast.error('Failed to send OTP. Please try again.');
      }
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

  const handleGoogleLogin = () => {
    if (!isMountedRef.current) return;

    try {
      setIsLoading(true);
      localStorage.clear();
      const redirectUri = encodeURIComponent(`${window.location.origin}/login`);
      const scope = encodeURIComponent(GOOGLE_SCOPES.join(' '));
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=606105812193-7ldf8ofiset6impsavns11ib7nd71mfn.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&include_granted_scopes=true`;
      window.location.assign(authUrl);
    } catch (error) {
      console.error('Google login error:', error);
      if (isMountedRef.current) {
        toast.error('Failed to initialize Google login');
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMountedRef.current) return;

    setIsLoading(true);

    try {
      if (loginMethod === 'email') {
        if (isSignup) {
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
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700">Please wait...</p>
          </div>
        </div>
      )}

      <div ref={recaptchaContainerRef} id="recaptcha-container"></div>

      {/* Left Panel - Branding (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Decorative floating shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-10 blur-sm"></div>
        <div className="absolute top-1/3 right-8 w-48 h-48 bg-white rounded-full opacity-5 blur-md"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full opacity-10 blur-sm"></div>
        <div className="absolute top-2/3 left-8 w-16 h-16 bg-pink-300 rounded-full opacity-20"></div>
        <div className="absolute top-16 right-1/3 w-20 h-20 bg-blue-300 rounded-full opacity-15"></div>

        {/* Top section */}
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">eSignTap</h1>
          <p className="mt-4 text-xl lg:text-2xl text-white/90 font-light">
            Sign documents faster than ever
          </p>
        </div>

        {/* Feature bullets */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-lg">Lightning fast document signing</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-lg">Bank-level 256-bit encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-lg">Trusted by 500+ businesses</p>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="relative z-10">
          <p className="text-white/70 text-sm">Start free, no credit card required</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 py-8 sm:px-8 md:px-12 lg:px-16 min-h-screen">
        <div className="w-full max-w-md">
          {showForgotPassword ? (
            <ForgotPassword onBack={() => setShowForgotPassword(false)} />
          ) : (
            <>
              {/* Mobile logo */}
              <div className="md:hidden text-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  eSignTap
                </h1>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isSignup ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="mt-2 text-gray-500">
                  {isSignup ? 'Get started in 30 seconds' : 'Sign in to manage your documents'}
                </p>
              </div>

              {/* Google Login Button */}
              <div className="mb-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <img src="/gmail.png" alt="Google" width="20" height="20"/>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Email/Phone Toggle */}
              <div className="flex mb-6 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    loginMethod === 'email'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    loginMethod === 'phone'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </button>
              </div>

              {/* Error display */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {loginMethod === 'email' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {isSignup ? "Full Name" : "Email Address"}
                      </label>
                      {isSignup && (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 mb-3 outline-none"
                          placeholder="Enter your full name"
                          required
                        />
                      )}
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {isSignup && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                              placeholder="Confirm your password"
                              required
                            />
                          </div>
                        </div>
                      )}
                      {!isSignup && (
                        <div className="flex justify-end mt-1.5">
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {otpSent ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                          placeholder="Enter OTP"
                          maxLength="6"
                        />
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="mt-1.5 text-xs text-purple-600 hover:text-purple-800 font-medium"
                        >
                          Resend OTP
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="w-full py-2.5 px-4 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium"
                      >
                        Send OTP
                      </button>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center text-sm font-semibold"
                >
                  {isSignup ? "Create Account" : "Login"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>

                <p className="mt-6 text-center text-sm text-gray-500">
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(!isSignup)}
                    className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSignup ? "Login" : "Sign up"}
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
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
}
