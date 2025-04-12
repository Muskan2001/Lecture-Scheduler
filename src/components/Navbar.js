import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Lecture Scheduler</Typography>
        <div>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/instructors">Instructors</Button>
          <Button color="inherit" component={Link} to="/courses/add">Add Course</Button>
          <Button color="inherit" component={Link} to="/lectures/schedule">Schedule</Button>
          <Button color="inherit" component={Link} to="/instructor/panel">Instructor Panel</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
