import { React, useEffect } from 'react';

import {
  LocalMallOutlined,
  AppsOutlined,
  CameraAltOutlined,
  StorefrontOutlined,
  AccountCircleOutlined,
} from '@material-ui/icons';

import classes from './Sidebar.module.scss';

const Sidebar = (props) => {
  useEffect(() => {
    const dashboardEl = document.getElementById('dashboard');
    if (window.location.pathname === '/') {
      dashboardEl.focus();
    }
  }, []);
  return (
    <div className={classes.Sidebar}>
      <div className={classes.Logo}>
        <StorefrontOutlined />
        <span>GrowMart</span>
      </div>
      <div className={classes.MenuContainer}>
        <ul>
          <p>GENERAL</p>
          <a href='/#' id='dashboard'>
            <span>
              <AppsOutlined />
            </span>
            Dashboard
          </a>
        </ul>

        <ul>
          <p>Products</p>
          <a href='/#'>
            <span>
              <LocalMallOutlined />
            </span>
            Orders
          </a>
          <a href='/#'>
            <span>
              <CameraAltOutlined />
            </span>
            Products
          </a>
        </ul>

        <ul>
          <p>Users</p>
          <a href='/#'>
            <span>
              <AccountCircleOutlined />
            </span>
            Users
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
