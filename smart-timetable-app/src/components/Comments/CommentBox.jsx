import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import { commentStyles } from './styles';
import { db } from '../../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const CommentBox = ({ timetableId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, userRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const commentData = {
        text: comment.trim(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userRole: userRole,
        timetableId,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'comments'), commentData);
      
      setComment('');
      if (onCommentAdded) {
        onCommentAdded({ id: docRef.id, ...commentData });
      }
    } catch (error) {
      setError('Failed to add comment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Comment
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CommentBox;