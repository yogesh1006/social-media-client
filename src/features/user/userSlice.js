import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "users/signupUser",
    async (values, {rejectWithValue}) => {
      try {
         const res = await axios.post(`${process.env.REACT_APP_BACKEND}/register`, values)
          return res.data.data
      } catch (error) {
        return rejectWithValue(error.response.data)
        
      }
    } 
);

export const signinUser = createAsyncThunk(
  "users/signinUser",
    async (values,{rejectWithValue}) => {
      try {
         const res = await axios.post(`${process.env.REACT_APP_BACKEND}/login`, values)
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          return res.data.data
      } catch (error) {
        return rejectWithValue(error.response.data)
        
      }
    } 
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    isFetching: "",
    isSuccess: false,
    isError:false,
    errorMessage: "",
  },
  reducers: {
    getUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
      state.isSuccess= true;
      return state
    },
    logout: (state) => {
      state.token = null;
      state.isSuccess=false;
      localStorage.removeItem("token");
      return state
    },
    clearState: (state) => {
      // state.isSuccess = false;
      state.isFetching = false;
      state.isError = false;
      // state.isloggedIn = false;
      return state;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess =false;
      state.isError = true;
      state.errorMessage = payload.data.message;
    },
    [signinUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signinUser.fulfilled]: (state, action )=> {
      state.user = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [signinUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  
  },
});

export const { clearState, getUser, logout } = userSlice.actions;

export const userSelector = (state) => state.user;
