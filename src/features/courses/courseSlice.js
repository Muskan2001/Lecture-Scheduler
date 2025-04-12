import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  courses: [
    {
      id: '1',
      name: 'MERN Stack',
      level: 'Intermediate',
      description: 'Full stack web development with MongoDB, Express, React, and Node.',
      image: 'https://via.placeholder.com/150',
      batches: ['Batch 1', 'Batch 2'],
    },
  ],
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: {
      reducer: (state, action) => {
        state.courses.push(action.payload);
      },
      prepare: (course) => ({
        payload: { id: nanoid(), ...course },
      }),
    },
  },
});

export const { addCourse } = courseSlice.actions;
export default courseSlice.reducer;
