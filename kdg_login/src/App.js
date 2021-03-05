import React, { useCallback, useMemo } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loading from './components/Loading';
import Login from './Pages/Login';
import Reg from './Pages/Reg';
import Forgot from './Pages/Forgot';
import Services from './Pages/Services';

import 'antd/dist/antd.css';
import './assets/scss/login-reg.scss';
import { asyncInitAuth } from './store/authAction';
import { storage } from './helpers';

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const isLoading = useSelector(state => state.loading);

  const initLogin = useCallback(async () => {
    if(location.pathname.includes('logout')){
      storage.clearToken()
      storage.clearRefresh()
      history.push('/');
    }
    const { status } = await dispatch(asyncInitAuth());

    if (status === 1) history.push('/services');
  }, [dispatch, history]);

  useMemo(() => {
    initLogin();
  }, [initLogin]);

  return (
    <>
      {isLoading && <Loading />}
      <Route exact={true} path={`/`}>
        <Login />
      </Route>
      <Route exact={true} path={`/login/:email?`}>
        <Login />
      </Route>
      <Route exact={true} path={`/login/:email?`}>
        <Login />
      </Route>
      <Route exact={true} path={`/reg/:ref?`}>
        <Reg />
      </Route>
      <Route exact={true} path='/forgot-password'>
        <Forgot />
      </Route>
      <Route exact={true} path='/services'>
        <Services />
      </Route>
    </>
  );
}
