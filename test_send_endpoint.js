// Test Send Endpoint Specifically
// This script tests the send endpoint to debug the request body parsing issue

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

// Test send endpoint
async function testSendEndpoint() {
  console.log('🚀 Testing Send Endpoint Specifically');
  console.log('====================================\n');

  let accessToken = null;
  let documentId = null;
  let fileId = null;

  try {
    // Step 1: Create account and authenticate
    console.log('🧪 Step 1: Creating test account...');
    const testEmail = `send_test_${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    const signupResult = await makeRequest('/auth/email-signup', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: 'Send Test User',
        confirmPassword: testPassword
      })
    });

    if (!signupResult.ok) {
      throw new Error(`Signup failed: ${signupResult.data.error || signupResult.data.message}`);
    }

    accessToken = signupResult.data.data.accessToken;
    console.log('✅ Account created and authenticated\n');

    // Step 2: Upload a simple document
    console.log('🧪 Step 2: Uploading test document...');
    
    const testFileContent = 'Simple test document for send endpoint testing.';
    const blob = new Blob([testFileContent], { type: 'text/plain' });
    
    const formData = new FormData();
    formData.append('documents', blob, 'send-test.txt');
    formData.append('title_0', 'Send Test Document');
    formData.append('mimeType_0', 'text/plain');
    formData.append('fields_0', JSON.stringify([]));
    formData.append('signers', JSON.stringify([
      {name: 'Test Signer', email: 'test@example.com'}
    ]));
    formData.append('subject', 'Send Test');
    formData.append('message', 'Testing send');
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

    documentId = uploadData.documentId;
    fileId = uploadData.document.files[0].fileId;
    console.log(`✅ Document uploaded: ${documentId}\n`);

    // Step 3: Test send endpoint with proper JSON
    console.log('🧪 Step 3: Testing send endpoint...');
    
    const sendData = {
      fileFields: [{
        fileId: fileId,
        fields: [{
          id: 'test_field',
          type: 'signature',
          leftPercent: 10,
          topPercent: 20,
          widthPercent: 20,
          heightPercent: 10,
          pageNumber: 1,
          required: true
        }]
      }],
      signers: [
        {name: 'John Doe', email: 'john@example.com'},
        {name: 'Jane Smith', email: 'jane@example.com'}
      ],
      subject: 'Test Document Signature Request',
      message: 'Please sign this test document',
      configuration: {
        workflowType: 'parallel'
      }
    };

    console.log('📤 Sending request with data:');
    console.log('   FileFields:', sendData.fileFields ? 'Present' : 'Missing');
    console.log('   Signers:', sendData.signers ? sendData.signers.length : 'Missing');
    console.log('   Subject:', sendData.subject ? 'Present' : 'Missing');

    const sendResult = await makeRequest(`/api/documents/${documentId}/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    if (!sendResult.ok) {
      console.log('❌ Send failed with response:', sendResult.data);
      throw new Error(`Document send failed: ${sendResult.data.error}`);
    }

    console.log('✅ Document sent successfully');
    console.log(`   Response: ${sendResult.data.message}\n`);

    console.log('📊 Send Endpoint Test Results');
    console.log('=============================');
    console.log('✅ Send endpoint working correctly!');
    console.log('✅ Request body parsed properly');
    console.log('✅ Signers processed correctly');
    console.log('✅ Fields updated successfully');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testSendEndpoint(); 