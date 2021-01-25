import React from 'react';

import classes from './MainBody.module.scss';
import Dashboard from '../../Components/Dashboard/Dashboard';

const MainBody = () => {
  return (
    <div className={classes.Main}>
      <Dashboard />
    </div>
  );
};

export default MainBody;
