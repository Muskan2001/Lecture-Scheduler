import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../features/courses/courseSlice';

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
    const newBatches = [...form.batches];
    newBatches[index] = value;
    setForm({ ...form, batches: newBatches });
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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={form.name}
          onChange={handleChange}
          required
          className="block border p-2 w-full"
        />
        <input
          type="text"
          name="level"
          placeholder="Level"
          value={form.level}
          onChange={handleChange}
          required
          className="block border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="block border p-2 w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="block border p-2 w-full"
        />
        <div>
          <label className="block font-medium">Batches:</label>
          {form.batches.map((batch, index) => (
            <input
              key={index}
              type="text"
              value={batch}
              onChange={(e) => handleBatchChange(index, e.target.value)}
              className="block border p-2 w-full mb-1"
              placeholder={`Batch ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={handleAddBatch}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            Add Batch
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Course
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6">All Courses (Dummy View)</h3>
      <ul className="mt-2 space-y-2">
        {courses.map((course) => (
          <li key={course.id} className="border p-2">
            <strong>{course.name}</strong> ({course.level})<br />
            {course.description}<br />
            <img src={course.image} alt={course.name} className="w-32 h-20 object-cover mt-1" />
            <p className="mt-1 text-sm">Batches: {course.batches.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCourse;
