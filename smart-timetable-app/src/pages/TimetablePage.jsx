import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';
import TimetableView from '../components/Timetable/TimetableView';
import TimetableForm from '../components/Timetable/TimetableForm';
import { Comments } from '../components/Comments/interface';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const TimetablePage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, userRole } = useAuth();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableRef = doc(db, 'timetables', userRole);
        const timetableDoc = await getDoc(timetableRef);
        
        if (timetableDoc.exists()) {
          setTimetable(timetableDoc.data());
        }
      } catch (error) {
        setError('Failed to load timetable: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [userRole]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleTimetableSubmit = async (newTimetable) => {
    try {
      const timetableRef = doc(db, 'timetables', userRole);
      await setDoc(timetableRef, newTimetable);
      setTimetable(newTimetable);
    } catch (error) {
      setError('Failed to save timetable: ' + error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Timetable Management
      </Typography>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="View Timetable" />
          {(userRole === 'admin' || userRole === 'teacher') && (
            <Tab label="Edit Timetable" />
          )}
        </Tabs>
      </Box>

      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              {loading ? (
                <Typography>Loading timetable...</Typography>
              ) : (
                <TimetableView timetable={timetable} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Comments 
              timetableId={userRole} 
              title="Timetable Discussion" 
            />
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (userRole === 'admin' || userRole === 'teacher') && (
        <Paper sx={{ p: 2 }}>
          <TimetableForm
            initialData={timetable}
            onSubmit={handleTimetableSubmit}
          />
        </Paper>
      )}
    </Container>
  );
};

export default TimetablePage;