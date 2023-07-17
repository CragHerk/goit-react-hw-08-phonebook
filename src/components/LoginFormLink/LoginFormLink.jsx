import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LoginFormLink = () => {
  const user = useSelector(state => state.user);

  return (
    <div>
      <Typography
        variant="body1"
        component="p"
        sx={{ marginBottom: '16px', fontWeight: 'bold' }}
      >
        Logged in as: {user.name} ({user.email})
      </Typography>

      <Button component={Link} to="/" variant="contained" color="primary">
        Log out
      </Button>
    </div>
  );
};

export default LoginFormLink;
