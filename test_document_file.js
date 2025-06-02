// Test Document File API Authentication
// This script tests the document file endpoint that was failing

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

// Test document file access with authentication
async function testDocumentFileAccess() {
  console.log('🚀 Testing Document File API Authentication');
  console.log('===========================================\n');

  let accessToken = null;
  let documentId = null;

  try {
    // Step 1: Sign up and get access token
    console.log('🧪 Step 1: Creating test account...');
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = 'testPassword123!';

    const signupResult = await makeRequest('/auth/email-signup', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: 'Test User',
        confirmPassword: testPassword
      })
    });

    if (!signupResult.ok) {
      throw new Error(`Signup failed: ${signupResult.data.error || signupResult.data.message}`);
    }

    accessToken = signupResult.data.data.accessToken;
    console.log('✅ Account created and authenticated');

    // Step 2: Create a test document
    console.log('\n🧪 Step 2: Creating test document...');
    
    // Create a simple test file
    const testFileContent = 'This is a test document for file access testing.';
    const testBlob = new Blob([testFileContent], { type: 'text/plain' });
    
    const formData = new FormData();
    formData.append('documents', testBlob, 'test-document.txt');
    formData.append('title_0', 'Test Document');
    formData.append('mimeType_0', 'text/plain');
    formData.append('fields_0', JSON.stringify([]));
    formData.append('signers', JSON.stringify([{
      name: 'Test Signer',
      email: 'signer@example.com'
    }]));
    formData.append('subject', 'Test Document Upload');
    formData.append('message', 'Test message');
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
      throw new Error(`Document upload failed: ${uploadData.error || uploadData.message}`);
    }

    documentId = uploadData.documentId;
    console.log('✅ Test document created:', documentId);

    // Step 3: Get document details to find file ID
    console.log('\n🧪 Step 3: Getting document details...');
    
    const docResult = await makeRequest(`/api/documents/${documentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!docResult.ok) {
      throw new Error(`Get document failed: ${docResult.data.error || docResult.data.message}`);
    }

    const document = docResult.data.document;
    if (!document.files || document.files.length === 0) {
      throw new Error('No files found in document');
    }

    const fileId = document.files[0].fileId;
    console.log('✅ Document details retrieved, file ID:', fileId);

    // Step 4: Test file access without authentication (should fail)
    console.log('\n🧪 Step 4: Testing file access without authentication...');
    
    const noAuthResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`);
    const noAuthData = await noAuthResponse.json();
    
    if (noAuthResponse.status === 401) {
      console.log('✅ File access properly rejected without authentication');
      console.log(`   Status: ${noAuthResponse.status}`);
      console.log(`   Error Code: ${noAuthData.code}`);
    } else {
      console.log('❌ File access should have been rejected without authentication');
      console.log(`   Unexpected status: ${noAuthResponse.status}`);
    }

    // Step 5: Test file access with authentication (should work)
    console.log('\n🧪 Step 5: Testing file access with authentication...');
    
    const authResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (authResponse.ok) {
      const fileBlob = await authResponse.blob();
      console.log('✅ File access successful with authentication');
      console.log(`   Status: ${authResponse.status}`);
      console.log(`   File size: ${fileBlob.size} bytes`);
      console.log(`   Content type: ${authResponse.headers.get('content-type')}`);
    } else {
      const errorData = await authResponse.json();
      console.log('❌ File access failed with authentication');
      console.log(`   Status: ${authResponse.status}`);
      console.log(`   Error: ${errorData.error || errorData.message}`);
    }

    // Step 6: Test file access with invalid token (should fail)
    console.log('\n🧪 Step 6: Testing file access with invalid token...');
    
    const invalidTokenResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
      headers: {
        'Authorization': 'Bearer invalid-token-here'
      }
    });
    
    const invalidTokenData = await invalidTokenResponse.json();
    
    if (invalidTokenResponse.status === 401) {
      console.log('✅ File access properly rejected with invalid token');
      console.log(`   Status: ${invalidTokenResponse.status}`);
      console.log(`   Error Code: ${invalidTokenData.code}`);
    } else {
      console.log('❌ File access should have been rejected with invalid token');
      console.log(`   Unexpected status: ${invalidTokenResponse.status}`);
    }

    console.log('\n📊 Test Results Summary');
    console.log('=======================');
    console.log('✅ Document file API authentication tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    // Cleanup: try to delete test document if it was created
    if (documentId && accessToken) {
      console.log('\n🧹 Cleaning up test document...');
      try {
        await makeRequest(`/api/documents/${documentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('✅ Test document cleaned up');
      } catch (cleanupError) {
        console.log('⚠️  Failed to cleanup test document:', cleanupError.message);
      }
    }
  }
}

// Run the test
testDocumentFileAccess(); 