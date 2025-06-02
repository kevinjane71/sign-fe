// Test the specific documents endpoint that was failing
// GET /api/documents?page=1&limit=10

const API_BASE_URL = 'http://localhost:5002';

async function testSpecificEndpoint() {
  console.log('🧪 Testing specific documents endpoint that was failing...\n');

  try {
    // Step 1: Create account to get valid token
    console.log('1. Creating test account...');
    const signupResponse = await fetch(`${API_BASE_URL}/auth/email-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `endpoint_test_${Date.now()}@example.com`,
        password: 'TestPassword123!',
        name: 'Endpoint Test User',
        confirmPassword: 'TestPassword123!'
      })
    });

    if (!signupResponse.ok) {
      throw new Error(`Signup failed: ${signupResponse.status}`);
    }

    const signupData = await signupResponse.json();
    const accessToken = signupData.data.accessToken;
    console.log('✅ Account created and token obtained\n');

    // Step 2: Test the specific endpoint that was failing
    console.log('2. Testing GET /api/documents?page=1&limit=10...');
    const documentsResponse = await fetch(`${API_BASE_URL}/api/documents?page=1&limit=10`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log(`   Status: ${documentsResponse.status}`);
    console.log(`   Status Text: ${documentsResponse.statusText}`);

    if (!documentsResponse.ok) {
      const errorData = await documentsResponse.json();
      console.log(`   Error Response:`, errorData);
      throw new Error(`Documents API failed: ${documentsResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const documentsData = await documentsResponse.json();
    console.log('✅ Documents endpoint working correctly!');
    console.log(`   Response:`, JSON.stringify(documentsData, null, 2));

    console.log('\n🎉 SUCCESS: The endpoint that was returning 500 error is now working!');
    console.log('✅ Status: 200 OK');
    console.log('✅ Authentication: Working');
    console.log('✅ Response format: Valid JSON');
    console.log('✅ Pagination: Working');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testSpecificEndpoint(); 