import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeLoading} from '../../store/action'
import { useHistory, useParams } from 'react-router-dom'
import {message} from 'antd'
import { checkLanguage, validateForm } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import ChooseLanguage from '../../components/ChooseLanguages'
import callAPI from '../../axios'

export default function App() {
    const {ref} = useParams()
    const [CountDownSendMail, setCountDownSendMail] = useState(null)
    const [CountDownSendMailTimeOut, setCountDownSendMailTimeOut] = useState(null)
    const [ValidForm , setValidForm] = useState({email:false, password: false, repassword: false, email_code: false,})
    const [Eye, setEye] = useState({password: false , repassword: false})
    const history = useHistory()
    const dispatch = useDispatch()
    const language = useSelector(state => state.lang)

    useEffect(()=>{
        document.title = checkLanguage({vi: 'Đăng ký', en: 'Register'}, language)
    },[language])

    const loginURL = useSelector(state => {
        return state.settings && state.settings.login_button.url 
    })

    useEffect(()=>{
        if(CountDownSendMail !== null){
            if(CountDownSendMail <= 0) {
                setCountDownSendMail(null)
            }
            if(CountDownSendMail > 0){
                var timeout = setTimeout(() => {
                    setCountDownSendMail(CountDownSendMail - 1)
                }, 1000);
                setCountDownSendMailTimeOut(timeout)
            }
        }
    },[CountDownSendMail])
    
    const [check,setcheck] = useState(false)

    async function getCode(email){
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return  message.error(checkLanguage({
                vi : 'Email không đúng định dạng',
                en : 'Invalid email'
            }, language))
        }
        dispatch(actChangeLoading(true))
        try {
            const res = (await callAPI.post('/create_code?type=1',{email}))
            if(res.status === 1){
                message.success(checkLanguage({
                    vi : 'Đã gửi mã code vào mail của bạn',
                    en : 'Have sent code to your email'
                }, language))
            }
            if(res.status === 101){
                console.log(123);
                message.error(checkLanguage({
                    vi : 'Email đã tồn tại',
                    en : 'Email existed'
                },language))
            }
            if(res.status === 102){
                message.error(checkLanguage({
                    vi : 'Vui lòng chờ 2 phút',
                    en : 'Please wait 2 minutes'
                },language))
            }
        } catch (error) {
        }
        dispatch(actChangeLoading(false))
    }

    const handleReg = async (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const submitData = {}
        for(var pair of data.entries()) {
            submitData[pair[0]] = pair[1]
        }
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(submitData.email)) {
            return  message.error(checkLanguage({
                vi : 'Email không đúng định dạng',
                en : 'Invalid email'
            }, language))
        }
        dispatch(actChangeLoading(true))
        const res = (await callAPI.post('/user',submitData))
        dispatch(actChangeLoading(false))
        if(res.status === 1){
            message.success(checkLanguage({vi: "Đăng ký thành công", en: 'Register success'},language))
            setTimeout(() => {
                history.push(`${loginURL}/${submitData.email}`)
            }, 1000);
        }
        if(res.status === 101){
            message.error(checkLanguage({
                vi : 'Email đã tồn tại',
                en : 'Email existed'
            },language))
        }
        if(res.status === 102){
            message.error(checkLanguage({
                vi : 'Mã xác minh Email không đúng',
                en : 'Incorrect email verification code'
            },language))
        }
    }


    return (
        <>
        <div className="form-block">
            <div className="left"><img alt="" src="/images/img-login.png"></img></div>
            <div className="right">
                <form onSubmit={handleReg}>
                    <ChooseLanguage />
                    <h3>{checkLanguage({vi: "Đăng ký", en: 'Register'},language)}</h3>
                    <span>{checkLanguage({vi: "Đã có tài khoản?", en: 'Already have an account?'},language)} <span onClick={()=>history.push('/login')}>{checkLanguage({vi: "Đăng nhập", en: 'Log in'},language)}</span></span>
                    <div className="form-group">
                        <p>Email</p>
                        <input 
                        onChange={e =>{
                            e.target.value = e.target.value.toLowerCase()
                            setCountDownSendMail(null)
                            clearTimeout(CountDownSendMailTimeOut)
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
                        name="email" id="email"/>
                        <span className="validate-error"></span>
                    </div>
                    <div className="form-group half va-t">
                        <p>{checkLanguage({vi: "Mật khẩu", en: 'Password'},language)}</p>
                        <div className="input-password">
                            <FontAwesomeIcon 
                            onClick={e =>{
                                setEye({...Eye , password: !Eye.password})
                            }}
                            size="1x" color="#000" className="eye" icon={Eye.password ? faEye : faEyeSlash}/>
                            <input 
                            type={Eye.password ? '' : 'password'}
                            onChange={e=>{
                                if(!e.target.value.match(validateForm.password)){
                                    e.target.nextElementSibling.classList.add('show')
                                    e.target.nextElementSibling.innerText = checkLanguage({vi: 'Password phải ít nhất 8 ký tự cả chữ và số',en: 'At least 8 digits, include word and number'},language)
                                    setValidForm({...ValidForm, password: false})
                                }else{
                                    e.target.nextElementSibling.classList.remove('show')
                                    e.target.nextElementSibling.innerText = ''
                                    setValidForm({...ValidForm, password: true})
                                }
                            }}
                            name="password" />
                            <span className="validate-error"></span>
                        </div>
                    </div>
                    <div className="form-group half va-t">
                        <p>{checkLanguage({vi: "Xác nhận mật khẩu", en: 'Repeat password'},language)}</p>
                        <div className="input-password">
                            <FontAwesomeIcon 
                            onClick={() =>{
                                setEye({...Eye , repassword: !Eye.repassword})
                            }}
                            size="1x" color="#000" className="eye" icon={Eye.repassword ? faEye : faEyeSlash}/>
                            <input 
                            type={Eye.repassword ? '' : 'password'}
                            onChange={e=>{
                                if(!e.target.value.match(validateForm.password)){
                                    e.target.nextElementSibling.classList.add('show')
                                    e.target.nextElementSibling.innerText = checkLanguage({vi: 'Password phải ít nhất 8 ký tự cả chữ và số',en: 'At least 8 digits, include word and number'},language)
                                    setValidForm({...ValidForm, repassword: false})
                                }else if(e.target.value !== document.querySelector('input[name="password"]').value){
                                    e.target.nextElementSibling.classList.add('show')
                                    e.target.nextElementSibling.innerText = checkLanguage({vi: 'Password không khớp',en: 'Password not match'},language)
                                    setValidForm({...ValidForm, repassword: false})
                                }else{
                                    e.target.nextElementSibling.classList.remove('show')
                                    e.target.nextElementSibling.innerText = ''
                                    setValidForm({...ValidForm, repassword: true})
                                }
                            }}
                            name="repassword"/>
                            <span className="validate-error"></span>
                        </div>
                    </div>
                    <div className="form-group half">
                        <p>{checkLanguage({vi: "Mã xác minh email", en: 'Sign up code'},language)}</p>
                        <input
                        onChange={e=>{
                            if(!Number(e.target.value) || e.target.value.length !== 6){
                                e.target.nextElementSibling.classList.add('show')
                                e.target.nextElementSibling.innerText = checkLanguage({vi: 'Mã xác minh Email không đúng định dạng',en: 'Sign up code is not valid'},language)
                                setValidForm({...ValidForm, email_code: false})
                            }else{
                                e.target.nextElementSibling.classList.remove('show')
                                e.target.nextElementSibling.innerText = ''
                                setValidForm({...ValidForm, email_code: true})
                            }
                        }}
                        name="email_code" />
                        <span className="validate-error"></span>
                    </div>
                    <div className="form-group half va-b">
                        <span 
                        
                        style={
                            (CountDownSendMail === null && ValidForm.email) ?
                            {
                                opacity: 1 ,
                                pointerEvents:  'all'
                            } : 
                            { 
                                opacity: .5 ,
                                pointerEvents:  'none'
                            }
                        }
                        onClick={()=>{getCode(document.getElementById('email').value)}} 
                        className="button">
                            {checkLanguage({vi: "Nhận mã", en: 'Get code'},language)}
                            <span className="count-down">{CountDownSendMail !== null && CountDownSendMail}</span>
                        </span>
                    </div>
                    <div className="form-group">
                        <p>{checkLanguage({vi: "Mã mời (tuỳ chọn)", en: 'Referral code (optional)'},language)}</p>
                        <input 
                        defaultValue={ref ? ref : ''}
                        name="parent_ref_code" />
                    </div>
                    <div className="form-group checkbox">
                        <input onChange={e=>setcheck(e.target.checked)} id="confirm" type="checkbox" className="checkbox" name="confirm"/>
                        <label className="checkbox-label" htmlFor="confirm">
                            <span className="checkbox-box"></span>
                            {checkLanguage({vi: "Tôi đồng ý với ", en: 'I agree with'},language)} 
                            <a style={{display: 'inline'}} target="_blank" href="/terms-of-service/0">
                                {checkLanguage({vi: " Thỏa thuận người dùng ", en: ' User Agreement '},language)}
                            </a>
                            <a style={{display: 'inline'}} target="_blank" href="/terms-of-service/2">
                                {checkLanguage({vi: "| Chính sách bảo mật của KDG", en: '| Privacy Policy of KDG'},language)}
                            </a>
                        </label>
                    </div>
                    <div className="form-group half">
                        <button 
                        style={
                            (ValidForm.email && ValidForm.password && ValidForm.email_code && ValidForm.repassword && check) ? 
                            {opacity:  1 , pointerEvents:  'all'} :
                            {opacity: .6 , pointerEvents: 'none'} 
                        } 
                        className="button">{checkLanguage({vi: "Đăng ký", en: 'Register'},language)}</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
    
}