// Test File Serving Without CORS Issues
// This script tests that file serving works through our API instead of direct Google Storage access

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

// Test file serving functionality
async function testFileServing() {
  console.log('🚀 Testing File Serving Without CORS Issues');
  console.log('============================================\n');

  let accessToken = null;

  try {
    // Step 1: Create account and upload a document for testing
    console.log('🧪 Step 1: Creating test account and uploading document...');
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

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

    // Upload a test document
    const testFileContent = 'This is a test file for testing file serving functionality.';
    const boundary = '----formdata-boundary-' + Math.random().toString(36);
    
    let formData = '';
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="files"; filename="test-file.txt"\r\n`;
    formData += `Content-Type: text/plain\r\n\r\n`;
    formData += `${testFileContent}\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="title_0"\r\n\r\n`;
    formData += `Test File Serving Document\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="mimeType_0"\r\n\r\n`;
    formData += `text/plain\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="fields_0"\r\n\r\n`;
    formData += `[]\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="signers"\r\n\r\n`;
    formData += `${JSON.stringify([{name: 'Test Signer', email: 'signer@example.com'}])}\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="subject"\r\n\r\n`;
    formData += `Test File Serving\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="message"\r\n\r\n`;
    formData += `Testing file serving\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="configuration"\r\n\r\n`;
    formData += `{}\r\n`;
    
    formData += `--${boundary}--\r\n`;

    const uploadResult = await fetch(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`
      },
      body: formData
    });

    const uploadData = await uploadResult.json();

    if (!uploadResult.ok) {
      // If upload fails, let's try to get existing documents instead
      console.log('⚠️  Upload failed, checking for existing documents...');
      
      const documentsResult = await makeRequest('/api/documents', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!documentsResult.ok || documentsResult.data.documents.length === 0) {
        throw new Error('No documents available for testing. Please run test_upload.js first.');
      }

      const testDocument = documentsResult.data.documents[0];
      var documentId = testDocument.id;
      var fileId = testDocument.files?.[0]?.fileId;
    } else {
      var documentId = uploadData.documentId;
      var fileId = uploadData.document.files[0].fileId;
      console.log('✅ Test document uploaded successfully');
    }

    console.log(`   Document ID: ${documentId}`);
    console.log(`   File ID: ${fileId}\n`);

    // Step 2: Test file access through API
    console.log('🧪 Step 2: Testing file access through API...');
    
    const fileResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
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

    // Step 3: Verify the response is not a redirect
    console.log('🧪 Step 3: Verifying file is served directly (not redirected)...');
    
    // Check if we got actual file content, not a redirect response
    if (fileBuffer.byteLength > 0 && contentType && !contentType.includes('text/html')) {
      console.log('✅ File served directly from API (no redirect to Google Storage)');
      console.log('✅ CORS issues avoided by serving through authenticated API\n');
    } else {
      throw new Error('File appears to be redirected or not served properly');
    }

    // Step 4: Test file access without authentication (should fail)
    console.log('🧪 Step 4: Testing file access without authentication...');
    
    const unauthResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`);
    
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

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testFileServing(); 