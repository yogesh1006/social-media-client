import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ title, body, pic }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/create_post`,
        {
          title,
          body,
          pic,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      return response.data.data
    } catch (error) {
      console.log("Error", error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.isFetching = true;
    },
    [createPost.fulfilled]: (state, action) => {
      console.log(state);
      console.log(action);
      state.posts = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data;
    }
  },
});

export const { clearState } = postSlice.actions;

export const postSelector = (state) => state.post;
