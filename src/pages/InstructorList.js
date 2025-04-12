import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInstructor, updateInstructor } from '../features/instructor/instructorSlice';

const InstructorList = () => {
  const instructors = useSelector((state) => state.instructor.instructors);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ id: null, name: '', email: '' });
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateInstructor(form));
    } else {
      dispatch(addInstructor({ name: form.name, email: form.email }));
    }
    setForm({ id: null, name: '', email: '' });
    setEditMode(false);
  };

  const handleEdit = (instructor) => {
    setForm(instructor);
    setEditMode(true);
  };

  return (
    <div>
      <h2>Instructor List</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">{editMode ? 'Update' : 'Add'} Instructor</button>
      </form>

      <ul>
        {instructors.map((ins) => (
          <li key={ins.id}>
            {ins.name} - {ins.email}
            <button onClick={() => handleEdit(ins)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;
