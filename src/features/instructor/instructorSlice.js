import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  instructors: [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
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
