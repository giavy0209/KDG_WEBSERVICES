import React from 'react';
import 'react-notifications/lib/notifications.css';

import { Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';
import { Login, Home, Profile, Setup, Live } from './pages';

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
                <Route path='/live' exact>
                    <Live />
                </Route>
            </Switch>
        </>
    );
};

export default App;
