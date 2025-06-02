// Test login functionality
const API_BASE_URL = 'http://localhost:5002';

async function testLogin() {
  console.log('🧪 Testing Login Functionality...\n');

  try {
    // Step 1: Test email signup
    console.log('1. Testing email signup...');
    const signupResponse = await fetch(`${API_BASE_URL}/auth/email-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `login_test_${Date.now()}@example.com`,
        password: 'TestPassword123!',
        name: 'Login Test User',
        confirmPassword: 'TestPassword123!'
      })
    });

    console.log(`   Signup Status: ${signupResponse.status}`);
    
    if (!signupResponse.ok) {
      const errorData = await signupResponse.json();
      console.log(`   Signup Error:`, errorData);
      throw new Error(`Signup failed: ${signupResponse.status}`);
    }

    const signupData = await signupResponse.json();
    console.log('✅ Email signup working');
    console.log(`   User ID: ${signupData.data.userId}`);
    console.log(`   Access Token: ${signupData.data.accessToken ? 'Present' : 'Missing'}`);

    // Step 2: Test email login with the same credentials
    console.log('\n2. Testing email login...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/email-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signupData.data.email,
        password: 'TestPassword123!'
      })
    });

    console.log(`   Login Status: ${loginResponse.status}`);
    
    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      console.log(`   Login Error:`, errorData);
      throw new Error(`Login failed: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    console.log('✅ Email login working');
    console.log(`   User ID: ${loginData.data.userId}`);
    console.log(`   Access Token: ${loginData.data.accessToken ? 'Present' : 'Missing'}`);

    // Step 3: Test protected endpoint with token
    console.log('\n3. Testing protected endpoint...');
    const profileResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${loginData.data.accessToken}`
      }
    });

    console.log(`   Profile Status: ${profileResponse.status}`);
    
    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      console.log(`   Profile Error:`, errorData);
      throw new Error(`Profile access failed: ${profileResponse.status}`);
    }

    const profileData = await profileResponse.json();
    console.log('✅ Protected endpoint access working');
    console.log(`   Profile Email: ${profileData.data.email}`);

    console.log('\n🎉 SUCCESS: Email authentication is working correctly!');
    console.log('✅ Email signup: Working');
    console.log('✅ Email login: Working');
    console.log('✅ Token authentication: Working');
    console.log('✅ Protected endpoints: Working');

  } catch (error) {
    console.error('\n❌ Login test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testLogin(); 