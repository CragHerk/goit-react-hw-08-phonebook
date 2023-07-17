import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import { logoutUser } from 'state/reducerAuth';

const LoginFormLink = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  const handleLogout = () => {
    // Wywołaj akcję wylogowania
    dispatch(logoutUser());
  };

  return (
    <div>
      <p>Email: {email}</p>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Log out
      </Button>
    </div>
  );
};

export default LoginFormLink;
