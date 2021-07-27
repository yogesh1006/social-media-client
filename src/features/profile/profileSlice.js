import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPosts = createAsyncThunk(
  "feed/getuserposts",
  async (value, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/get_user_posts`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadPic = createAsyncThunk(
  "feed/uploadpic",
  async (value, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/update_pic`,
        {
          pic: value,
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "feed/getuser",
  async (value, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/get_user`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    posts: [],
    profile: {},
    status: "idle",
    error: null,
  },
  reducers: {
    resetProfile(state, action) {
      state.posts = [];
      state.user = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [getUserPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { resetProfile } = profileSlice.actions;
export const profileSelector = (state) => state.profile;
