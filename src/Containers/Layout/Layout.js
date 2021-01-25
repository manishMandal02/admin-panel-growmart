import React from 'react';

import classes from './Layout.module.scss';

import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import MainBody from '../MainBody/MainBody';

const Layout = () => {
  return (
    <div className={classes.Layout}>
      <Sidebar />
      <div className={classes.Container}>
        <Header />
        <MainBody />
      </div>
    </div>
  );
};

export default Layout;
