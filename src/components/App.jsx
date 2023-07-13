import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'state/store';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import LoginFormLink from './LoginFormLink/LoginFormLink';

import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/password" element={<ForgotPassword />} />
          </Routes>
        </React.Fragment>
      </Router>
    </Provider>
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
