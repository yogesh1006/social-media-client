import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from '../features/user/userSlice'
import {postSlice} from '../features/post/postSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
});
