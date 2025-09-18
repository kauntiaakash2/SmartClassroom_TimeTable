import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from '@mui/material';

const TimetableForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleChange = (day, time, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: {
          ...(prev[day]?.[time] || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {days.map((day) => (
        <Box key={day} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {day}
          </Typography>
          {timeSlots.map((time) => (
            <Grid container spacing={2} key={`${day}-${time}`} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">{time}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={formData[day]?.[time]?.subject || ''}
                  onChange={(e) => handleChange(day, time, 'subject', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Teacher"
                  value={formData[day]?.[time]?.teacher || ''}
                  onChange={(e) => handleChange(day, time, 'teacher', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Save Timetable
      </Button>
    </Box>
  );
};

export default TimetableForm;