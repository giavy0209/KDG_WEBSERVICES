import React, { useState, useEffect } from 'react';
import '../../assets/css/login.css';

import logo from '../../assets/images/login/logo.svg';
import { FormLogin, FormRegister, FormForgot } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser } from '../../store/action';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.user?._id);

    useEffect(() => {
        dispatch(actionGetUser());
        if (user_id) history.push('/home');
    }, [dispatch, user_id, history]);

    const [{ language, login }] = useLanguageLayerValue();
    const [currentForm, setCurrentForm] = useState('login');

    return (
        <div className='login'>
            <div className='login__logo'>
                <img src={logo} alt='' />
                <p>{login[language].desc}</p>
            </div>

            {currentForm === 'login' ? (
                <FormLogin setCurrentForm={setCurrentForm} />
            ) : currentForm === 'register' ? (
                <FormRegister setCurrentForm={setCurrentForm} />
            ) : (
                <FormForgot setCurrentForm={setCurrentForm} />
            )}
        </div>
    );
};

export default Login;
