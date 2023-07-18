import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getCurrentUser } from 'state/reducerAuth';

const LoginFormLink = () => {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <div>
      <Typography
        variant="body1"
        component="p"
        sx={{ marginBottom: '16px', fontWeight: 'bold' }}
      >
        {user ? `Logged in as: ${user.name} (${user.email})` : ''}
      </Typography>

      <Button component={Link} to="/" variant="contained" color="primary">
        Log out
      </Button>
    </div>
  );
};

export default LoginFormLink;
