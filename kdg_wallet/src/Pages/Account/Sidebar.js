import React from 'react'
import defaultAccount from '../../assets/img/default-account.png'
import user from '../../assets/img/user.png'
import userActive from '../../assets/img/user-active.png'
import verified from '../../assets/img/verified.png'
import verifiedActive from '../../assets/img/verified-active.png'
import invite from '../../assets/img/invite.png'
import inviteActive from '../../assets/img/invite-active.png'
import kyc from '../../assets/img/kyc.png'
import kycActive from '../../assets/img/kyc-active.png'
import { useSelector } from 'react-redux'
import { checkLanguage } from '../../helpers'

export default function App({Tab, setTab,...prop}) {
    const language = useSelector(state=>state.lang)
    const username = useSelector(state=>state.user && {first_name: state.user.first_name , last_name:state.user.last_name})
    const isKYC = useSelector(state=> state && state.user && state.user.kyc)
    return (<div className="kdg-col-3 va-t">
        <div className="sidebar">
            <div className="top-sidebar">
                <div className="avata">
                    <div className="avata-img img img-1-1">
                        <img alt="" src={defaultAccount}/>
                    </div>
                </div>
                <h3>{(username && username.first_name && username.last_name) ? `${username.first_name} ${username.last_name}` : checkLanguage({vi: 'TÀI KHOẢN' , en: 'ACCOUNT'},language)}</h3>
            </div>
            <div className="bottom-sidebar">
                <div className="tab">
                    <div onClick={()=>{setTab(0)}} className={`item ${Tab === 0 && 'active'}`}>
                        <img alt="" src={Tab === 0 ? userActive : user}/>
                        <div className="text">
                            <h4>{checkLanguage({vi: 'Thông tin cá nhân', en: 'Account'}, language)}</h4>
                            <p>{checkLanguage({vi: 'Xem và cập nhật thông tin', en: 'View and update information'}, language)}</p>
                        </div>
                    </div>
                    <div onClick={()=>{setTab(1)}} className={`item ${Tab === 1 && 'active'}`}>
                        <img alt="" src={Tab === 1 ? verifiedActive : verified}/>
                        <div className="text">
                            <h4>{checkLanguage({vi: 'Bảo mật tài khoản', en: 'Security Settings'}, language)}</h4>
                            <p>{checkLanguage({vi: 'Các tiện ích bảo mật', en: 'Security utilities'}, language)}</p>
                        </div>
                    </div>
                    <div onClick={()=>{setTab(2)}} className={`item ${Tab === 2 && 'active'}`}>
                        <img alt="" src={Tab === 2 ? inviteActive : invite}/>
                        <div className="text">
                            <h4>{checkLanguage({vi: 'Referral', en: 'Referral'}, language)}</h4>
                            <p>
                                {checkLanguage({vi: 'Giới thiệu thành viên mới', en: 'Introduce new members'}, language)} <br />
                                {checkLanguage({vi: 'Tích điểm thưởng', en: 'Get reward points'}, language)} <br />
                            </p>
                        </div>
                    </div>
                    <div onClick={()=>{setTab(3)}} className={`item ${Tab === 3 && 'active'}`}>
                        <img alt="" src={Tab === 3 ? kycActive : kyc}/>
                        <div className="text">
                            <h4>KYC</h4>
                            <p>{checkLanguage({vi: 'Xác thực tài khoản', en: 'Account verification'}, language)}</p>
                            <p
                            style={
                                isKYC === '1' ? {color: '#00ff00'} :
                                isKYC === '2' ?  {color: '#fac800'} :
                                isKYC === '3' ?  {color: '#ff0000'} : {} 
                            }
                            
                            > 
                                {
                                    isKYC === '1' ? 
                                    checkLanguage({vi: 'KYC Thành công', en: 'Confirmed'}, language) : 
                                    isKYC === '2'?
                                    checkLanguage({vi: 'KYC Đang duyệt', en: 'Pending'}, language) : 
                                    isKYC === '3'?
                                    checkLanguage({vi: 'KYC bị từ chối', en: 'Rejected'}, language) : 
                                    ''
                                }

                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
    
}