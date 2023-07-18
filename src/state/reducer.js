import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { getState }) => {
    try {
      const { token } = getState().auth;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        'https://connections-api.herokuapp.com/contacts',
        { headers }
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
  async (contactId, { getState }) => {
    try {
      const { token } = getState().auth;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${contactId}`,
        { headers }
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
  async (contact, { getState }) => {
    try {
      const { token } = getState().auth;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        'https://connections-api.herokuapp.com/contacts',
        contact,
        { headers }
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
    contactId: null,
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
    setContactId: (state, action) => {
      state.contactId = action.payload; // Zaktualizuj contactId w stanie
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
        state.contactId = action.payload.contactId;
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
