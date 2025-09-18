import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TimetableView = ({ timetable }) => {
  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="timetable">
        <TableHead>
          <TableRow>
            <TableCell>Time / Day</TableCell>
            {days.map((day) => (
              <TableCell key={day} align="center">{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((time) => (
            <TableRow key={time}>
              <TableCell component="th" scope="row">
                {time}
              </TableCell>
              {days.map((day) => (
                <TableCell key={`${day}-${time}`} align="center">
                  {timetable?.[day]?.[time]?.subject || ''}
                  {timetable?.[day]?.[time]?.teacher && (
                    <div style={{ fontSize: '0.8em', color: 'gray' }}>
                      {timetable[day][time].teacher}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimetableView;