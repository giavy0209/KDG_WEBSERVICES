import React, { useEffect, useMemo } from 'react';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { storage } from './helpers';
import { Home, Live, Login, Profile, Setup, Upload, Watch } from './pages';
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

        <Route path='/home' component={Home} exact />

        <Route path='/login' component={Login} exact />

        <Route path='/profile' component={Profile} exact />

        <Route path='/upload' component={Upload} exact />

        <Route path='/setup' component={Setup} exact />

        <Route path='/watch' component={Watch} exact />

        <Route path='/live' component={Live} exact />
      </Switch>
    </>
  );
};

export default App;
