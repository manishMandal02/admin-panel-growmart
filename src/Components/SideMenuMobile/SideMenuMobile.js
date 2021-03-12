import {
  AppsOutlined,
  CameraAlt,
  ExitToApp,
  LocalMall,
  PeopleAlt,
  Settings,
  Storefront,
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from './SideMenuMobile.module.scss';
import { adminLogout } from '../../Store/Actions/UserActions';

const SideMenuMobile = ({ open, close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //handel close
  const closeMenuHandler = () => {
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('sideMenuBackdrop');
    if (sideMenu && backdrop) {
      sideMenu.style.width = '0';
      backdrop.style.display = 'none';
      document.body.style.overflowY = 'scroll';
    }
  };

  if (open) {
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('sideMenuBackdrop');
    if (sideMenu && backdrop) {
      sideMenu.style.width = '75%';
      backdrop.style.display = 'block';
      document.body.style.overflowY = 'hidden';
    }
  }
  if (!open) {
    closeMenuHandler();
  }
  //
  const closeMenu = () => {
    close();
  };
  //userInfo login status

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        id='sideMenuBackdrop'
        className={classes.Backdrop}
      ></div>
      <div id='sideMenu' className={classes.Container}>
        <div
          className={classes.User}
          onClick={() => {
            history.push('/dashboard');
            closeMenu();
          }}
        >
          <Storefront />
          GrowMart
        </div>

        <ul className={classes.Menu}>
          <p>GENERAL</p>
          <Link onClick={closeMenu} to='/dashboard'>
            <AppsOutlined />
            Dashboard
          </Link>
        </ul>
        <ul className={classes.Menu}>
          <p>USERS</p>
          <Link onClick={closeMenu} to='/users'>
            <PeopleAlt />
            Users
          </Link>
        </ul>
        <ul className={classes.Menu}>
          <p>PRODUCTS</p>
          <Link onClick={closeMenu} to='/products'>
            <CameraAlt />
            Products
          </Link>
        </ul>
        <ul className={classes.Menu}>
          <p>ORDERS</p>
          <Link onClick={closeMenu} to='/orders'>
            <LocalMall />
            Orders
          </Link>
        </ul>
        <ul className={classes.Menu}>
          <p>SETTINGS</p>
          <Link onClick={closeMenu} to='/settings'>
            <Settings />
            Settings
          </Link>
        </ul>
        <ul>
          <Link
            onClick={() => {
              dispatch(adminLogout());
              closeMenu();
              history.push('/');
            }}
            to='#'
          >
            <ExitToApp /> Logout
          </Link>
        </ul>
        <div className={classes.Footer}>Manish Mandal © 2021</div>
      </div>
    </>
  );
};

export default SideMenuMobile;
