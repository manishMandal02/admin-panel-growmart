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
import CreateUser from '../../Components/Users/CreateUser/CreateUser';
import EditProdct from '../../Components/Products/UpdateProduct/EditProduct';
import CreateProdct from '../../Components/Products/CreateProduct/CreateProduct';
import SettingsComponent from '../../Components/SettingsComponent/SettingsComponent';

const Layout = () => {
  return (
    <Router>
      <div className={classes.Layout} id='layout'>
        <Sidebar />
        <div className={classes.Container}>
          <Header />
          <main className={classes.Main}>
            <Route path='/users/create' component={CreateUser} exact />
            <Route path='/products/edit/:id' component={EditProdct} exact />
            <Route path='/products/create/' component={CreateProdct} exact />
            <Route path='/users/page/:pageNumber?' component={Users} exacts />
            <Route path='/users/' component={Users} exact />
            <Route
              path='/products/page/:pageNumber?'
              component={Products}
              exact
            />
            <Route path='/products/' component={Products} exact />
            <Route path='/settings/' component={SettingsComponent} exact />
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
