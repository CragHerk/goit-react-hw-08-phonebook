import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const LoginFormLink = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      {user ? (
        <p>
          Logged in as: {user.name} ({user.email})
        </p>
      ) : (
        <Button component={Link} to="/" variant="contained" color="primary">
          Log out
        </Button>
      )}
    </div>
  );
};

export default LoginFormLink;
