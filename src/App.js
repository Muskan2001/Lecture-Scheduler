
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import InstructorList from './pages/InstructorList';
import AddCourse from './pages/AddCourse';
import ScheduleLectures from './pages/ScheduleLectures';
import InstructorPanel from './pages/InstructorPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/instructors" element={<InstructorList />} />
      <Route path="/courses/add" element={<AddCourse />} />
      <Route path="/lectures/schedule" element={<ScheduleLectures />} />
      <Route path="/instructor/panel" element={<InstructorPanel />} />

    </Routes>
  );
}

export default App;
