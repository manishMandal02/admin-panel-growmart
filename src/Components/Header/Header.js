import React from 'react';

import { Badge } from '@material-ui/core/';
import {
  NotificationsNone,
  MailOutline,
  KeyboardArrowDown,
} from '@material-ui/icons/';

import classes from './Header.module.scss';
import TreeLogo from '../../Assets/Images/logo-tree.png';

const Header = () => {
  return (
    <div className={classes.Header}>
      <div className={classes.Container}>
        <div className={classes.Wrapper}>
          <Badge badgeContent={4} color='primary' overlap='circle'>
            <NotificationsNone />
          </Badge>
          <Badge badgeContent={4} color='primary' overlap='circle'>
            <MailOutline />
          </Badge>
        </div>

        <div className={classes.Profile}>
          <img src={TreeLogo} alt={'Admin'} />
          <span>
            Admin <KeyboardArrowDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
