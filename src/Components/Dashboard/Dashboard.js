import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CameraAlt,
  AccountCircle,
  LocalMall,
  AccountBalanceWallet,
} from '@material-ui/icons';

import classes from './Dashboard.module.scss';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const history = useHistory();
  return (
    <div className={classes.Dashboard}>
      <Helmet>
        <title>Dashboard | GrowMart Admin</title>
      </Helmet>
      <div className={classes.Bar}></div>
      <div className={classes.Wrapper}>
        <span onClick={() => history.push('/products')}>
          <CameraAlt />
          <span>
            <p>PRODUCTS</p>
            <p>254</p>
          </span>
        </span>
        <span onClick={() => history.push('/users')}>
          <AccountCircle />
          <span>
            <p>USERS</p>
            <p>3565</p>
          </span>
        </span>
        <span onClick={() => history.push('/orders')}>
          <LocalMall />
          <span>
            <p>ORDERS</p>
            <p>862</p>
          </span>
        </span>
        <span onClick={() => history.push('/sales')}>
          <AccountBalanceWallet />
          <span>
            <p>SALES</p>
            <p>$6468</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
