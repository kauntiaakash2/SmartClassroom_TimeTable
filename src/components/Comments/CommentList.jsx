import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Box,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { commentStyles } from './styles';
import { db } from '../../firebase-config';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const CommentList = ({ timetableId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, userRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('timetableId', '==', timetableId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));
        setComments(commentList);
        setLoading(false);
      },
      (err) => {
        setError('Failed to load comments: ' + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [timetableId]);

  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleDeleteComment = async () => {
    if (!selectedComment) return;

    try {
      await deleteDoc(doc(db, 'comments', selectedComment.id));
      handleMenuClose();
    } catch (error) {
      setError('Failed to delete comment: ' + error.message);
    }
  };

  const canDeleteComment = (comment) => {
    return (
      userRole === 'admin' ||
      (currentUser && comment.userId === currentUser.uid)
    );
  };

  if (loading) {
    return <Typography>Loading comments...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        ...commentStyles.commentList,
        p: 2 
      }}
    >
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem
              alignItems="flex-start"
              sx={commentStyles.commentItem}
              secondaryAction={
                canDeleteComment(comment) && (
                  <IconButton
                    edge="end"
                    onClick={(e) => handleMenuOpen(e, comment)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )
              }
            >
              <ListItemAvatar>
                <Avatar>{comment.userEmail[0].toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={commentStyles.commentHeader}>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      {comment.userEmail}
                      <span style={commentStyles.userRole}>
                        {comment.userRole}
                      </span>
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={commentStyles.commentText}
                    >
                      {comment.text}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      sx={commentStyles.commentTimestamp}
                    >
                      {comment.createdAt?.toLocaleString() || 'Just now'}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteComment} sx={{ color: 'error.main' }}>
          Delete Comment
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default CommentList;