import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actChangeBalances, actChangeUser } from './store/authAction'
import { asyncInitAuth } from './store/authAction';
import {  useLocation } from 'react-router-dom';

import Home from './Pages/Home'
import Wallet from './Pages/Wallet'
import Staking from './Pages/Staking'
import StakingHistory from './Pages/StakingHistory'
import Account from './Pages/Account'

import Menu from './Components/Menu'
import socket from './socket'
import { useEffect, useMemo } from "react";
import Loading from './Components/Loading'
import { storage } from "./helpers";
import 'antd/dist/antd.css'
function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading)
  const location = useLocation()
  const refresh = new URLSearchParams(location.search).get('refresh');
  useMemo(() => {
    if (refresh) {
      storage.setRefresh(refresh)
      dispatch(asyncInitAuth())
    } else {
      const old_refresh = storage.getRefresh()
      if (!old_refresh) {
        window.open('http://localhost:3000', '_self')
      } else {
        dispatch(asyncInitAuth())
      }
    }
  }, [refresh,dispatch])
  useEffect(() => {
    const listenBalance = (res) => {
      dispatch(actChangeBalances(res.balances))
    }
    const listenUser = (res) => {
      dispatch(actChangeUser(res.data))
    }
    socket.on('balances', listenBalance)
    socket.on('user', listenUser)
  }, [dispatch]);
  return (
    <>
      {isLoading && <Loading />}
      <Menu />
      <Switch>
        <Route exact={true} path={`/`}>
          <Home />
        </Route>
        <Route exact={true} path={`/wallet`}>
          <Wallet />
        </Route>
        <Route exact={true} path={`/staking`}>
          <Staking />
        </Route>
        <Route exact={true} path={`/staking-history`}>
          <StakingHistory />
        </Route>
        <Route exact={true} path={`/Account`}>
          <Account />
        </Route>
      </Switch>
    </>
  );
}

export default App;
