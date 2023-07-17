// app.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import LoginFormLink from './LoginFormLink/LoginFormLink';

import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const App = () => {
  return (
    <Router basename="goit-react-hw-08-phonebook">
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

const Contacts = () => {
  return (
    <>
      <LoginFormLink />
      <ContactForm />
      <Filter />
      <ContactList />
    </>
  );
};

export default App;
