import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

const Comments = ({ timetableId, title = 'Discussion' }) => {
  const handleCommentAdded = (newComment) => {
    // Optional callback when a new comment is added
    console.log('New comment added:', newComment);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <CommentBox 
          timetableId={timetableId} 
          onCommentAdded={handleCommentAdded} 
        />
        <CommentList timetableId={timetableId} />
      </Paper>
    </Box>
  );
};

export default Comments;