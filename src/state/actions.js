export const addContact = contact => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const deleteContact = contactId => ({
  type: 'DELETE_CONTACT',
  payload: contactId,
});
