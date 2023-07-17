import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  email: '',
  status: 'idle',
  error: null,
  name: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ firstName, lastName, email, password }) => {
    try {
      const name = `${firstName} ${lastName}`;
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        { email, password }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Aktualizuj stan po zarejestrowaniu użytkownika, jeśli jest to potrzebne
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.email = action.payload.user.email; // Aktualizujemy email
        state.name = action.payload.user.name; // Aktualizujemy name
      });
  },
});

export default authSlice.reducer;
