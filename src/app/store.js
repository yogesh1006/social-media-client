import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from '../features/user/userSlice'
import {postSlice} from '../features/post/postSlice'
import {feedSlice}  from '../features/feed/feedSlice'
import {profileSlice} from "../features/profile/profileSlice"

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    feed: feedSlice.reducer,
    profile: profileSlice.reducer,
  },
});
