import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  email: '',
  status: 'idle',
  error: null,
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

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    // Wywołaj żądanie wylogowania użytkownika
    // np. wysyłając zapytanie do serwera lub czyszcząc dane sesji
    // ...

    // Zwróć null lub inną wartość, jeśli potrzebne
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; // Zaktualizuj informacje o zalogowanym użytkowniku
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(logoutUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.status = 'succeeded';
        state.user = null; // Wyzeruj dane użytkownika
        state.email = ''; // Wyzeruj adres email
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
