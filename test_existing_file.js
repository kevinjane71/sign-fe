// Test File Serving with Existing Document
// This script tests file serving using the document created by test_upload.js

const API_BASE_URL = 'http://localhost:5002';

// Use the document ID from the previous upload test
const EXISTING_DOCUMENT_ID = 'b40f7d21-f294-4083-ba24-54336cf8171d';

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

// Test file serving functionality
async function testExistingFileServing() {
  console.log('🚀 Testing File Serving with Existing Document');
  console.log('===============================================\n');

  let accessToken = null;

  try {
    // Step 1: Login with the test account from upload test
    console.log('🧪 Step 1: Logging in with test account...');
    const testEmail = 'upload_test_1748880977546@example.com'; // From the upload test
    const testPassword = 'TestPassword123!';

    const loginResult = await makeRequest('/auth/email-login', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    if (!loginResult.ok) {
      throw new Error(`Login failed: ${loginResult.data.error || loginResult.data.message}`);
    }

    accessToken = loginResult.data.data.accessToken;
    console.log('✅ Logged in successfully\n');

    // Step 2: Get the specific document
    console.log('🧪 Step 2: Getting document details...');
    console.log(`   Document ID: ${EXISTING_DOCUMENT_ID}`);
    
    const documentResult = await makeRequest(`/api/documents/${EXISTING_DOCUMENT_ID}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!documentResult.ok) {
      throw new Error(`Failed to get document: ${documentResult.data.error}`);
    }

    const document = documentResult.data.document;
    const fileId = document.files?.[0]?.fileId;

    if (!fileId) {
      throw new Error('No files found in the document');
    }

    console.log('✅ Document retrieved successfully');
    console.log(`   Title: ${document.title}`);
    console.log(`   File ID: ${fileId}\n`);

    // Step 3: Test file access through API
    console.log('🧪 Step 3: Testing file access through API...');
    
    const fileResponse = await fetch(`${API_BASE_URL}/api/documents/${EXISTING_DOCUMENT_ID}/file/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      throw new Error(`File access failed: ${fileResponse.status} - ${errorText}`);
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    const contentType = fileResponse.headers.get('content-type');
    const contentDisposition = fileResponse.headers.get('content-disposition');
    
    console.log('✅ File access successful through API');
    console.log(`   File size: ${fileBuffer.byteLength} bytes`);
    console.log(`   Content type: ${contentType}`);
    console.log(`   Content disposition: ${contentDisposition}\n`);

    // Step 4: Verify the response is not a redirect
    console.log('🧪 Step 4: Verifying file is served directly (not redirected)...');
    
    // Check if we got actual file content, not a redirect response
    if (fileBuffer.byteLength > 0 && contentType && !contentType.includes('text/html')) {
      console.log('✅ File served directly from API (no redirect to Google Storage)');
      console.log('✅ CORS issues avoided by serving through authenticated API\n');
    } else {
      throw new Error('File appears to be redirected or not served properly');
    }

    // Step 5: Test file access without authentication (should fail)
    console.log('🧪 Step 5: Testing file access without authentication...');
    
    const unauthResponse = await fetch(`${API_BASE_URL}/api/documents/${EXISTING_DOCUMENT_ID}/file/${fileId}`);
    
    if (unauthResponse.status === 401) {
      console.log('✅ File access properly rejected without authentication');
      console.log('✅ Authentication security working correctly\n');
    } else {
      throw new Error('File access should be rejected without authentication');
    }

    console.log('📊 Test Results Summary');
    console.log('=======================');
    console.log('✅ File serving working correctly through API');
    console.log('✅ No CORS issues (files served directly, not redirected)');
    console.log('✅ Authentication required for file access');
    console.log('✅ File content delivered properly');
    console.log('\n🎉 File serving system is working correctly!');
    console.log('\n💡 The document editor will now work without CORS issues');
    console.log('   because files are served through the authenticated API');
    console.log('   instead of being redirected to Google Storage URLs.');
    console.log('\n🌐 You can now test the frontend at:');
    console.log(`   http://localhost:3000/editor/${EXISTING_DOCUMENT_ID}`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n💡 If the login failed, the test account may have expired.');
    console.log('   Please run: node test_upload.js');
    console.log('   Then update the EXISTING_DOCUMENT_ID in this test file.');
    process.exit(1);
  }
}

// Run the test
testExistingFileServing(); 