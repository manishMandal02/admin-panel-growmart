import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExpandMore,
  ExitToApp,
  AccountBox,
  Settings,
  CameraAlt,
  LocalMall,
  AddPhotoAlternate,
  PersonAdd,
  Menu,
  Person,
} from '@material-ui/icons/';

import { useWindowSize } from '../../Hooks/useWindowSize/useWindowSize';
import classes from './Header.module.scss';
import Backdrop from '../UI/Backdrop';
import { adminLogout } from '../../Store/Actions/UserActions';
import SideMenuMobile from '../SideMenuMobile/SideMenuMobile';

//######
const Header = () => {
  //state
  const [menuOpen, setMenuOpen] = useState(false);

  const [width] = useWindowSize();
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
      {/* <div className={classes.Wrapper}>
        <Badge badgeContent={0} color='primary' overlap='circle'>
          <NotificationsNone />
        </Badge>
        <Badge badgeContent={0} color='primary' overlap='circle'>
          <MailOutline />
        </Badge>
      </div> */}
      {width <= 900 && (
        <div className={classes.LeftContainer}>
          <SideMenuMobile open={menuOpen} close={() => setMenuOpen(false)} />
          <Menu
            onClick={() => {
              console.log('clicked');
              setMenuOpen(true);
            }}
          />
        </div>
      )}
      <div className={classes.Profile}>
        {!adminInfo ? null : (
          <div
            className={classes.LoggedUser}
            onClick={() => {
              width > 900 ? handleMenuOpen() : history.push('/settings');
            }}
          >
            <Person />
            <p>
              {adminInfo.name.split(' ')[0]}{' '}
              {width > 900 && (
                <span>
                  <ExpandMore />
                </span>
              )}
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
                <Link to='/users/create'>
                  <PersonAdd />
                  Add User
                </Link>
                <Link to='/products'>
                  <CameraAlt />
                  Products
                </Link>
                <Link to='/products/create'>
                  <AddPhotoAlternate />
                  Add Product
                </Link>
                <Link to='/orders'>
                  <LocalMall />
                  Orders
                </Link>
                <Link to='/settings'>
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
