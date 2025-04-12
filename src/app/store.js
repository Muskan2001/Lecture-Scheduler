import { configureStore } from '@reduxjs/toolkit';
import instructorReducer from '../features/instructor/instructorSlice';
import coursesReducer from '../features/courses/courseSlice'
import lectureReducer from '../features/lectures/lectureSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    instructor: instructorReducer,
    courses: coursesReducer,
    lectures: lectureReducer,
    auth: authReducer,
  },
});
