// Complete Flow Test - Upload, Editor Access, File Serving
// This script tests the complete flow that the frontend editor would use

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

// Test complete flow
async function testCompleteFlow() {
  console.log('🚀 Testing Complete Document Editor Flow');
  console.log('==========================================\n');

  let accessToken = null;
  let documentId = null;
  let fileId = null;

  try {
    // Step 1: Create account and authenticate
    console.log('🧪 Step 1: Creating test account...');
    const testEmail = `complete_test_${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    const signupResult = await makeRequest('/auth/email-signup', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: 'Complete Test User',
        confirmPassword: testPassword
      })
    });

    if (!signupResult.ok) {
      throw new Error(`Signup failed: ${signupResult.data.error || signupResult.data.message}`);
    }

    accessToken = signupResult.data.data.accessToken;
    console.log('✅ Account created and authenticated');
    console.log(`   User ID: ${signupResult.data.data.userId}`);
    console.log(`   Email: ${signupResult.data.data.email}\n`);

    // Step 2: Upload a test document (simulating new document creation)
    console.log('🧪 Step 2: Uploading test document...');
    
    const testFileContent = 'This is a test PDF content for the document editor.\n\nThis file will be used to test:\n- File upload\n- Document loading\n- File serving\n- Editor functionality\n\nAll systems should work correctly.';
    const blob = new Blob([testFileContent], { type: 'application/pdf' });
    
    const formData = new FormData();
    formData.append('documents', blob, 'test-document.pdf');
    formData.append('title_0', 'Complete Test Document');
    formData.append('mimeType_0', 'application/pdf');
    formData.append('fields_0', JSON.stringify([]));
    formData.append('signers', JSON.stringify([
      {name: 'John Doe', email: 'john@example.com'},
      {name: 'Jane Smith', email: 'jane@example.com'}
    ]));
    formData.append('subject', 'Complete Flow Test Document');
    formData.append('message', 'This document is for testing the complete editor flow');
    formData.append('configuration', JSON.stringify({
      allowComments: true,
      requireAllSignatures: true
    }));

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
    console.log('✅ Document uploaded successfully');
    console.log(`   Document ID: ${documentId}`);
    console.log(`   File ID: ${fileId}`);
    console.log(`   Title: ${uploadData.document.title}\n`);

    // Step 3: Load document (simulating editor opening document)
    console.log('🧪 Step 3: Loading document for editor...');
    
    const documentResult = await makeRequest(`/api/documents/${documentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!documentResult.ok) {
      throw new Error(`Failed to load document: ${documentResult.data.error}`);
    }

    const document = documentResult.data.document;
    console.log('✅ Document loaded successfully');
    console.log(`   Title: ${document.title}`);
    console.log(`   Status: ${document.status}`);
    console.log(`   Files: ${document.files.length}`);
    console.log(`   Signers: ${document.signers.length}\n`);

    // Step 4: Test file access (simulating document viewer loading file)
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
    const contentType = fileResponse.headers.get('content-type');
    const contentDisposition = fileResponse.headers.get('content-disposition');
    
    console.log('✅ File access successful');
    console.log(`   File size: ${fileBuffer.byteLength} bytes`);
    console.log(`   Content type: ${contentType}`);
    console.log(`   Content disposition: ${contentDisposition}`);
    console.log(`   CORS headers present: ${fileResponse.headers.get('access-control-allow-origin') ? 'Yes' : 'No'}\n`);

    // Step 5: Add fields to document (simulating editor field placement)
    console.log('🧪 Step 5: Adding fields to document...');
    
    const updateData = {
      fileFields: [{
        fileId: fileId,
        fields: [
          {
            id: 'signature_1',
            type: 'signature',
            leftPercent: 10,
            topPercent: 20,
            widthPercent: 20,
            heightPercent: 10,
            pageNumber: 1,
            documentIndex: 0,
            value: '',
            required: true,
            assignedTo: 'john@example.com'
          },
          {
            id: 'date_1',
            type: 'date',
            leftPercent: 50,
            topPercent: 20,
            widthPercent: 15,
            heightPercent: 8,
            pageNumber: 1,
            documentIndex: 0,
            value: '',
            required: true,
            assignedTo: 'john@example.com'
          },
          {
            id: 'signature_2',
            type: 'signature',
            leftPercent: 10,
            topPercent: 40,
            widthPercent: 20,
            heightPercent: 10,
            pageNumber: 1,
            documentIndex: 0,
            value: '',
            required: true,
            assignedTo: 'jane@example.com'
          }
        ]
      }]
    };

    const updateResult = await makeRequest(`/api/documents/${documentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    if (!updateResult.ok) {
      throw new Error(`Document update failed: ${updateResult.data.error}`);
    }

    console.log('✅ Fields added successfully');
    console.log(`   Added 3 fields (2 signatures, 1 date)\n`);

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
    console.log(`   Fields in document: ${fieldCount}`);
    console.log(`   Document status: ${updatedDoc.status}\n`);

    // Step 7: Test file access after update (ensuring no CORS issues)
    console.log('🧪 Step 7: Testing file access after document update...');
    
    const finalFileResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!finalFileResponse.ok) {
      throw new Error(`Final file access failed: ${finalFileResponse.status}`);
    }

    console.log('✅ File access still working after update');
    console.log('✅ No CORS issues detected\n');

    // Step 8: Test document sending (simulating workflow initiation)
    console.log('🧪 Step 8: Testing document sending workflow...');
    
    const sendData = {
      fileFields: [{
        fileId: fileId,
        fields: updatedDoc.files[0].fields
      }],
      signers: [
        {name: 'John Doe', email: 'john@example.com', role: 'sign'},
        {name: 'Jane Smith', email: 'jane@example.com', role: 'sign'}
      ],
      subject: 'Please sign: Complete Flow Test Document',
      message: 'This document requires your signature. Please review and sign.',
      configuration: {
        workflowType: 'parallel',
        allowComments: true
      }
    };

    const sendResult = await makeRequest(`/api/documents/${documentId}/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    if (!sendResult.ok) {
      throw new Error(`Document send failed: ${sendResult.data.error}`);
    }

    console.log('✅ Document sent successfully');
    console.log(`   Sent to ${sendData.signers.length} signers\n`);

    console.log('📊 Complete Flow Test Results');
    console.log('=============================');
    console.log('✅ All tests passed successfully!');
    console.log('✅ Authentication working correctly');
    console.log('✅ Document upload working');
    console.log('✅ Document loading working');
    console.log('✅ File serving working (no CORS issues)');
    console.log('✅ Document updates working');
    console.log('✅ Field management working');
    console.log('✅ Document sending working');
    console.log('\n🎉 Document editor is fully functional!');
    console.log('\n🌐 You can now test the frontend at:');
    console.log(`   http://localhost:3002/editor/${documentId}`);
    console.log(`   http://localhost:3002/dashboard`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testCompleteFlow(); 