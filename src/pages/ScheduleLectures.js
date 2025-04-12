import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { scheduleLecture } from '../features/lectures/lectureSlice';

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';

const ScheduleLectures = () => {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructor.instructors);
  const courses = useSelector((state) => state.courses.courses);
  const lectures = useSelector((state) => state.lectures.lectures);

  const [form, setForm] = useState({
    instructorId: '',
    courseId: '',
    date: '',
    time: '',
    duration: 60,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkConflict = () => {
    const { instructorId, date, time, duration } = form;
    const newStart = new Date(`${date}T${time}`);
    const newEnd = new Date(newStart.getTime() + duration * 60000);

    return lectures.some((lec) => {
      if (lec.instructorId !== instructorId || lec.date !== date) return false;
      const lecStart = new Date(`${lec.date}T${lec.time}`);
      const lecEnd = new Date(lecStart.getTime() + lec.duration * 60000);
      return newStart < lecEnd && lecStart < newEnd;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkConflict()) {
      setError('❌ This instructor already has a lecture at that time!');
      return;
    }
    dispatch(scheduleLecture(form));
    setForm({ instructorId: '', courseId: '', date: '', time: '', duration: 60 });
    setError('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Schedule a Lecture</Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Instructor"
                  name="instructorId"
                  fullWidth
                  required
                  value={form.instructorId}
                  onChange={handleChange}
                >
                  {instructors.map((ins) => (
                    <MenuItem key={ins.id} value={ins.id}>
                      {ins.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Course"
                  name="courseId"
                  fullWidth
                  required
                  value={form.courseId}
                  onChange={handleChange}
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  type="date"
                  name="date"
                  fullWidth
                  required
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.date}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  type="time"
                  name="time"
                  fullWidth
                  required
                  label="Time"
                  InputLabelProps={{ shrink: true }}
                  value={form.time}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  type="number"
                  name="duration"
                  label="Duration (mins)"
                  fullWidth
                  required
                  value={form.duration}
                  onChange={handleChange}
                />
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Schedule Lecture
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleLectures;
