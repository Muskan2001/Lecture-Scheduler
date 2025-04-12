import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { scheduleLecture } from '../features/lectures/lectureSlice';

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkConflict = () => {
    const { instructorId, date, time, duration } = form;
    const newStart = new Date(`${date}T${time}`);
    const newEnd = new Date(newStart.getTime() + duration * 60000);

    return lectures.some((lecture) => {
      if (lecture.instructorId !== instructorId || lecture.date !== date) return false;
      const existingStart = new Date(`${lecture.date}T${lecture.time}`);
      const existingEnd = new Date(existingStart.getTime() + lecture.duration * 60000);
      return newStart < existingEnd && existingStart < newEnd;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkConflict()) {
      alert('Instructor already has a lecture scheduled at that time!');
      return;
    }
    dispatch(scheduleLecture(form));
    alert('Lecture scheduled successfully!');
    setForm({ instructorId: '', courseId: '', date: '', time: '', duration: 60 });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Schedule Lecture</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select name="instructorId" value={form.instructorId} onChange={handleChange} required>
          <option value="">Select Instructor</option>
          {instructors.map((ins) => (
            <option key={ins.id} value={ins.id}>
              {ins.name}
            </option>
          ))}
        </select>

        <select name="courseId" value={form.courseId} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <input
          type="number"
          name="duration"
          min="15"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (mins)"
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Schedule Lecture
        </button>
      </form>
    </div>
  );
};

export default ScheduleLectures;
