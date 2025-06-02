// Test Documents API Endpoint
// This script tests the GET /api/documents endpoint that's returning 500 error

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
    
    // Try to parse as JSON, but handle cases where it might not be JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { error: text };
    }
    
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

// Test documents API
async function testDocumentsAPI() {
  console.log('🚀 Testing Documents API Endpoint');
  console.log('=================================\n');

  let accessToken = null;

  try {
    // Step 1: Create account and authenticate
    console.log('🧪 Step 1: Creating test account...');
    const testEmail = `docs_test_${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    const signupResult = await makeRequest('/auth/email-signup', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: 'Documents Test User',
        confirmPassword: testPassword
      })
    });

    if (!signupResult.ok) {
      throw new Error(`Signup failed: ${signupResult.data.error || signupResult.data.message}`);
    }

    accessToken = signupResult.data.data.accessToken;
    console.log('✅ Account created and authenticated\n');

    // Step 2: Test documents endpoint without any documents
    console.log('🧪 Step 2: Testing documents endpoint (empty state)...');
    
    const documentsResult = await makeRequest('/api/documents?page=1&limit=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('📊 Documents API Response:');
    console.log('   Status:', documentsResult.status);
    console.log('   OK:', documentsResult.ok);
    console.log('   Data:', JSON.stringify(documentsResult.data, null, 2));

    if (!documentsResult.ok) {
      throw new Error(`Documents API failed: ${documentsResult.data.error || documentsResult.data.message}`);
    }

    console.log('✅ Documents API working (empty state)');
    console.log(`   Total documents: ${documentsResult.data.documents.length}`);
    console.log(`   Pagination: ${JSON.stringify(documentsResult.data.pagination)}\n`);

    // Step 3: Upload a document to test with data
    console.log('🧪 Step 3: Uploading test document...');
    
    const testFileContent = 'Test document for documents API testing.';
    const blob = new Blob([testFileContent], { type: 'text/plain' });
    
    const formData = new FormData();
    formData.append('documents', blob, 'docs-api-test.txt');
    formData.append('title_0', 'Documents API Test');
    formData.append('mimeType_0', 'text/plain');
    formData.append('fields_0', JSON.stringify([]));
    formData.append('signers', JSON.stringify([{name: 'Test Signer', email: 'test@example.com'}]));
    formData.append('subject', 'Documents API Test');
    formData.append('message', 'Testing documents API');
    formData.append('configuration', JSON.stringify({}));

    const uploadResponse = await fetch(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadData.error || uploadData.message}`);
    }

    console.log(`✅ Document uploaded: ${uploadData.documentId}\n`);

    // Step 4: Test documents endpoint with data
    console.log('🧪 Step 4: Testing documents endpoint (with data)...');
    
    const documentsWithDataResult = await makeRequest('/api/documents?page=1&limit=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('📊 Documents API Response (with data):');
    console.log('   Status:', documentsWithDataResult.status);
    console.log('   OK:', documentsWithDataResult.ok);
    console.log('   Data:', JSON.stringify(documentsWithDataResult.data, null, 2));

    if (!documentsWithDataResult.ok) {
      throw new Error(`Documents API failed: ${documentsWithDataResult.data.error || documentsWithDataResult.data.message}`);
    }

    console.log('✅ Documents API working (with data)');
    console.log(`   Total documents: ${documentsWithDataResult.data.documents.length}`);
    console.log(`   Pagination: ${JSON.stringify(documentsWithDataResult.data.pagination)}\n`);

    // Step 5: Test with status filter
    console.log('🧪 Step 5: Testing documents endpoint with status filter...');
    
    const statusFilterResult = await makeRequest('/api/documents?page=1&limit=10&status=draft', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!statusFilterResult.ok) {
      throw new Error(`Status filter failed: ${statusFilterResult.data.error || statusFilterResult.data.message}`);
    }

    console.log('✅ Status filter working');
    console.log(`   Draft documents: ${statusFilterResult.data.documents.length}\n`);

    console.log('📊 Documents API Test Results');
    console.log('=============================');
    console.log('✅ All documents API tests passed!');
    console.log('✅ Empty state working');
    console.log('✅ Documents listing working');
    console.log('✅ Pagination working');
    console.log('✅ Status filtering working');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the test
testDocumentsAPI(); 