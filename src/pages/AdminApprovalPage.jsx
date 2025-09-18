import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { db } from '../firebase-config';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const AdminApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { userRole } = useAuth();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const q = query(
        collection(db, 'requests'),
        where('status', '==', 'pending')
      );
      const querySnapshot = await getDocs(q);
      const requestList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestList);
    } catch (error) {
      setError('Failed to fetch requests: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await updateDoc(doc(db, 'requests', requestId), {
        status: 'approved',
        updatedAt: new Date(),
        updatedBy: userRole,
      });
      await fetchPendingRequests();
    } catch (error) {
      setError('Failed to approve request: ' + error.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await updateDoc(doc(db, 'requests', requestId), {
        status: 'rejected',
        updatedAt: new Date(),
        updatedBy: userRole,
      });
      await fetchPendingRequests();
    } catch (error) {
      setError('Failed to reject request: ' + error.message);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading requests...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pending Approvals
      </Typography>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 2 }}>
        <List>
          {requests.length === 0 ? (
            <ListItem>
              <ListItemText primary="No pending requests" />
            </ListItem>
          ) : (
            requests.map((request) => (
              <ListItem key={request.id} divider>
                <ListItemText
                  primary={request.title}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Requested by: {request.requestedBy}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {new Date(request.createdAt?.toDate()).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={request.type}
                        size="small"
                        sx={{ mt: 1 }}
                        color="primary"
                      />
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleViewDetails(request)}
                    sx={{ mr: 1 }}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleApprove(request.id)}
                    color="success"
                    sx={{ mr: 1 }}
                  >
                    <ApproveIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleReject(request.id)}
                    color="error"
                  >
                    <RejectIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Dialog open={!!selectedRequest} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6">{selectedRequest.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedRequest.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Additional Information:</Typography>
                <Typography variant="body2">
                  Type: {selectedRequest.type}
                </Typography>
                <Typography variant="body2">
                  Requested By: {selectedRequest.requestedBy}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(selectedRequest.createdAt?.toDate()).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button
            onClick={() => {
              handleApprove(selectedRequest.id);
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Approve
          </Button>
          <Button
            onClick={() => {
              handleReject(selectedRequest.id);
              handleCloseDialog();
            }}
            color="error"
            variant="contained"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminApprovalPage;