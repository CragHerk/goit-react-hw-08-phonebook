import * as React from 'react';
import styles from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterValue } from '../../state/reducer';
import { selectFilter } from '../../state/selectors';
import { TextField } from '@mui/material';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilterValue(event.target.value));
  };

  return (
    <div className={styles.div}>
      <TextField
        className={styles.filter}
        fullWidth
        label="Filter contacts"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
