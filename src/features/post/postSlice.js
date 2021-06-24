import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

  export const createPost = createAsyncThunk(
    'post/createPost',
    async ({ title, body, pic }, thunkAPI) => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/create_post',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
              title,
              body,
              pic
            }),
          }
        );
        let data = await response.json();
        if (response.status === 200) {
            console.log(data);
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

 

  

export const postSlice = createSlice({

    name:'post',
    initialState: {
        posts:[],
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
        [createPost.fulfilled]: (state, {payload}) => {
          state.posts = state.posts.push(payload.data)
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        },
        [createPost.rejected]: (state, { payload }) => {
          state.isFetching = false;
          state.isError = true;
          state.errorMessage = payload.data;
        },
        [createPost.pending]: (state) => {
          state.isFetching = true;
        },
    }
})

export const { clearState } = postSlice.actions;


export const postSelector = (state) => state.post