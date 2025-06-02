const axios = require('axios');

async function testStatsEndpoint() {
  try {
    console.log('🧪 Testing Stats Endpoint...\n');
    
    // First, create a test user
    const testEmail = `stats_test_${Date.now()}@example.com`;
    const signupResponse = await axios.post('http://localhost:5002/auth/email-signup', {
      email: testEmail,
      password: 'TestPassword123!',
      name: 'Stats Test User',
      confirmPassword: 'TestPassword123!'
    });

    if (signupResponse.data.success) {
      const token = signupResponse.data.data.accessToken;
      console.log('✅ User created successfully');
      console.log('📧 Test email:', testEmail);
      
      // Now test the stats endpoint with authentication
      const statsResponse = await axios.get('http://localhost:5002/api/documents/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Stats endpoint working!');
      console.log('📊 Stats response:', JSON.stringify(statsResponse.data, null, 2));
      
      // Also test documents endpoint
      const docsResponse = await axios.get('http://localhost:5002/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Documents endpoint working!');
      console.log('📄 Documents response:', JSON.stringify(docsResponse.data, null, 2));
      
    } else {
      console.log('❌ User creation failed:', signupResponse.data);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testStatsEndpoint(); 