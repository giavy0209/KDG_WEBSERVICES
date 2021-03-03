import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { message } from 'antd';
import { validateForm } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { asyncLogin } from '../../store/authAction';
import ChooseLanguage from '../../components/ChooseLanguages';

import { useLang } from '../../context/LanguageLayer';

export default function Login() {
  const [{ language, LoginPageLanguage }] = useLang();
  const { email } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [ValidForm, setValidForm] = useState({ email: false, password: true });
  const [Eye, setEye] = useState({ password: false });

  useEffect(() => {
    document.title = LoginPageLanguage[language].title;
  }, [LoginPageLanguage, language]);

  useEffect(() => {
    if (email) setValidForm(valid => ({ ...valid, email: true }));
  }, [email]);

  const handleLogin = useCallback(
    async e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const submitData = {};
      for (var pair of data.entries()) {
        submitData[pair[0]] = pair[1];
      }
      const res = await dispatch(asyncLogin(submitData));
      if (res.status === 1) history.push('/services');
      if (res.status === 101) message.error(LoginPageLanguage[language].error_101);
      if (res.status === 102) message.error(LoginPageLanguage[language].error_102);
    },
    [dispatch, history, LoginPageLanguage, language]
  );

  return (
    <>
      <div className='form-block'>
        <div className='left'>
          <img alt='' src='/images/img-login2.png'></img>
        </div>
        <div className='right'>
          <form onSubmit={handleLogin}>
            <ChooseLanguage />
            <h3>{LoginPageLanguage[language].title}</h3>
            <span>
              {LoginPageLanguage[language].desc_1}
              <span onClick={() => history.push('/reg')}>{LoginPageLanguage[language].desc_2}</span>
            </span>
            <div className='form-group'>
              <p>Email</p>
              <input
                onChange={e => {
                  e.target.value = e.target.value.toLowerCase();
                  if (!e.target.value.match(validateForm.email)) {
                    e.target.nextElementSibling.classList.add('show');
                    e.target.nextElementSibling.innerText = LoginPageLanguage[language].error_email;
                    setValidForm({ ...ValidForm, email: false });
                  } else {
                    e.target.nextElementSibling.classList.remove('show');
                    e.target.nextElementSibling.innerText = '';
                    setValidForm({ ...ValidForm, email: true });
                  }
                }}
                defaultValue={email}
                name='email'
                id='email'
              />
              <span className='validate-error'></span>
            </div>
            <div className='form-group'>
              <p>{LoginPageLanguage[language].password}</p>
              <div className='input-password'>
                <FontAwesomeIcon
                  onClick={e => setEye({ ...Eye, password: !Eye.password })}
                  size='1x'
                  color='#000'
                  className='eye'
                  icon={Eye.password ? faEye : faEyeSlash}
                />
                <input
                  onChange={e => {
                    if (!e.target.value.match(validateForm.password)) {
                      e.target.parentElement.nextElementSibling.classList.add('show');
                      e.target.parentElement.nextElementSibling.innerText = LoginPageLanguage[language].error_password;
                      setValidForm({ ...ValidForm, password: false });
                    } else {
                      e.target.parentElement.nextElementSibling.classList.remove('show');
                      e.target.parentElement.nextElementSibling.innerText = '';
                      setValidForm({ ...ValidForm, password: true });
                    }
                  }}
                  type={Eye.password ? '' : 'password'}
                  placeholder={LoginPageLanguage[language].error_password}
                  name='password'
                />
              </div>
              <span className='validate-error'></span>
            </div>
            <div className='form-group half' style={{ position: 'relative' }}>
              <button className={`button ${ValidForm.email && ValidForm.password ? 'valid' : 'not-valid'}`}>
                {LoginPageLanguage[language].title}
              </button>
              <span></span>
            </div>
            <div>
              <span
                style={{ fontSize: 14, cursor: 'pointer', color: '#fac800', paddingLeft: 8 }}
                onClick={() => history.push('/forgot-password')}
              >
                {LoginPageLanguage[language].forgot_password}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
