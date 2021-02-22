import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {message} from 'antd'
import { checkLanguage, validateForm } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { asyncLogin } from '../../store/authAction'
import ChooseLanguage from '../../components/ChooseLanguages'
export default function App({...rest}) {
    const {email} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const language = useSelector(state => state.lang)

    const [ValidForm , setValidForm] = useState({email:false, password: true})
    const [Eye, setEye] = useState({password: false})

    useEffect(()=>{
        document.title = checkLanguage({vi: 'Đăng nhập', en: 'Login'}, language)
    },[language])

    useEffect(() => {
        if(email) setValidForm(valid => {return {...valid , email : true}})
    },[email])

    const handleLogin = useCallback( async(e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        const submitData = {}
        for(var pair of data.entries()) {
            submitData[pair[0]] = pair[1]
        }
        const res = await dispatch(asyncLogin(submitData))
        if(res.status === 1) {
            history.push('/services')
        }
        if(res.status === 101) message.error(checkLanguage({
            vi : 'Email đã tồn tại',
            en : 'Email existed'
        },language))
        if(res.status === 102) message.error(checkLanguage({
            vi : 'Sai tên đăng nhập hoặc mật khẩu',
            en : 'incorrect email or password'
        },language))
    },[dispatch,history,language])

    return (
        <>
        <div className="form-block">
            <div className="left"><img alt="" src="/images/img-login2.png"></img></div>
            <div className="right">
                <form onSubmit={handleLogin}>
                    <ChooseLanguage />
                    <h3>{checkLanguage({vi: 'ĐĂNG NHẬP', en: 'LOG IN'}, language)}</h3>
                    <span>{checkLanguage({vi: 'Bạn chưa có tài khoản?', en: 'Have not account yet?'}, language)} <span onClick={()=>history.push('/reg')}>{checkLanguage({vi: 'Đăng ký', en: 'Register now'}, language)}</span></span>
                    <div className="form-group">
                        <p>Email</p>
                        <input 
                        onChange={e =>{
                            e.target.value = e.target.value.toLowerCase()
                            if(!e.target.value.match(validateForm.email)){
                                e.target.nextElementSibling.classList.add('show')
                                e.target.nextElementSibling.innerText = checkLanguage({vi: 'Email không đúng định dạng',en: 'Email is not valid'},language)
                                setValidForm({...ValidForm, email: false})
                            }else{
                                e.target.nextElementSibling.classList.remove('show')
                                e.target.nextElementSibling.innerText = ''
                                setValidForm({...ValidForm, email: true})
                            }
                        }}
                        defaultValue={email}
                        name="email" id="email"/>
                        <span className="validate-error"></span>
                    </div>
                    <div className="form-group">
                        <p>{checkLanguage({vi: 'Mật khẩu', en: 'Password'}, language)}</p>
                        <div className="input-password">
                            <FontAwesomeIcon 
                            onClick={e =>{
                                setEye({...Eye , password: !Eye.password})
                            }}
                            size="1x" color="#000" className="eye" icon={Eye.password ? faEye : faEyeSlash}/>
                            <input 
                            type={Eye.password ? '' : 'password'}
                            placeholder={ checkLanguage({vi: 'Mật khẩu phải ít nhất 8 ký tự cả chữ và số',en: 'At least 8 digits, include word and number'},language)}
                            name="password" />
                            <span className="validate-error"></span>
                        </div>
                    </div>
                    <div className="form-group half">
                        <button 
                        style={
                            (ValidForm.email && ValidForm.password) ? 
                            {opacity:  1 , pointerEvents:  'all'} :
                            {opacity: .6 , pointerEvents: 'none'} 
                        } 
                        className="button">{checkLanguage({vi: 'Đăng nhập', en: 'Log in'}, language)}</button>
                    </div>
                    <div>
                        <span style={{fontSize: 14, cursor: 'pointer', color: "#fac800", paddingLeft: 8}} onClick={()=>history.push('/forgot-password')}>{checkLanguage({vi: 'Quên mật khẩu', en: 'Forgot password?'}, language)}</span>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}