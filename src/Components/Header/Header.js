import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@material-ui/core/';
import {
  NotificationsNone,
  MailOutline,
  AccountCircle,
  ExpandMore,
  ExitToApp,
  AccountBox,
  Settings,
  CameraAlt,
  LocalMall,
} from '@material-ui/icons/';

import classes from './Header.module.scss';
import Backdrop from '../UI/Backdrop';
import { adminLogout } from '../../Store/Actions/UserActions';

//######
const Header = () => {
  //state
  const [menuOpen, setMenuOpen] = useState(false);

  //initialize
  const dispatch = useDispatch();
  const history = useHistory();

  const { adminInfo } = useSelector((state) => state.user.admin);
  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
  }, [adminInfo, history]);

  //handles dropdown menu
  let userMenu;
  const handleMenuOpen = () => {
    userMenu = document.getElementById('user-menu');
    if (!menuOpen) {
      userMenu.style.display = 'block';
    } else {
      userMenu.style.display = 'none';
    }
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  return (
    <div className={classes.Header}>
      <div className={classes.Wrapper}>
        <Badge badgeContent={4} color='primary' overlap='circle'>
          <NotificationsNone />
        </Badge>
        <Badge badgeContent={4} color='primary' overlap='circle'>
          <MailOutline />
        </Badge>
      </div>

      <div className={classes.Profile}>
        {!adminInfo ? null : (
          <div className={classes.LoggedUser} onClick={(e) => handleMenuOpen()}>
            <AccountCircle />
            <p>
              {adminInfo.name.split(' ')[0]}{' '}
              <span>
                <ExpandMore />
              </span>
            </p>
            <Backdrop
              show={menuOpen}
              updateBackdropState={() => handleMenuOpen()}
            />
            <div className={classes.UserMenu} id='user-menu'>
              <ul>
                <Link to='/users'>
                  <AccountBox />
                  Users
                </Link>
                <Link to='/products'>
                  <CameraAlt />
                  Products
                </Link>
                <Link to='/orders'>
                  <LocalMall />
                  Orders
                </Link>
                <Link to='/my/account'>
                  <Settings /> Settings
                </Link>
                <Link to='#' onClick={() => dispatch(adminLogout())}>
                  <ExitToApp />
                  Logout
                </Link>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
