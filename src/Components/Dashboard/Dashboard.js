import React from 'react';

import {
  LocalMallOutlined,
  CameraAltOutlined,
  AccountCircleOutlined,
  AccountBalanceWalletOutlined,
} from '@material-ui/icons';

import classes from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={classes.Dashboard}>
      <div className={classes.Wrapper}>
        <span>
          <CameraAltOutlined />
          <span>
            <p>Products</p>
            <p>254</p>
          </span>
        </span>
        <span>
          <AccountCircleOutlined />
          <span>
            <p>Users</p>
            <p>3565</p>
          </span>
        </span>
        <span>
          <LocalMallOutlined />
          <span>
            <p>Orders</p>
            <p>862</p>
          </span>
        </span>
        <span>
          <AccountBalanceWalletOutlined />
          <span>
            <p>Sales</p>
            <p>$6468</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
