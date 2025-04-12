import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendance } from '../features/lectures/lectureSlice';

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  InputLabel,
  FormControl,
} from '@mui/material';

const InstructorPanel = () => {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.lectures);
  const courses = useSelector((state) => state.courses.courses);

  const [filters, setFilters] = useState({
    instructorId: '1', // Simulate logged-in instructor
    searchCourse: '',
    date: '',
    attendance: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredLectures = lectures.filter((lec) => {
    const course = courses.find((c) => c.id === lec.courseId);
    return (
      lec.instructorId === filters.instructorId &&
      (!filters.searchCourse || course?.name.toLowerCase().includes(filters.searchCourse.toLowerCase())) &&
      (!filters.date || lec.date === filters.date) &&
      (!filters.attendance || lec.attendance === filters.attendance)
    );
  });

  const handleAttendance = (id, status) => {
    dispatch(markAttendance({ id, status }));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Instructor Panel</Typography>

      {/* Filter Form */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Course Name"
            name="searchCourse"
            fullWidth
            value={filters.searchCourse}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Filter by Date"
            type="date"
            name="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Attendance</InputLabel>
            <Select
              name="attendance"
              value={filters.attendance}
              label="Attendance"
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Attended">Attended</MenuItem>
              <MenuItem value="Not Attended">Not Attended</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Lecture List */}
      <Grid container spacing={2}>
        {filteredLectures.map((lec) => {
          const course = courses.find((c) => c.id === lec.courseId);
          return (
            <Grid item xs={12} sm={6} md={4} key={lec.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course?.name}</Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {lec.date} <br />
                    <strong>Time:</strong> {lec.time} <br />
                    <strong>Duration:</strong> {lec.duration} min
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    Attendance: <strong>{lec.attendance}</strong>
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      onClick={() => handleAttendance(lec.id, 'Attended')}
                    >
                      Mark Attended
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleAttendance(lec.id, 'Not Attended')}
                    >
                      Mark Not Attended
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default InstructorPanel;
