import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../../state/reducer';
import { toast } from 'react-toastify';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

import { selectContacts, selectFilter } from '../../state/selectors';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = async contactId => {
    try {
      await dispatch(deleteContact(contactId));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete contact');
    }
  };

  if (contacts.status === 'loading') {
    return <CircularProgress />;
  }

  if (contacts.status === 'failed') {
    return <div>Error: {contacts.error}</div>;
  }

  const filteredContacts = filter
    ? contacts.contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts.contacts;

  return (
    <List>
      {filteredContacts.map(contact => (
        <ListItem key={contact.id}>
          <ListItemText primary={`${contact.name} - ${contact.number}`} />
          <Button onClick={() => handleDeleteContact(contact.id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
