import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import classes from './Layout.module.scss';

import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Users from '../../Components/Users/Users';
import Products from '../../Components/Products/Products';
import Orders from '../../Components/Orders/Orders';
import Login from '../../Components/Auth/Login/Login';

const Layout = () => {
  return (
    <Router>
      <div className={classes.Layout} id='layout'>
        <Sidebar />
        <div className={classes.Container}>
          <Header />
          <main className={classes.Main}>
            <Route path='/users' component={Users} />
            <Route path='/products' component={Products} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/orders' component={Orders} />
            <Route path='/' component={Login} exact />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
