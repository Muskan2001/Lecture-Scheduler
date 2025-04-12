// import { Routes, Route } from 'react-router-dom';
// import AppLayout from './components/AppLayout';
// import AdminDashboard from './pages/AdminDashboard';
// import InstructorList from './pages/InstructorList';
// import AddCourse from './pages/AddCourse';
// import ScheduleLectures from './pages/ScheduleLectures';
// import InstructorPanel from './pages/InstructorPanel';

// function App() {
//   return (
//     <Routes>
//       <Route element={<AppLayout />}>
//         <Route path="/" element={<AdminDashboard />} />
//         <Route path="/instructors" element={<InstructorList />} />
//         <Route path="/courses/add" element={<AddCourse />} />
//         <Route path="/lectures/schedule" element={<ScheduleLectures />} />
//         <Route path="/instructor/panel" element={<InstructorPanel />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AdminDashboard from './pages/AdminDashboard';
import InstructorList from './pages/InstructorList';
import AddCourse from './pages/AddCourse';
import ScheduleLectures from './pages/ScheduleLectures';
import InstructorPanel from './pages/InstructorPanel';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        {/* Admin Screens */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructors"
          element={
            <ProtectedRoute role="admin">
              <InstructorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/add"
          element={
            <ProtectedRoute role="admin">
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lectures/schedule"
          element={
            <ProtectedRoute role="admin">
              <ScheduleLectures />
            </ProtectedRoute>
          }
        />

        {/* Instructor Only */}
        <Route
          path="/instructor/panel"
          element={
            <ProtectedRoute role="instructor">
              <InstructorPanel />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
