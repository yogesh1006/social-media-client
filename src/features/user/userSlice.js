import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async ({ name, email, password }, thunkAPI) => {
      try {
        const response = await fetch(
          'http://localhost:5000/register',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );
        let data = await response.json();
        if (response.status === 200) {
          localStorage.setItem('token', data.token);
          return { ...data, username: name, email: email };
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );


  export const signinUser = createAsyncThunk(
    'users/signinUser',
    async ({ email, password }, thunkAPI) => {
      try {
        const response = await fetch(
          'http://localhost:5000/login',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        let data = await response.json();
        if (response.status === 200) {
          localStorage.setItem('token', data.data.token);
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

export const userSlice = createSlice({

    name:'user',
    initialState: {
        username: '',
        email: '',
        token:'',
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
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
        [signupUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.data.email;
            state.username = payload.data.name;
        },
        [signupUser.pending]: (state) => {
            state.isFetching = true;
        },
        [signupUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.data.message;
        },

        [signinUser.fulfilled]: (state, { payload }) => {
          state.email = payload.data.email;
          state.username = payload.data.name;
          state.token = payload.data.token;
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        },
        [signinUser.rejected]: (state, { payload }) => {
          state.isFetching = false;
          state.isError = true;
          state.errorMessage = payload.data.message;
        },
        [signinUser.pending]: (state) => {
          state.isFetching = true;
        },
    }
})

export const { clearState } = userSlice.actions;


export const userSelector = (state) => state.user