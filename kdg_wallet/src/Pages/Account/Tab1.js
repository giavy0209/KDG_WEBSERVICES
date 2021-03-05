import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { validateForm } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Components/Modal';
import { actChangeLoading } from '../../store/action';
import callAPI from '../../axios';

import { useLang } from '../../context/LanguageLayer';

export default function Tab1() {
  const [{ language, AccountPageLanguage }] = useLang();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [ValidForm, setValidForm] = useState({ newpass: false, renewpass: false, oldpass: true });
  const [Token, setToken] = useState('');
  const [Password, setPassword] = useState('');
  const [Visible, setVisible] = useState(false);
  const [VisibleDisable, setVisibleDisable] = useState(false);
  const [Eye, setEye] = useState({ oldpass: false, newpass: false, renewpass: false });

  const handleCopy = useCallback(
    e => {
      var input = document.createElement('input');
      document.querySelector('body').append(input);
      input.value = e.target.innerText;
      input.select();
      document.execCommand('copy');
      input.remove();
      message.success(AccountPageLanguage[language].copied);
    },
    [AccountPageLanguage, language]
  );

  const handleSubmitForm = useCallback(
    async e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const submitData = {};
      for (var pair of data.entries()) {
        submitData[pair[0]] = pair[1];
      }
      const res = await callAPI.post(`/change_password`, {
        old_password: submitData.oldpass,
        new_password: submitData.newpass,
      });
      if (res.status === 1) {
        message.success(AccountPageLanguage[language].change_password_success);
      }
      if (res.status === 100) {
        message.error(AccountPageLanguage[language].change_password_error_100);
      }
    },
    [AccountPageLanguage, language]
  );

  const handleAdd2FA = useCallback(async () => {
    dispatch(actChangeLoading(true));
    var res = await callAPI.post('/verify_2fa', { token: Token });

    if (res.status === 1) {
      message.success(AccountPageLanguage[language].verify_2fa_success);
      dispatch(actChangeLoading(false));
      setVisible(false);
    }
    if (res.status === 100) {
      message.error(AccountPageLanguage[language].verify_2fa_error_100);
      dispatch(actChangeLoading(false));
    }
  }, [Token, dispatch, AccountPageLanguage, language]);

  const handleDisable2FA = useCallback(async () => {
    dispatch(actChangeLoading(true));
    var res = await callAPI.post('/disable_2fa', { token: Token, password: Password });
    if (res.status === 1) {
      message.success(AccountPageLanguage[language].disable_2fa_success);
      setVisibleDisable(false);
    }
    if (res.status === 100) message.error(AccountPageLanguage[language].disable_2fa_error_100);
    if (res.status === 101) message.error(AccountPageLanguage[language].disable_2fa_error_101);
    dispatch(actChangeLoading(false));
  }, [Token, Password, AccountPageLanguage, language, dispatch]);

  return (
    <>
      <Modal isVisible={Visible} title={AccountPageLanguage[language].setting_2FA} onCancel={() => setVisible(false)}>
        <div className='model-deposit'>
          <span> {AccountPageLanguage[language].scan_here} </span>
          <div className='qr-code'>
            <span></span>
            <img alt='qr' src={user.QR_SECRET} />
          </div>
          <span>{AccountPageLanguage[language].copy_code_here}</span>
          <div onClick={handleCopy} className='deposit-address'>
            <span>{user.two_face_secret}</span>
            <FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={faCopy} />
          </div>
          <div className='verify'>
            <input
              value={Token}
              onChange={e => setToken(e.target.value)}
              style={{ padding: 10, width: 360 }}
              onKeyPress={e => {
                if (e.key === 'Enter') handleAdd2FA();
              }}
              placeholder={AccountPageLanguage[language].code_2FA}
            />
            <button onClick={handleAdd2FA} className='button-gradiant'>
              {AccountPageLanguage[language].confirm_2FA}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isVisible={VisibleDisable}
        title={AccountPageLanguage[language].disable_2FA}
        onCancel={() => setVisibleDisable(false)}
      >
        <div className='model-deposit'>
          <div style={{ margin: 0 }} className='verify'>
            <input
              value={Token}
              onChange={e => setToken(e.target.value)}
              style={{ padding: 10, width: '100%' }}
              onKeyPress={e => {
                if (e.key === 'Enter') handleDisable2FA();
              }}
              placeholder={AccountPageLanguage[language].code_2FA}
            />
            <input
              value={Password}
              onChange={e => setPassword(e.target.value)}
              style={{ padding: 10, width: '100%', marginTop: 10 }}
              onKeyPress={e => {
                if (e.key === 'Enter') handleDisable2FA();
              }}
              placeholder={AccountPageLanguage[language].enter_password}
            />
            <button style={{ marginTop: 10 }} onClick={handleDisable2FA} className='button-gradiant'>
              {AccountPageLanguage[language].confirm_disable_2FA}
            </button>
          </div>
        </div>
      </Modal>
      <>
        <h3>{AccountPageLanguage[language].setting_2FA}</h3>
        <button onClick={() => (user.is2FA ? setVisibleDisable(true) : setVisible(true))} className='button-gradiant'>
          {user.is2FA ? AccountPageLanguage[language].disable_2FA : AccountPageLanguage[language].setting_2FA}
        </button>
      </>
      <h3>{AccountPageLanguage[language].change_password}</h3>
      <form onSubmit={handleSubmitForm}>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].old_password}</span>
          <div className='input-password'>
            <FontAwesomeIcon
              onClick={() => setEye({ ...Eye, oldpass: !Eye.oldpass })}
              size='1x'
              color='#fff'
              className='eye'
              icon={Eye.oldpass ? faEye : faEyeSlash}
            />
            <input
              type={Eye.oldpass ? '' : 'password'}
              name='oldpass'
              placeholder={AccountPageLanguage[language].enter_old_password}
            />
            <span className='validate-error'></span>
          </div>
        </div>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].new_password}</span>
          <div className='input-password'>
            <FontAwesomeIcon
              onClick={() => setEye({ ...Eye, newpass: !Eye.newpass })}
              size='1x'
              color='#fff'
              className='eye'
              icon={Eye.newpass ? faEye : faEyeSlash}
            />
            <input
              onChange={e => {
                if (!e.target.value.match(validateForm.password)) {
                  e.target.nextElementSibling.classList.add('show');
                  e.target.nextElementSibling.innerText = AccountPageLanguage[language].error_password;
                  setValidForm({ ...ValidForm, newpass: false });
                } else {
                  e.target.nextElementSibling.classList.remove('show');
                  e.target.nextElementSibling.innerText = '';
                  setValidForm({ ...ValidForm, newpass: true });
                }
              }}
              type={Eye.newpass ? '' : 'password'}
              name='newpass'
              placeholder={AccountPageLanguage[language].enter_new_password}
            />
            <span className='validate-error'></span>
          </div>
        </div>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].confirm_new_password}</span>
          <div className='input-password'>
            <FontAwesomeIcon
              onClick={() => setEye({ ...Eye, renewpass: !Eye.renewpass })}
              size='1x'
              color='#fff'
              className='eye'
              icon={Eye.renewpass ? faEye : faEyeSlash}
            />
            <input
              onChange={e => {
                if (!e.target.value.match(validateForm.password)) {
                  e.target.nextElementSibling.classList.add('show');
                  e.target.nextElementSibling.innerText = AccountPageLanguage[language].error_password;
                  setValidForm({ ...ValidForm, renewpass: false });
                } else if (e.target.value !== document.querySelector('input[name="newpass"]').value) {
                  e.target.nextElementSibling.classList.add('show');
                  e.target.nextElementSibling.innerText = AccountPageLanguage[language].password_not_match;
                  setValidForm({ ...ValidForm, renewpass: false });
                } else {
                  e.target.nextElementSibling.classList.remove('show');
                  e.target.nextElementSibling.innerText = '';
                  setValidForm({ ...ValidForm, renewpass: true });
                }
              }}
              type={Eye.renewpass ? '' : 'password'}
              name='renewpass'
              placeholder={AccountPageLanguage[language].confirm_new_password}
            />
            <span className='validate-error'></span>
          </div>
        </div>
        <div className='input-group'>
          <button
            style={
              ValidForm.oldpass && ValidForm.newpass && ValidForm.renewpass
                ? {
                    opacity: 1,
                    pointerEvents: 'all',
                  }
                : {
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }
            }
            type='submit'
          >
            {AccountPageLanguage[language].update}
          </button>
        </div>
      </form>
    </>
  );
}
