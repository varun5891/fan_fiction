import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/SignUp/SignUp';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    username: null,
    email: null,
    id: null,
    accessToken: null
  });

  const isUserAuthenticated = (data) => {
    if (data) setUserDetails(data.user);
    setIsAuthenticated(true);
  }

  const handleLogin = e => {
    e.preventDefault();
    setIsAuthenticated(true);
  }

  const handleLogout = e => {
    e.preventDefault();
    setIsAuthenticated(false);
  }

  return (
    <div className="wrapper">
      {isAuthenticated ? <Header userDetails={userDetails}/> : null}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" handleLogin={handleLogin}>
            <Login
              isUserAuthenticated={isUserAuthenticated}
            />
          </Route>
          {/* <ProtectedRoute exact path="/dashboard" handleLogout={handleLogout} isAuthenticated={isAuthenticated} component={Dashboard} /> */}
          <Route exact path="/dashboard">
            <Dashboard handleLogout={handleLogout} isAuthenticated={isAuthenticated} isUserAuthenticated={isUserAuthenticated} loggedInUser={userDetails} />
          </Route>
          <Route exact path="/signup" handleLogout={handleLogout} isAuthenticated={isAuthenticated} component={Signup} />
        </Switch>
      </BrowserRouter>
      {/* {isAuthenticated ? <Footer /> : null} */}
    </div>
  );
}

export default App;
