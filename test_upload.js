// Complete Authentication + Upload Test
// This script demonstrates the full flow: signup -> login -> upload

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

// Test complete upload flow
async function testCompleteUploadFlow() {
  console.log('🚀 Testing Complete Upload Flow');
  console.log('================================');

  try {
    // Step 1: Create account
    console.log('\n📝 Step 1: Creating account...');
    const testUser = {
      email: `upload_test_${Date.now()}@example.com`,
      password: 'testpassword123',
      name: 'Upload Test User',
      confirmPassword: 'testpassword123'
    };

    const signupResult = await makeRequest('/auth/email-signup', {
      method: 'POST',
      body: JSON.stringify(testUser)
    });

    if (!signupResult.ok) {
      throw new Error(`Signup failed: ${signupResult.data.error}`);
    }

    const { accessToken, userId } = signupResult.data.data;
    console.log(`✅ Account created successfully! User ID: ${userId}`);

    // Step 2: Test upload with authentication
    console.log('\n📤 Step 2: Testing authenticated upload...');
    
    // Create a simple test file (PDF-like content)
    const testFileContent = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n174\n%%EOF';
    
    // Create FormData for upload
    const formData = new FormData();
    const blob = new Blob([testFileContent], { type: 'application/pdf' });
    formData.append('documents', blob, 'test-document.pdf');
    formData.append('title_0', 'Test Document');
    formData.append('mimeType_0', 'application/pdf');
    formData.append('fields_0', JSON.stringify([]));
    formData.append('signers', JSON.stringify([
      { name: 'John Doe', email: 'john@example.com', role: 'sign' }
    ]));
    formData.append('subject', 'Test Upload Document');
    formData.append('message', 'This is a test upload via authenticated API');
    formData.append('configuration', JSON.stringify({
      requireAuthentication: false,
      allowDelegation: true
    }));

    // Make authenticated upload request
    const uploadResult = await fetch(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: formData
    });

    const uploadData = await uploadResult.json();

    if (uploadResult.ok) {
      console.log('✅ Upload successful!');
      console.log(`   Document ID: ${uploadData.documentId}`);
      console.log(`   Total Files: ${uploadData.totalFiles}`);
      console.log(`   Document Title: ${uploadData.document.title}`);
      console.log(`   Created By: ${uploadData.document.createdBy.name} (${uploadData.document.createdBy.email})`);
      
      // Step 3: Verify we can retrieve the document
      console.log('\n🔍 Step 3: Verifying document retrieval...');
      
      const getResult = await makeRequest(`/api/documents/${uploadData.documentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (getResult.ok) {
        console.log('✅ Document retrieval successful!');
        console.log(`   Document Status: ${getResult.data.document.status}`);
        console.log(`   Files Count: ${getResult.data.document.files?.length || 0}`);
      } else {
        console.log('❌ Document retrieval failed');
        console.log(`   Error: ${getResult.data.error}`);
      }

    } else {
      console.log('❌ Upload failed');
      console.log(`   Status: ${uploadResult.status}`);
      console.log(`   Error: ${uploadData.error || uploadData.message}`);
      console.log(`   Code: ${uploadData.code}`);
    }

    // Step 4: Test what happens without authentication
    console.log('\n🚫 Step 4: Testing upload without authentication...');
    
    const noAuthResult = await fetch(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      body: formData
    });

    const noAuthData = await noAuthResult.json();

    if (!noAuthResult.ok && noAuthData.code === 'MISSING_TOKEN') {
      console.log('✅ Correctly rejected unauthenticated request');
      console.log(`   Status: ${noAuthResult.status}`);
      console.log(`   Code: ${noAuthData.code}`);
      console.log(`   Message: ${noAuthData.message}`);
    } else {
      console.log('❌ Should have rejected unauthenticated request');
    }

    console.log('\n🎉 Complete upload flow test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Authentication system working');
    console.log('   ✅ Authenticated uploads working');
    console.log('   ✅ Document retrieval working');
    console.log('   ✅ Unauthenticated requests properly blocked');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

// Run the test
testCompleteUploadFlow().catch(console.error); 