import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "feed/getallposts",
  async (value, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/get_all_posts`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFollowingUserPosts = createAsyncThunk(
  "feed/getallfollowinguserposts",
  async (value, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/get_otheruser_posts`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeHandler = createAsyncThunk(
  "feed/likepost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/like_post`,
        {
          postId: id,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const unlikeHandler = createAsyncThunk(
  "feed/unlikepost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/unlike_post`,
        {
          postId: id,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "feed/deletepost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/delete_post/${postId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const makeComment = createAsyncThunk(
  "feed/makecomment",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/add_comment`,
        {
          comment: value.text,
          postId: value.id,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetFeed(state, action) {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getFollowingUserPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFollowingUserPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [likeHandler.fulfilled]: (state, action) => {
      state.posts = action.payload.data;
    },
    [unlikeHandler.fulfilled]: (state, action) => {
      state.posts = action.payload.data;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [makeComment.fulfilled]: (state, action) => {
      state.posts = action.payload.data;
    },
  },
});

export const { resetFeed } = feedSlice.actions;
export const feedSelector = (state) => state.feed;
