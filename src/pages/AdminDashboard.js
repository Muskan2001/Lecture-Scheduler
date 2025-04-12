import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Instructors</Typography>
              <Typography variant="h4">10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Courses</Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Lectures Scheduled</Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
