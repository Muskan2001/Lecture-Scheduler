import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  instructors: [
    { id: '1', name: 'Muskan', email: 'm@gmail.com' },
    { id: '2', name: 'Shivani', email: 's@gmail.com' },

  ],
};

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    addInstructor: {
      reducer: (state, action) => {
        state.instructors.push(action.payload);
      },
      prepare: (instructor) => ({
        payload: { id: nanoid(), ...instructor },
      }),
    },
    updateInstructor: (state, action) => {
      const { id, name, email } = action.payload;
      const instructor = state.instructors.find((i) => i.id === id);
      if (instructor) {
        instructor.name = name;
        instructor.email = email;
      }
    },
  },
});

export const { addInstructor, updateInstructor } = instructorSlice.actions;
export default instructorSlice.reducer;
