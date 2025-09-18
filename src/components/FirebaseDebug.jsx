import React, { useEffect } from 'react';
import { auth } from '../firebase-config';

const FirebaseDebug = () => {
  useEffect(() => {
    console.log('Firebase Configuration:', {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    });
  }, []);

  return (
    <div>
      <h2>Firebase Debug Info</h2>
      <p>Check the console for configuration details.</p>
      <p>API Key exists: {process.env.REACT_APP_FIREBASE_API_KEY ? 'Yes' : 'No'}</p>
      <p>Auth Domain exists: {process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? 'Yes' : 'No'}</p>
      <p>Project ID exists: {process.env.REACT_APP_FIREBASE_PROJECT_ID ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default FirebaseDebug;