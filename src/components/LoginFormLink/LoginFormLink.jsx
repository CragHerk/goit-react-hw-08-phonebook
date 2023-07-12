import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const LoginFormLink = () => {
  return (
    <Button component={Link} to="/" variant="contained" color="primary">
      Log out
    </Button>
  );
};

export default LoginFormLink;
