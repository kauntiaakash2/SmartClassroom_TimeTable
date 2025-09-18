import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { Comments } from '../components/Comments/interface';

const CommentsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Discussion Board
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Comments 
          timetableId="general"
          title="General Discussion"
        />
      </Paper>
    </Container>
  );
};

export default CommentsPage;