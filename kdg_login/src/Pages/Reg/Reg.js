import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { message } from 'antd';
import { validateForm } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { actChangeLoading } from '../../store/action';
import callAPI from '../../axios';
import { useLang } from '../../context/LanguageLayer';

import ChooseLanguage from '../../components/ChooseLanguages';

export default function App() {
  const { ref } = useParams();
  const [CountDownSendMail, setCountDownSendMail] = useState(null);
  const [CountDownSendMailTimeOut, setCountDownSendMailTimeOut] = useState(null);
  const [ValidForm, setValidForm] = useState({ email: false, password: false, repassword: false, email_code: false });
  const [Eye, setEye] = useState({ password: false, repassword: false });
  const history = useHistory();
  const dispatch = useDispatch();
  const [{ language, RegPageLanguage }] = useLang();

  useEffect(() => {
    document.title = RegPageLanguage[language].title;
  }, [RegPageLanguage, language]);

  const loginURL = useSelector(state => {
    return state.settings && state.settings.login_button.url;
  });

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

  const [check, setcheck] = useState(false);

  async function getCode(email) {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return message.error(RegPageLanguage[language].not_valid_email);
    }
    dispatch(actChangeLoading(true));
    try {
      const res = await callAPI.post('/create_code?type=1', { email });
      if (res.status === 1) {
        message.success(RegPageLanguage[language].sent_email);
      }
      if (res.status === 101) {
        message.error(RegPageLanguage[language].existed_email);
      }
      if (res.status === 102) {
        message.error(RegPageLanguage[language].wait_2_minutes);
      }
    } catch (error) {}
    dispatch(actChangeLoading(false));
  }

  const handleReg = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const submitData = {};
    for (var pair of data.entries()) {
      submitData[pair[0]] = pair[1];
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(submitData.email)) {
      return message.error(RegPageLanguage[language].not_valid_email);
    }
    dispatch(actChangeLoading(true));
    const res = await callAPI.post('/user', submitData);
    dispatch(actChangeLoading(false));
    if (res.status === 1) {
      message.success(RegPageLanguage[language].register_success);
      setTimeout(() => {
        history.push(`${loginURL}/${submitData.email}`);
      }, 1000);
    }
    if (res.status === 101) {
      message.error(RegPageLanguage[language].existed_email);
    }
    if (res.status === 102) {
      message.error(RegPageLanguage[language].wrong_code);
    }
  };

  return (
    <>
      <div className='form-block'>
        <div className='left'>
          <img alt='' src='/images/img-login.png'></img>
        </div>
        <div className='right'>
          <form onSubmit={handleReg}>
            <ChooseLanguage />
            <h3>{RegPageLanguage[language].title}</h3>
            <span>
              {RegPageLanguage[language].desc1}
              <span onClick={() => history.push('/login')}>{RegPageLanguage[language].desc2}</span>
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
                    e.target.nextElementSibling.innerText = RegPageLanguage[language].not_valid_email;
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
            <div className='form-group half va-t'>
              <p>{RegPageLanguage[language].password}</p>
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
                      e.target.nextElementSibling.innerText = RegPageLanguage[language].error_password;
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
            <div className='form-group half va-t'>
              <p>{RegPageLanguage[language].confirm_password}</p>
              <div className='input-password'>
                <FontAwesomeIcon
                  onClick={() => setEye({ ...Eye, repassword: !Eye.repassword })}
                  size='1x'
                  color='#000'
                  className='eye'
                  icon={Eye.repassword ? faEye : faEyeSlash}
                />
                <input
                  type={Eye.repassword ? '' : 'password'}
                  onChange={e => {
                    if (!e.target.value.match(validateForm.password)) {
                      e.target.nextElementSibling.classList.add('show');
                      e.target.nextElementSibling.innerText = RegPageLanguage[language].error_password;
                      setValidForm({ ...ValidForm, repassword: false });
                    } else if (e.target.value !== document.querySelector('input[name="password"]').value) {
                      e.target.nextElementSibling.classList.add('show');
                      e.target.nextElementSibling.innerText = RegPageLanguage[language].password_not_match;
                      setValidForm({ ...ValidForm, repassword: false });
                    } else {
                      e.target.nextElementSibling.classList.remove('show');
                      e.target.nextElementSibling.innerText = '';
                      setValidForm({ ...ValidForm, repassword: true });
                    }
                  }}
                  name='repassword'
                />
                <span className='validate-error'></span>
              </div>
            </div>
            <div className='form-group half'>
              <p>{RegPageLanguage[language].register_code}</p>
              <input
                onChange={e => {
                  if (!Number(e.target.value) || e.target.value.length !== 6) {
                    e.target.nextElementSibling.classList.add('show');
                    e.target.nextElementSibling.innerText = RegPageLanguage[language].not_valid_register_code;
                    setValidForm({ ...ValidForm, email_code: false });
                  } else {
                    e.target.nextElementSibling.classList.remove('show');
                    e.target.nextElementSibling.innerText = '';
                    setValidForm({ ...ValidForm, email_code: true });
                  }
                }}
                name='email_code'
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
                {RegPageLanguage[language].get_code}
                <span className='count-down'>{CountDownSendMail !== null && CountDownSendMail}</span>
              </span>
            </div>
            <div className='form-group'>
              <p>{RegPageLanguage[language].referral_code}</p>
              <input defaultValue={ref ? ref : ''} name='parent_ref_code' />
            </div>
            <div className='form-group checkbox'>
              <input
                onChange={e => setcheck(e.target.checked)}
                id='confirm'
                type='checkbox'
                className='checkbox'
                name='confirm'
              />
              <label htmlFor='confirm' className='checkbox-label'>
                <span className='checkbox-box'></span>
                <span className='agreement' dangerouslySetInnerHTML={{ __html: RegPageLanguage[language].agreement }}></span>
              </label>
            </div>
            <div className='form-group half'>
              <button
                style={
                  ValidForm.email && ValidForm.password && ValidForm.email_code && ValidForm.repassword && check
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0.6, pointerEvents: 'none' }
                }
                className='button'
              >
                {RegPageLanguage[language].title}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
