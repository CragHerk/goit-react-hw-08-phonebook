import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './reducer';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
