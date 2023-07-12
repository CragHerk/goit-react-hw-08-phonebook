import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../state/reducer';
import { Button, TextField, Grid } from '@mui/material';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = React.useState({ name: '', number: '' });
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (formData.name.trim() === '' || formData.number.trim() === '') {
      return;
    }
    dispatch(addContact(formData));
    setFormData({ name: '', number: '' });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Contact
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
