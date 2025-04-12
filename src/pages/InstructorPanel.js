import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendance } from '../features/lectures/lectureSlice';

const InstructorPanel = () => {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.lectures);
  const instructors = useSelector((state) => state.instructor.instructors);
  const courses = useSelector((state) => state.courses.courses);

  const [filters, setFilters] = useState({
    instructorId: '1', // Simulating logged-in instructor (dummy ID)
    searchCourse: '',
    date: '',
    attendance: '',
  });

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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Instructor Panel</h2>

      {/* Filters */}
      <div className="space-y-2 mb-4">
        <input
          type="text"
          placeholder="Search by course name"
          value={filters.searchCourse}
          onChange={(e) => setFilters({ ...filters, searchCourse: e.target.value })}
          className="border p-1 block w-full"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border p-1 block w-full"
        />
        <select
          value={filters.attendance}
          onChange={(e) => setFilters({ ...filters, attendance: e.target.value })}
          className="border p-1 block w-full"
        >
          <option value="">All Attendance</option>
          <option value="Attended">Attended</option>
          <option value="Not Attended">Not Attended</option>
        </select>
      </div>

      {/* Lecture List */}
      <ul className="space-y-3">
        {filteredLectures.map((lec) => {
          const course = courses.find((c) => c.id === lec.courseId);
          return (
            <li key={lec.id} className="border p-3">
              <p>
                <strong>Course:</strong> {course?.name}
              </p>
              <p>
                <strong>Date:</strong> {lec.date} | <strong>Time:</strong> {lec.time}
              </p>
              <p>
                <strong>Status:</strong> {lec.attendance}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleAttendance(lec.id, 'Attended')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Mark Attended
                </button>
                <button
                  onClick={() => handleAttendance(lec.id, 'Not Attended')}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Mark Not Attended
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InstructorPanel;
