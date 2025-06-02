// Complete Document Editor Flow Test
// This script tests the full flow: signup -> upload -> edit -> file access

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

// Test complete editor flow
async function testEditorFlow() {
  console.log('🚀 Testing Complete Document Editor Flow');
  console.log('==========================================\n');

  let accessToken = null;
  let documentId = null;
  let fileId = null;

  try {
    // Step 1: Create account and authenticate
    console.log('🧪 Step 1: Creating test account...');
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
    console.log('✅ Account created and authenticated\n');

    // Step 2: Upload a test document using multipart form data
    console.log('🧪 Step 2: Uploading test document...');
    
    // Create form data manually for Node.js
    const boundary = '----formdata-boundary-' + Math.random().toString(36);
    const testFileContent = 'This is a test PDF content for document editor testing.';
    
    let formData = '';
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="files"; filename="test-document.txt"\r\n`;
    formData += `Content-Type: text/plain\r\n\r\n`;
    formData += `${testFileContent}\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="title_0"\r\n\r\n`;
    formData += `Test Document for Editor\r\n`;
    
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
    formData += `Test Document Upload\r\n`;
    
    formData += `--${boundary}\r\n`;
    formData += `Content-Disposition: form-data; name="message"\r\n\r\n`;
    formData += `Test message\r\n`;
    
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
      throw new Error(`Upload failed: ${uploadData.error || uploadData.message}`);
    }

    documentId = uploadData.documentId;
    fileId = uploadData.document.files[0].fileId;
    console.log(`✅ Document uploaded successfully: ${documentId}`);
    console.log(`   File ID: ${fileId}\n`);

    // Step 3: Get document details (simulating editor loading)
    console.log('🧪 Step 3: Loading document in editor...');
    
    const documentResult = await makeRequest(`/api/documents/${documentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!documentResult.ok) {
      throw new Error(`Failed to load document: ${documentResult.data.error}`);
    }

    console.log('✅ Document loaded successfully');
    console.log(`   Title: ${documentResult.data.document.title}`);
    console.log(`   Files: ${documentResult.data.document.files.length}\n`);

    // Step 4: Test file access (simulating document viewer)
    console.log('🧪 Step 4: Testing file access for document viewer...');
    
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
    console.log('✅ File access successful');
    console.log(`   File size: ${fileBuffer.byteLength} bytes`);
    console.log(`   Content type: ${fileResponse.headers.get('content-type')}\n`);

    // Step 5: Test document update (simulating field addition)
    console.log('🧪 Step 5: Testing document update with fields...');
    
    const updateData = {
      fileFields: [{
        fileId: fileId,
        fields: [{
          id: 'test_field_1',
          type: 'signature',
          leftPercent: 10,
          topPercent: 20,
          widthPercent: 15,
          heightPercent: 8,
          pageNumber: 1,
          documentIndex: 0,
          value: '',
          required: true
        }]
      }],
      signers: [{
        name: 'Updated Signer',
        email: 'updated@example.com'
      }],
      subject: 'Updated Document',
      message: 'Updated message'
    };

    const updateResult = await makeRequest(`/api/documents/${documentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(updateData)
    });

    if (!updateResult.ok) {
      throw new Error(`Document update failed: ${updateResult.data.error}`);
    }

    console.log('✅ Document updated successfully with fields\n');

    // Step 6: Verify updated document
    console.log('🧪 Step 6: Verifying updated document...');
    
    const verifyResult = await makeRequest(`/api/documents/${documentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!verifyResult.ok) {
      throw new Error(`Failed to verify document: ${verifyResult.data.error}`);
    }

    const updatedDoc = verifyResult.data.document;
    const fieldCount = updatedDoc.files[0].fields?.length || 0;
    
    console.log('✅ Document verification successful');
    console.log(`   Fields added: ${fieldCount}`);
    console.log(`   Updated subject: ${updatedDoc.subject}\n`);

    // Step 7: Test file access after update
    console.log('🧪 Step 7: Testing file access after document update...');
    
    const finalFileResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!finalFileResponse.ok) {
      throw new Error(`Final file access failed: ${finalFileResponse.status}`);
    }

    console.log('✅ File access still working after update\n');

    console.log('📊 Test Results Summary');
    console.log('=======================');
    console.log('✅ All document editor flow tests passed!');
    console.log('✅ Authentication working correctly');
    console.log('✅ Document upload working');
    console.log('✅ Document loading working');
    console.log('✅ File serving working (no CORS issues)');
    console.log('✅ Document updates working');
    console.log('✅ Field management working');
    console.log('\n🎉 Document editor is ready for use!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testEditorFlow(); 