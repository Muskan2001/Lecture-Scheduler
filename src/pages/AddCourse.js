import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../features/courses/courseSlice';

import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';

const AddCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  const [form, setForm] = useState({
    name: '',
    level: '',
    description: '',
    image: '',
    batches: [''],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBatchChange = (index, value) => {
    const updated = [...form.batches];
    updated[index] = value;
    setForm({ ...form, batches: updated });
  };

  const handleAddBatch = () => {
    setForm({ ...form, batches: [...form.batches, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCourse(form));
    setForm({ name: '', level: '', description: '', image: '', batches: [''] });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Add Course</Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Course Name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="level"
                  label="Course Level"
                  fullWidth
                  required
                  value={form.level}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  required
                  value={form.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  fullWidth
                  value={form.image}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Batches</Typography>
                {form.batches.map((batch, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    value={batch}
                    placeholder={`Batch ${index + 1}`}
                    onChange={(e) => handleBatchChange(index, e.target.value)}
                    sx={{ mb: 1 }}
                  />
                ))}
                <Button variant="outlined" onClick={handleAddBatch}>
                  Add Batch
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Save Course
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>All Courses</Typography>

      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{course.level}</Typography>
                <Typography variant="body2" sx={{ my: 1 }}>{course.description}</Typography>
                {course.image && (
                  <Box
                    component="img"
                    src={course.image}
                    alt="Course"
                    sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 1 }}
                  />
                )}
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Batches: {course.batches.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AddCourse;
