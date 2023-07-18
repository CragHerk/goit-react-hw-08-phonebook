import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const registerUser = createAction('auth/registerUser');
export const loginUser = createAction('auth/loginUser');
export const getCurrentUser = createAction('auth/getCurrentUser');
