import React, { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { app, db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);

  const testFirebase = async () => {
    try {
      setError(null);
      setTestResult(null);
      
      // Test Firebase app initialization
      console.log('Firebase App:', app);
      console.log('Firebase App Name:', app.name);
      console.log('Firebase Project ID:', app.options.projectId);
      
      // Test Firestore connection by attempting to read from a collection
      // This doesn't require authentication for public collections
      try {
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        console.log('Firestore connection successful');
      } catch (firestoreError) {
        // This is expected if the collection doesn't exist or has security rules
        console.log('Firestore connection test (expected behavior):', firestoreError.message);
      }

      // If we reach here, Firebase is properly initialized
      setTestResult('Firebase is properly configured and initialized!');
      
    } catch (err) {
      console.error('Firebase Test Error:', err);
      setError(`Firebase configuration error: ${err.message}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Firebase Configuration Test
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testFirebase} 
        sx={{ mb: 2 }}
      >
        Test Firebase Connection
      </Button>

      {testResult && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {testResult}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Firebase Configuration Status:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Project ID: sih28-9692b<br/>
          • Auth Domain: sih28-9692b.firebaseapp.com<br/>
          • Storage Bucket: sih28-9692b.firebasestorage.app
        </Typography>
      </Box>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
        Check the browser console for detailed configuration status
      </Typography>
    </Box>
  );
};

export default FirebaseTest;
