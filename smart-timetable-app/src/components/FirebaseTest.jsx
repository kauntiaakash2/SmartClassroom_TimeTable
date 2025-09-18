import React, { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { app } from '../firebase-config';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);

  const testFirebase = async () => {
    try {
      setError(null);
      setTestResult(null);
      
      // Test Firebase initialization
      const auth = getAuth(app);
      
      // Log Firebase config for verification (remove in production)
      console.log('Firebase Config:', {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? 'Present' : 'Missing',
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing',
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? 'Present' : 'Missing',
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ? 'Present' : 'Missing',
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? 'Present' : 'Missing',
        appId: process.env.REACT_APP_FIREBASE_APP_ID ? 'Present' : 'Missing'
      });

      // Test authentication
      await signInAnonymously(auth);
      setTestResult('Firebase is properly configured and working!');
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

      <Typography variant="subtitle2" color="text.secondary">
        Check the browser console for detailed configuration status
      </Typography>
    </Box>
  );
};

export default FirebaseTest;