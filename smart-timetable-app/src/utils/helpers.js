// Validates required environment variables
export const validateEnv = () => {
  const requiredEnvVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }

  return true;
};

// Format date strings
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Format time strings
export const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Generate time slots
export const generateTimeSlots = (startTime = '09:00', endTime = '17:00', interval = 60) => {
  const slots = [];
  let current = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  while (current < end) {
    slots.push(current.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
    current = new Date(current.getTime() + interval * 60000);
  }

  return slots;
};