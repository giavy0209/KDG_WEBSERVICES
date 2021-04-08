import React, { useCallback, useEffect, useMemo } from 'react';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Footer, Header, ScrollButton } from './components';
import { storage } from './helpers';
import { Home, Live, Login, Profile, Setup, Upload, Watch } from './pages';
import socket from './socket';
import { actChangeUnreadNoti } from './store/action';
import {
  actChangeBalances,
  actChangeNoties,
  actChangeUser,
  asyncInitAuth,
} from './store/authAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import { useLanguageLayerValue } from './context/LanguageLayer';

const App = () => {
  const [{ language, header }] = useLanguageLayerValue();
  const location = useLocation();
  const history = useHistory();
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

  const handleType = useCallback(
    ({ type, data }) => {
      let text = header[language]['noti' + type];
      if (type === 101) text = text.replace('data1', data.name);
      if (type === 102) text = text.replace('data1', data.name).replace('data2', data.video_name);
      if (type === 103) text = text.replace('data1', data.video_name);
      if (type === 104) text = text.replace('data1', data.name).replace('data2', data.video_name);
      if (type === 105) text = text.replace('data1', data.name);
      return text;
    },
    [header, language]
  );

  const handleClickNoti = useCallback(
    ({ type, data }) => {
      if (type === 101) history.push(`/profile?uid=${data.user}`);
      if (type === 102 || type === 103 || type === 104) history.push(`/watch?v=${data.video}`);
      if (type === 105) history.push(`/live?s=${data.video}`);
    },
    [history]
  );

  useEffect(() => {
    const listenBalance = res => {
      dispatch(actChangeBalances(res.balances));
    };
    const listenUser = res => {
      dispatch(actChangeUser(res.data));
    };
    const listenNoti = res => {
      dispatch(actChangeUnreadNoti(res.unread));
      const noties = store.getState().noties || [];
      dispatch(actChangeNoties([res.data, ...noties]));
      toast(<div onClick={() => handleClickNoti(res.data)}>{handleType(res.data)}</div>);
    };

    socket.on('balances', listenBalance);
    socket.on('user', listenUser);
    socket.on('noti', listenNoti);
    return () => {
      socket.removeEventListener('balances', listenBalance);
      socket.removeEventListener('user', listenUser);
      socket.removeEventListener('noti', listenNoti);
    };
  }, [dispatch, handleType, handleClickNoti]);

  return (
    <>
      <ToastContainer />
      <ScrollButton />
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
