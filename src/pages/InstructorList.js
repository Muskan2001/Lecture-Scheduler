import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInstructor, updateInstructor } from '../features/instructor/instructorSlice';

import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from '@mui/material';

const InstructorList = () => {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructor.instructors);
  const [form, setForm] = useState({ name: '', email: '', id: null });
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateInstructor(form));
    } else {
      dispatch(addInstructor({ name: form.name, email: form.email }));
    }
    setForm({ name: '', email: '', id: null });
    setEditMode(false);
  };

  const handleEdit = (instructor) => {
    setForm(instructor);
    setEditMode(true);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Instructor Management</Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color={editMode ? 'warning' : 'primary'}
                  fullWidth
                >
                  {editMode ? 'Update' : 'Add'} Instructor
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Instructor List</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructors.map((ins) => (
                <TableRow key={ins.id}>
                  <TableCell>{ins.name}</TableCell>
                  <TableCell>{ins.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(ins)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorList;
