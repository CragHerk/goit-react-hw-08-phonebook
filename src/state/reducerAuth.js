import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        'https://connections-api.herokuapp.com/users/current',
        { headers }
      );
      return response.data.user; // Zwracamy tylko dane użytkownika
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    email: '',
    status: 'idle',
    error: null,
    name: '',
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Zaktualizuj wartość tokena w stanie
    },
  },
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
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.token = action.payload.token;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
