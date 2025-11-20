"use client";

import { Suspense } from 'react';
import LoginForm from './LoginForm';
import LoadingSpinner from './LoadingSpinner';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <LoginForm />
      </Suspense>
    </div>
  );
} 