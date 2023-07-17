export const addContact = contact => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const deleteContact = contactId => ({
  type: 'DELETE_CONTACT',
  payload: contactId,
});

export const registerUser = userData => ({
  type: 'REGISTER_USER',
  payload: userData,
});

export const loginUser = userData => ({
  type: 'LOGIN_USER',
  payload: userData,
});
