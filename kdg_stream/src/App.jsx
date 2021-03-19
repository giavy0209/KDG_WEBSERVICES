import React from 'react';
import 'react-notifications/lib/notifications.css';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { Home, Live, Login, Profile, Setup, Upload } from './pages';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Footer />
      {location.pathname !== '/login' && <Header />}
      <Switch>
        <Redirect from='/' to='/home' exact />
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='/setup' exact>
          <Setup />
        </Route>
        <Route path='/upload' exact>
          <Upload />
        </Route>
        <Route path='/live' exact>
          <Live />
        </Route>
      </Switch>
    </>
  );
};

export default App;
