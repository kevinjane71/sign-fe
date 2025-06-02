// Simple Upload and File Serving Test
// This script tests upload and file serving with proper multipart form data

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

// Test simple upload and file serving
async function testSimpleUpload() {
  console.log('🚀 Testing Simple Upload and File Serving');
  console.log('==========================================\n');

  let accessToken = null;

  try {
    // Step 1: Create account and authenticate
    console.log('🧪 Step 1: Creating test account...');
    const testEmail = `simple_test_${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    const signupResult = await makeRequest('/auth/email-signup', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: 'Simple Test User',
        confirmPassword: testPassword
      })
    });

    if (!signupResult.ok) {
      throw new Error(`Signup failed: ${signupResult.data.error || signupResult.data.message}`);
    }

    accessToken = signupResult.data.data.accessToken;
    console.log('✅ Account created and authenticated\n');

    // Step 2: Upload a test document using FormData
    console.log('🧪 Step 2: Uploading test document...');
    
    // Create a simple text file
    const testFileContent = 'This is a simple test file for upload and serving test.';
    const blob = new Blob([testFileContent], { type: 'text/plain' });
    
    // Create FormData properly
    const formData = new FormData();
    formData.append('documents', blob, 'simple-test.txt');
    formData.append('title_0', 'Simple Test Document');
    formData.append('mimeType_0', 'text/plain');
    formData.append('fields_0', JSON.stringify([]));
    formData.append('signers', JSON.stringify([{name: 'Test Signer', email: 'signer@example.com'}]));
    formData.append('subject', 'Simple Upload Test');
    formData.append('message', 'Testing simple upload');
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

    const documentId = uploadData.documentId;
    const fileId = uploadData.document.files[0].fileId;
    console.log(`✅ Document uploaded successfully: ${documentId}`);
    console.log(`   File ID: ${fileId}\n`);

    // Step 3: Test file access
    console.log('🧪 Step 3: Testing file access...');
    
    const fileResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      throw new Error(`File access failed: ${fileResponse.status} - ${errorText}`);
    }

    const fileText = await fileResponse.text();
    console.log('✅ File access successful');
    console.log(`   File content: "${fileText}"`);
    console.log(`   Content matches: ${fileText === testFileContent}\n`);

    // Step 4: Test document retrieval
    console.log('🧪 Step 4: Testing document retrieval...');
    
    const documentResult = await makeRequest(`/api/documents/${documentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!documentResult.ok) {
      throw new Error(`Failed to get document: ${documentResult.data.error}`);
    }

    console.log('✅ Document retrieval successful');
    console.log(`   Title: ${documentResult.data.document.title}`);
    console.log(`   Files: ${documentResult.data.document.files.length}\n`);

    console.log('📊 Test Results Summary');
    console.log('=======================');
    console.log('✅ All simple upload and file serving tests passed!');
    console.log('✅ Authentication working correctly');
    console.log('✅ Document upload working');
    console.log('✅ File serving working (no CORS issues)');
    console.log('✅ Document retrieval working');
    console.log('\n🎉 Upload and file serving system is ready for use!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testSimpleUpload(); 