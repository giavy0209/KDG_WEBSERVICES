import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import flagvn from '../../assets/img/flagvn.png'
import flagen from '../../assets/img/flagen.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { atcChangeLanguage } from '../../store/action'
export default function App(){
    const dispatch = useDispatch()
    const language = useSelector(state => state.lang)
    
    return(
        <>
            <div className="choose-lang">
                <div>
                    {
                        language === 'vi' ? 
                        <><img src={flagvn} alt='' /><span>VN</span><FontAwesomeIcon style={{fontSize: 14}} size="1x" color="#8a8e8c" icon={faCaretDown}/></> :
                        <><img src={flagen} alt='' /><span>EN</span><FontAwesomeIcon style={{fontSize: 14}} size="1x" color="#8a8e8c" icon={faCaretDown}/></>
                    }
                </div>
                <div className="drop-down">
                    <ul>
                        <li 
                        onClick={()=>{
                            dispatch(atcChangeLanguage('vi'))
                            localStorage.setItem('lang', 'vi')
                        }}
                        className={language === 'vi' ? 'active' : ''}><img src={flagvn} alt='' /><span>VN</span></li>
                        <li 
                        onClick={()=>{
                            dispatch(atcChangeLanguage('en'))
                            localStorage.setItem('lang', 'en')
                        }}
                        className={language === 'en' ? 'active' : ''}><img src={flagen} alt='' /><span>EN</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}