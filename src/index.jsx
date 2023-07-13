import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/state/store";
import ContactForm from "../src/components/ContactForm/ContactForm";
import ContactList from "../src/components/ContactList/ContactList";
import Filter from "../src/components/Filter/Filter";
import LoginFormLink from "../src/components/LoginFormLink/LoginFormLink";

import LoginForm from "../src/components/LoginForm/LoginForm";
import RegisterForm from "../src/components/RegisterForm/RegisterForm";
import ForgotPassword from "../src/components/ForgotPassword/ForgotPassword";

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/password" element={<ForgotPassword />} />
          </Routes>
        </div>
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
