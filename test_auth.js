// Authentication System Test Script
// This script tests the complete authentication flow

const API_BASE_URL = 'http://localhost:5002';

// Make HTTP request function
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data: data
    };
  } catch (error) {
    console.error(`Request failed for ${endpoint}:`, error.message);
    return {
      ok: false,
      status: 0,
      data: { error: error.message }
    };
  }
}

// Test functions
async function testEmailSignup() {
  console.log('\n🧪 Testing Email Signup...');
  
  const testUser = {
    email: `test_${Date.now()}@example.com`,
    password: 'testpassword123',
    name: 'Test User',
    confirmPassword: 'testpassword123'
  };

  const result = await makeRequest('/auth/email-signup', {
    method: 'POST',
    body: JSON.stringify(testUser)
  });

  if (result.ok) {
    console.log('✅ Email signup successful');
    console.log('   User ID:', result.data.data.userId);
    console.log('   Email:', result.data.data.email);
    console.log('   Access Token:', result.data.data.accessToken ? 'Present' : 'Missing');
    return result.data.data;
  } else {
    console.log('❌ Email signup failed');
    console.log('   Status:', result.status);
    console.log('   Error:', result.data.error || result.data.message);
    return null;
  }
}

async function testEmailLogin(email, password) {
  console.log('\n🧪 Testing Email Login...');
  
  const result = await makeRequest('/auth/email-login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (result.ok) {
    console.log('✅ Email login successful');
    console.log('   User ID:', result.data.data.userId);
    console.log('   Email:', result.data.data.email);
    console.log('   Access Token:', result.data.data.accessToken ? 'Present' : 'Missing');
    return result.data.data;
  } else {
    console.log('❌ Email login failed');
    console.log('   Status:', result.status);
    console.log('   Error:', result.data.error || result.data.message);
    return null;
  }
}

async function testProtectedEndpoint(accessToken) {
  console.log('\n🧪 Testing Protected Endpoint...');
  
  const result = await makeRequest('/api/documents', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (result.ok) {
    console.log('✅ Protected endpoint access successful');
    console.log('   Documents count:', result.data.documents?.length || 0);
    return true;
  } else {
    console.log('❌ Protected endpoint access failed');
    console.log('   Status:', result.status);
    console.log('   Error:', result.data.error || result.data.message);
    console.log('   Error Code:', result.data.code);
    return false;
  }
}

async function testTokenRefresh(refreshToken) {
  console.log('\n🧪 Testing Token Refresh...');
  
  const result = await makeRequest('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  });

  if (result.ok) {
    console.log('✅ Token refresh successful');
    console.log('   New Access Token:', result.data.data?.accessToken ? 'Present' : 'Missing');
    console.log('   New Refresh Token:', result.data.data?.refreshToken ? 'Present' : 'Missing');
    return result.data.data;
  } else {
    console.log('❌ Token refresh failed');
    console.log('   Status:', result.status);
    console.log('   Error:', result.data.error || result.data.message);
    console.log('   Error Code:', result.data.code);
    return null;
  }
}

async function testLogout(accessToken) {
  console.log('\n🧪 Testing Logout...');
  
  const result = await makeRequest('/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (result.ok) {
    console.log('✅ Logout successful');
    return true;
  } else {
    console.log('❌ Logout failed');
    console.log('   Status:', result.status);
    console.log('   Error:', result.data.error || result.data.message);
    return false;
  }
}

async function testInvalidToken() {
  console.log('\n🧪 Testing Invalid Token Handling...');
  
  const result = await makeRequest('/api/documents', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer invalid_token_12345'
    }
  });

  if (!result.ok && result.data.code) {
    console.log('✅ Invalid token properly rejected');
    console.log('   Status:', result.status);
    console.log('   Error Code:', result.data.code);
    console.log('   Error Message:', result.data.message);
    return true;
  } else {
    console.log('❌ Invalid token handling failed');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

async function testNoToken() {
  console.log('\n🧪 Testing No Token Handling...');
  
  const result = await makeRequest('/api/documents', {
    method: 'GET'
  });

  if (!result.ok && result.data.code === 'MISSING_TOKEN') {
    console.log('✅ Missing token properly handled');
    console.log('   Status:', result.status);
    console.log('   Error Code:', result.data.code);
    return true;
  } else {
    console.log('❌ Missing token handling failed');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Authentication System Tests');
  console.log('=====================================');

  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Email Signup
  totalTests++;
  const signupUser = await testEmailSignup();
  if (signupUser) passedTests++;

  if (!signupUser) {
    console.log('\n❌ Cannot continue tests without successful signup');
    return;
  }

  // Test 2: Email Login
  totalTests++;
  const loginUser = await testEmailLogin(signupUser.email, 'testpassword123');
  if (loginUser) passedTests++;

  if (!loginUser) {
    console.log('\n❌ Cannot continue tests without successful login');
    return;
  }

  // Test 3: Protected Endpoint Access
  totalTests++;
  const protectedAccess = await testProtectedEndpoint(loginUser.accessToken);
  if (protectedAccess) passedTests++;

  // Test 4: Token Refresh
  totalTests++;
  const refreshTokenData = await testTokenRefresh(loginUser.refreshToken);
  if (refreshTokenData) passedTests++;

  // Test 5: Logout
  totalTests++;
  const logoutSuccess = await testLogout(refreshTokenData?.accessToken || loginUser.accessToken);
  if (logoutSuccess) passedTests++;

  // Test 6: Invalid Token Handling
  totalTests++;
  const invalidTokenTest = await testInvalidToken();
  if (invalidTokenTest) passedTests++;

  // Test 7: No Token Handling
  totalTests++;
  const noTokenTest = await testNoToken();
  if (noTokenTest) passedTests++;

  // Summary
  console.log('\n📊 Test Results Summary');
  console.log('=======================');
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests} tests`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! Authentication system is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the implementation.');
  }
}

// Run tests
runTests().catch(console.error);