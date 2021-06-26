import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "users/signupUser",
    async (values) => {
      try {
         const res = await axios.post("http://localhost:5000/register", values)
          console.log(res.data);
          return res.data.data
      } catch (error) {
        console.log(error);
        
      }
    } 
);

export const signinUser = createAsyncThunk(
  "users/signinUser",
    async (values) => {
      try {
         const res = await axios.post("http://localhost:5000/login", values)
          console.log(res.data);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          return res.data.data
      } catch (error) {
        console.log(error);
        
      }
    } 
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    token: "",
    user: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    getUser: (state) => {
      state.token = localStorage.getItem("token");
      state.user = JSON.parse(localStorage.getItem("user"));
      return state
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      return state
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      console.log(action);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = action.payload.email;
      state.username = action.payload.name;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
    },
    [signinUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signinUser.fulfilled]: (state, action )=> {
      console.log(action);
      state.email = action.payload.email;
      state.username = action.payload.name;
      state.token = action.payload.token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [signinUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
    },
  
  },
});

export const { clearState, getUser, logout } = userSlice.actions;

export const userSelector = (state) => state.user;
