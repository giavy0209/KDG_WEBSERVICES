import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { checkLanguage } from '../../helpers';
import callapi from '../../axios';

export default function App(){
    const [ListReward, setListReward] = useState([])
    const user = useSelector(state=> state.user)
    const language = useSelector(state=> state.lang)
    const kdg_reward = useSelector(state=>state && state.user && state.user.kdg_reward)    

    const handleCopy = useCallback(e=>{
        var input = document.createElement('input');
        document.querySelector('body').append(input);
        input.value = e.target.innerText;
        input.select();
        document.execCommand("copy");
        input.remove();
        message.success(checkLanguage({vi: 'Đã copy', en: 'copied'}, language))
    },[language])

    const handleGetHistory = useCallback(async ()=>{
        const res = (await callapi().get(`/api/get_transaction?id=${user._id}&skip=0&take=9999999&type=kyc-success`)).data 
        console.log(res);
        setListReward([...res.data])
        document.querySelector('.maskreward').classList.add('show')
    },[user])

    return(
        <>

        <div
        onClick={e=>{
            e.target.classList.remove('show')
        }}
        className='maskreward'>
            <div className='popupreward'>
                <div className='header'>
                    <p >Phần thưởng của tôi</p>
                </div>
                <div className='body'>
                    <div className='count-info'>
                        <div className='count'>
                            <p>Số người KYC thành công</p>
                            <p className='number'> {ListReward.length} </p>
                        </div>
                    </div>
                    <p className='title'>Danh sách Phần thưởng của tôi</p>
                    <div className='list-detail'>
                        <table>
                            <thead>
                                <tr>
                                    <th> {checkLanguage({vi : 'Thời gian', en : 'Date'},language)} </th>
                                    <th> {checkLanguage({vi : 'Nhận từ', en : 'From'},language)} </th>
                                    <th> {checkLanguage({vi : 'Tình trạng', en : 'Status'},language)} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListReward.length > 0 ? ListReward.map(o=>{
                                    var d = new Date(o.create_date)
                                    return o.from && <tr>
                                        <td><span>{d.getHours()}:{d.getMinutes()}</span> <br></br> <span>{d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}</span> </td>
                                        <td> {o.from.email} </td>
                                        <td>KYC thành công</td>
                                    </tr>
                                })
                                :
                                <tr>
                                    <td colSpan='2'> {checkLanguage({vi: 'Không có dữ liệu', en: 'No data'}, language)} </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className='ref'>
            <h3>REFERRAL</h3>
            <p 
            onClick={handleGetHistory}
            className='open-reward'> {checkLanguage({vi: 'Phần thưởng của tôi', en: 'Rewarded'}, language)} </p>
        </div>
        <div className="ref">
            <div>
                <span>{checkLanguage({vi: 'Điểm thưởng hiện tại', en: 'Current reward points'}, language)}:</span>
                <span className="high-line">{kdg_reward} KDG Reward</span>
            </div>
            <div>
                <span>{checkLanguage({vi: 'Liên kết giới thiệu', en: 'Referral link'}, language)}:</span>
                <span className="link" onClick={handleCopy}>
                    https://www.kingdomgame.org/reg/{user && user.ref_code}
                    <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faCopy} />    
                </span>
            </div>
            <div>
                <span>{checkLanguage({vi: 'Mã giới thiệu', en: 'Referral code'}, language)}:</span>
                <span className="code" onClick={handleCopy}>{user && user.ref_code}<FontAwesomeIcon style={{pointerEvents: 'none'}}icon={faCopy}/></span>
            </div>
        </div>
        <div className='rule'>
            <p>{checkLanguage({vi: 'Quy luật', en: 'Rules'}, language)}</p>
            <p>{checkLanguage({vi: '1. Bất kỳ ai mời một người đăng ký tài khoản thành công, sau đó thực hiện xác minh danh tính (KYC) thành công sẽ nhận được 5 KDG reward.', en: '1. Anyone who successfully invites someone who completes KYC verification, will receive 5 KDG reward.'}, language)}</p>
            <p>{checkLanguage({vi: '2. Không giới hạn lời mời, càng mời nhiều bạn, càng nhận được nhiều KDG reward.', en: '2. No limit invitations, the more invitation, the more KDG rewards you get.'}, language)}</p>
            <p>{checkLanguage({vi: '3. Bất kỳ ai người dùng cùng 1 thiết bị, cùng một số điện thoại sẽ được xem như một người dùng.', en: '3. Anyone using the same device, same phone number will be seen as one user.'}, language)}</p>
            <p>{checkLanguage({vi: '4. Bất kỳ ai đăng nhập bất thường hoặc theo các hình thức gian lận sẽ không nhận được phần thưởng', en: '4. Anyone who signs in with cheating ways or abnormal ways will not receive any rewards.'}, language)}</p>
            
        </div>

        </>
    )
}