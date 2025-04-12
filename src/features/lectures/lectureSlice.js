const initialState = {
    lectures: [
      {
        id: '1',
        instructorId: '1',
        courseId: '1',
        date: '2025-04-03',
        time: '10:00',
        duration: 60,
        attendance: 'Not Attended',
      },
    ],
  };
  
  const lectureSlice = createSlice({
    name: 'lectures',
    initialState,
    reducers: {
      scheduleLecture: {
        reducer: (state, action) => {
          state.lectures.push({ ...action.payload, attendance: 'Not Attended' });
        },
        prepare: (lecture) => ({
          payload: { id: nanoid(), ...lecture },
        }),
      },
      markAttendance: (state, action) => {
        const { id, status } = action.payload;
        const lecture = state.lectures.find((lec) => lec.id === id);
        if (lecture) {
          lecture.attendance = status;
        }
      },
    },
  });
  
  export const { scheduleLecture, markAttendance } = lectureSlice.actions;
  export default lectureSlice.reducer;
  