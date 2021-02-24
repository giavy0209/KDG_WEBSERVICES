import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actChangeLoading } from '../../store/action';
import { message } from 'antd';
import { validateForm } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import callapi from '../../axios';
import { useLang } from '../../context/LanguageLayer';

import ChooseLanguage from '../../components/ChooseLanguages';

export default function Forgot() {
  const [CountDownSendMail, setCountDownSendMail] = useState(null);
  const [CountDownSendMailTimeOut, setCountDownSendMailTimeOut] = useState(null);
  const [ValidForm, setValidForm] = useState({
    email: false,
    password: false,
    new_password: false,
    forgot_password_code: false,
  });
  const [Eye, setEye] = useState({ password: false, new_password: false });
  const history = useHistory();
  const dispatch = useDispatch();
  const [{ language, ForgotPageLanguage }] = useLang();

  const loginURL = useSelector(state => {
    return state.settings && state.settings.login_button.url;
  });

  useEffect(() => {
    document.title = ForgotPageLanguage[language].title;
  }, [ForgotPageLanguage, language]);

  useEffect(() => {
    if (CountDownSendMail !== null) {
      if (CountDownSendMail <= 0) {
        setCountDownSendMail(null);
      }
      if (CountDownSendMail > 0) {
        var timeout = setTimeout(() => {
          setCountDownSendMail(CountDownSendMail - 1);
        }, 1000);
        setCountDownSendMailTimeOut(timeout);
      }
    }
  }, [CountDownSendMail]);

  async function getCode(email) {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return message.error(ForgotPageLanguage[language].not_valid_email);
    }
    dispatch(actChangeLoading(true));
    try {
      const res = await callapi.post('/create_code?type=2', { email });
      if (res.status === 1) {
        setCountDownSendMail(120);
        message.success(ForgotPageLanguage[language].sent_email);
      }
      if (res.status === 101) {
        message.error(ForgotPageLanguage[language].existed_email);
      }
      if (res.status === 102) {
        message.error(ForgotPageLanguage[language].wait_2_minutes);
      }
    } catch (error) {}
    dispatch(actChangeLoading(false));
  }

  const handleResetPass = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const submitData = {};
    for (var pair of data.entries()) {
      submitData[pair[0]] = pair[1];
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(submitData.email)) {
      return message.error(ForgotPageLanguage[language].not_valid_email);
    }
    dispatch(actChangeLoading(true));
    const res = await callapi.post('/forgot_password', submitData);
    dispatch(actChangeLoading(false));
    if (res.status === 1) {
      message.success(ForgotPageLanguage[language].reset_password_success);
      setTimeout(() => {
        history.push(`${loginURL}/${submitData.email}`);
      }, 1000);
    }
    if (res.status === 101) {
      message.error(ForgotPageLanguage[language].not_existed_email);
    }
    if (res.status === 102) {
      message.error(ForgotPageLanguage[language].wrong_code);
    }
  };

  return (
    <>
      <div className='form-block'>
        <div className='left'>
          <img alt='' src='/images/img-login.png'></img>
        </div>
        <div className='right'>
          <form onSubmit={handleResetPass}>
            <ChooseLanguage />
            <h3>{ForgotPageLanguage[language].reset_password}</h3>
            <span>
              {ForgotPageLanguage[language].desc1}
              <span onClick={() => history.push('/login')}>{ForgotPageLanguage[language].desc2}</span>
            </span>
            <div className='form-group'>
              <p>Email</p>
              <input
                onChange={e => {
                  e.target.value = e.target.value.toLowerCase();
                  setCountDownSendMail(null);
                  clearTimeout(CountDownSendMailTimeOut);
                  if (!e.target.value.match(validateForm.email)) {
                    e.target.nextElementSibling.classList.add('show');
                    e.target.nextElementSibling.innerText = ForgotPageLanguage[language].not_valid_email;
                    setValidForm({ ...ValidForm, email: false });
                  } else {
                    e.target.nextElementSibling.classList.remove('show');
                    e.target.nextElementSibling.innerText = '';
                    setValidForm({ ...ValidForm, email: true });
                  }
                }}
                name='email'
                id='email'
              />
              <span className='validate-error'></span>
            </div>

            <div className='form-group half'>
              <p>{ForgotPageLanguage[language].code_reset_password}</p>
              <input
                onChange={e => {
                  if (!Number(e.target.value) || e.target.value.length !== 6) {
                    e.target.nextElementSibling.classList.add('show');
                    e.target.nextElementSibling.innerText = ForgotPageLanguage[language].not_valid_code_reset_password;
                    setValidForm({ ...ValidForm, forgot_password_code: false });
                  } else {
                    e.target.nextElementSibling.classList.remove('show');
                    e.target.nextElementSibling.innerText = '';
                    setValidForm({ ...ValidForm, forgot_password_code: true });
                  }
                }}
                name='forgot_password_code'
              />
              <span className='validate-error'></span>
            </div>
            <div className='form-group half va-b'>
              <span
                style={
                  CountDownSendMail === null && ValidForm.email
                    ? {
                        opacity: 1,
                        pointerEvents: 'all',
                      }
                    : {
                        opacity: 0.5,
                        pointerEvents: 'none',
                      }
                }
                onClick={() => getCode(document.getElementById('email').value)}
                className='button'
              >
                {ForgotPageLanguage[language].get_code}
                <span className='count-down'>{CountDownSendMail !== null && CountDownSendMail}</span>
              </span>
            </div>

            <div className='form-group va-t'>
              <p>{ForgotPageLanguage[language].new_password}</p>
              <div className='input-password'>
                <FontAwesomeIcon
                  onClick={e => setEye({ ...Eye, password: !Eye.password })}
                  size='1x'
                  color='#000'
                  className='eye'
                  icon={Eye.password ? faEye : faEyeSlash}
                />
                <input
                  type={Eye.password ? '' : 'password'}
                  onChange={e => {
                    if (!e.target.value.match(validateForm.password)) {
                      e.target.nextElementSibling.classList.add('show');
                      e.target.nextElementSibling.innerText = ForgotPageLanguage[language].error_password;
                      setValidForm({ ...ValidForm, password: false });
                    } else {
                      e.target.nextElementSibling.classList.remove('show');
                      e.target.nextElementSibling.innerText = '';
                      setValidForm({ ...ValidForm, password: true });
                    }
                  }}
                  name='password'
                />
                <span className='validate-error'></span>
              </div>
            </div>
            <div className='form-group va-t'>
              <p>{ForgotPageLanguage[language].confirm_password}</p>
              <div className='input-password'>
                <FontAwesomeIcon
                  onClick={() => setEye({ ...Eye, new_password: !Eye.new_password })}
                  size='1x'
                  color='#000'
                  className='eye'
                  icon={Eye.new_password ? faEye : faEyeSlash}
                />
                <input
                  type={Eye.new_password ? '' : 'password'}
                  onChange={e => {
                    if (!e.target.value.match(validateForm.password)) {
                      e.target.nextElementSibling.classList.add('show');
                      e.target.nextElementSibling.innerText = ForgotPageLanguage[language].error_password;
                      setValidForm({ ...ValidForm, new_password: false });
                    } else if (e.target.value !== document.querySelector('input[name="password"]').value) {
                      e.target.nextElementSibling.classList.add('show');
                      e.target.nextElementSibling.innerText = ForgotPageLanguage[language].password_not_match;
                      setValidForm({ ...ValidForm, new_password: false });
                    } else {
                      e.target.nextElementSibling.classList.remove('show');
                      e.target.nextElementSibling.innerText = '';
                      setValidForm({ ...ValidForm, new_password: true });
                    }
                  }}
                  name='new_password'
                />
                <span className='validate-error'></span>
              </div>
            </div>

            <div className='form-group half'>
              <button
                style={
                  ValidForm.email && ValidForm.password && ValidForm.forgot_password_code && ValidForm.new_password
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0.6, pointerEvents: 'none' }
                }
                className='button'
              >
                {ForgotPageLanguage[language].reset_password}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
