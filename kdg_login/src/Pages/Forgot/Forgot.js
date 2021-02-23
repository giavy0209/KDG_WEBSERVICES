import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actChangeLoading } from '../../store/action';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { checkLanguage, validateForm } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ChooseLanguage from '../../components/ChooseLanguages';
import callapi from '../../axios';

export default function Forgot({ ...rest }) {
    const [CountDownSendMail, setCountDownSendMail] = useState(null);
    const [CountDownSendMailTimeOut, setCountDownSendMailTimeOut] = useState(null);
    const [ValidForm, setValidForm] = useState({ email: false, password: false, new_password: false, forgot_password_code: false });
    const [Eye, setEye] = useState({ password: false, new_password: false });
    const history = useHistory();
    const dispatch = useDispatch();
    const language = useSelector(state => state.lang);

    const loginURL = useSelector(state => {
        return state.settings && state.settings.login_button.url;
    });

    useEffect(() => {
        document.title = checkLanguage({ vi: 'Quên mật khẩu', en: 'Forgot password' }, language);
    }, [language]);

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
            return message.error(
                checkLanguage(
                    {
                        vi: 'Email không đúng định dạng',
                        en: 'Invalid email',
                    },
                    language
                )
            );
        }
        dispatch(actChangeLoading(true));
        try {
            const res = await callapi.post('/create_code?type=2', { email });
            if (res.status === 1) {
                setCountDownSendMail(120);
                message.success(
                    checkLanguage(
                        {
                            vi: 'Đã gửi mã code vào mail của bạn',
                            en: 'Have sent code to your email',
                        },
                        language
                    )
                );
            }
            if (res.status === 101) {
                message.error(
                    checkLanguage(
                        {
                            vi: 'Email đã tồn tại',
                            en: 'Email existed',
                        },
                        language
                    )
                );
            }
            if (res.status === 102) {
                message.error(
                    checkLanguage(
                        {
                            vi: 'Vui lòng chờ 2 phút',
                            en: 'Please wait 2 minutes',
                        },
                        language
                    )
                );
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
            return message.error(
                checkLanguage(
                    {
                        vi: 'Email không đúng định dạng',
                        en: 'Invalid email',
                    },
                    language
                )
            );
        }
        dispatch(actChangeLoading(true));
        const res = await callapi.post('/forgot_password', submitData);
        dispatch(actChangeLoading(false));
        if (res.status === 1) {
            message.success(
                checkLanguage(
                    {
                        vi: 'Đặt lại mật khẩu thành công',
                        en: 'Reset password successfully',
                    },
                    language
                )
            );
            setTimeout(() => {
                history.push(`${loginURL}/${submitData.email}`);
            }, 1000);
        }
        if (res.status === 101) {
            message.error(
                checkLanguage(
                    {
                        vi: 'Email không tồn tại',
                        en: 'Email is not existed',
                    },
                    language
                )
            );
        }
        if (res.status === 102) {
            message.error(
                checkLanguage(
                    {
                        vi: 'Mã xác minh Email không đúng',
                        en: 'Incorrect email verification code',
                    },
                    language
                )
            );
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
                        <h3>{checkLanguage({ vi: 'Đặt lại mật khẩu', en: 'Reset password' }, language)}</h3>
                        <span>
                            {checkLanguage({ vi: 'Đã nhớ mật khẩu?', en: 'Remember your password?' }, language)} <span onClick={() => history.push('/login')}>{checkLanguage({ vi: 'Đăng nhập', en: 'Log in' }, language)}</span>
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
                                        e.target.nextElementSibling.innerText = checkLanguage({ vi: 'Email không đúng định dạng', en: 'Email is not valid' }, language);
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
                            <p>{checkLanguage({ vi: 'Mã reset password', en: 'Reset password code' }, language)}</p>
                            <input
                                onChange={e => {
                                    if (!Number(e.target.value) || e.target.value.length !== 6) {
                                        e.target.nextElementSibling.classList.add('show');
                                        e.target.nextElementSibling.innerText = checkLanguage({ vi: 'Mã reset password không đúng định dạng', en: 'Reset password code is not valid' }, language);
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
                                onClick={() => {
                                    getCode(document.getElementById('email').value);
                                }}
                                className='button'
                            >
                                {checkLanguage({ vi: 'Nhấp để nhận', en: 'Reset code' }, language)}
                                <span className='count-down'>{CountDownSendMail !== null && CountDownSendMail}</span>
                            </span>
                        </div>

                        <div className='form-group va-t'>
                            <p>{checkLanguage({ vi: 'Mật khẩu mới', en: 'New password' }, language)}</p>
                            <div className='input-password'>
                                <FontAwesomeIcon
                                    onClick={e => {
                                        setEye({ ...Eye, password: !Eye.password });
                                    }}
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
                                            e.target.nextElementSibling.innerText = checkLanguage({ vi: 'Password phải ít nhất 8 ký tự cả chữ và số', en: 'At least 8 digits, include word and number' }, language);
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
                            <p>{checkLanguage({ vi: 'Xác nhận mật khẩu', en: 'Repeat password' }, language)}</p>
                            <div className='input-password'>
                                <FontAwesomeIcon
                                    onClick={() => {
                                        setEye({ ...Eye, new_password: !Eye.new_password });
                                    }}
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
                                            e.target.nextElementSibling.innerText = checkLanguage({ vi: 'Password phải ít nhất 8 ký tự cả chữ và số', en: 'At least 8 digits, include word and number' }, language);
                                            setValidForm({ ...ValidForm, new_password: false });
                                        } else if (e.target.value !== document.querySelector('input[name="password"]').value) {
                                            e.target.nextElementSibling.classList.add('show');
                                            e.target.nextElementSibling.innerText = checkLanguage({ vi: 'Password không khớp', en: 'Password not match' }, language);
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
                            <button style={ValidForm.email && ValidForm.password && ValidForm.forgot_password_code && ValidForm.new_password ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0.6, pointerEvents: 'none' }} className='button'>
                                {checkLanguage({ vi: 'Xác nhận', en: 'Confirm' }, language)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
