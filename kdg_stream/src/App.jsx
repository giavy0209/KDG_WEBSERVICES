import React, { useMemo } from 'react';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { storage } from './helpers';
import { Home, Live, Login, Profile, Setup, Upload, Video } from './pages';
import { asyncInitAuth } from './store/authAction';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const refresh = new URLSearchParams(location.search).get('refresh');

  useMemo(() => {
    if (refresh) {
      storage.setRefresh(refresh);
      dispatch(asyncInitAuth());
    } else {
      const old_refresh = storage.getRefresh();
      dispatch(asyncInitAuth());
    }
  }, [refresh, dispatch]);
  return (
    <>
      <Footer />
      <Header />
      <Switch>
        <Redirect from='/' to='/home' exact />
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='/watch' exact>
          <Video />
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
