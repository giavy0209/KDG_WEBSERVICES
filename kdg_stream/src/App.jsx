import React, { useEffect, useMemo } from 'react';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { storage } from './helpers';
import { Main } from './layout';
import { Home, Live, Login, Profile, Upload, Video, Setup } from './pages';
import socket from './socket';
import { actChangeBalances, actChangeUser, asyncInitAuth } from './store/authAction';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const refresh = new URLSearchParams(location.search).get('refresh');

  useMemo(() => {
    if (refresh) {
      storage.setRefresh(refresh);
      dispatch(asyncInitAuth());
    } else {
      storage.getRefresh();
      dispatch(asyncInitAuth());
    }
  }, [refresh, dispatch]);

  useEffect(() => {
    const listenBalance = res => {
      dispatch(actChangeBalances(res.balances));
    };
    const listenUser = res => {
      dispatch(actChangeUser(res.data));
    };
    socket.on('balances', listenBalance);
    socket.on('user', listenUser);
  }, [dispatch]);

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
        <Route path='/setup' exact>
          <Setup />
        </Route>
      </Switch>
    </>
  );
};

export default App;
