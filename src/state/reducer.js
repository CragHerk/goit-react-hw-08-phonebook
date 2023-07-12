import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get(
        'https://64a7da22dca581464b84e431.mockapi.io/contacts'
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch contacts');
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      await axios.delete(
        `https://64a7da22dca581464b84e431.mockapi.io/contacts/${contactId}`
      );
      return contactId;
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete contact');
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    try {
      const response = await axios.post(
        'https://64a7da22dca581464b84e431.mockapi.io/contacts',
        contact
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error('Failed to add contact');
      throw error;
    }
  }
);

const handlePending = state => {
  state.status = 'loading';
};

const handleRejected = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(deleteContact.pending, handlePending)
      .addCase(addContact.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts.push(action.payload);
      });
  },
});

export const { setFilterValue } = contactSlice.actions;

export default contactSlice.reducer;
