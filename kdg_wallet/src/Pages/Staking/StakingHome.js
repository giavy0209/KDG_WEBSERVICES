import React, { useCallback, useState } from 'react'
import block1Icon from '../../assets/img/stake/block1-icon.png'
import { checkLanguage } from '../../helpers'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../../assets/css/staking.scss'
import { useEffect } from 'react'
import { STORAGE_DOMAIN } from '../../constant'
import callAPI from '../../axios'


const handleBlock1Loaded = function () {
    var listBlock1 = document.querySelectorAll('.item-block1')
    var heightest = listBlock1[0].offsetHeight
    listBlock1.forEach(el => {
        if (el.offsetHeight > heightest) heightest = el.offsetHeight
    }, [])
    listBlock1.forEach(el => {
        el.style.height = heightest + 'px'
    })
}



export default function App({ ...prop }) {
    const history = useHistory()
    const language = useSelector(state => state.lang)

    const [Info ,setInfo] = useState({})

    const balances = useSelector(state => state.balances)

    const getStakingInfo = useCallback(async () => {
        const res = await callAPI.get('/staking_dashboard')
        setInfo({...res})
    }, [])

    useEffect(() => {
        getStakingInfo()
    }, [getStakingInfo])


    return (
        <>
            <div className="kdg-container stake">
                <div className="block1">
                    <div className="block-title">
                        <h2 className="title">Kingdom Staking</h2>
                        <p>{checkLanguage({ vi: 'mô hình kinh tế chia sẻ trong thế giới số', en: 'SHARING ECONOMICS IN THE DIGITAL WORLD' }, language)}</p>
                    </div>
                    <div className="des">
                        {checkLanguage({ vi: 'Với hệ sinh thái Staking của Kingdom Game, người dùng không chỉ nắm giữ Token đơn thuần mà còn được tận hưởng thu nhập thụ động. King Wallet cung cấp dịch vụ Staking cho các loại Game Token và nhiều đồng tiền kỹ thuật số khác để hạn chế sự mất giá của Token từ lạm phát và tăng lợi tức cho người dùng.', en: 'With the Kingdom Game ecosystem, users not only hold tokens but also enjoy additional passive income. King Wallet provides Staking program for Game Tokens and many other digital currencies to limit the devaluation of Token from inflation and increase profit for users.' }, language)}
                    </div>
                    <div className="kdg-row kdg-column-3 list-block1">
                        <div className="item">
                            <div onLoad={handleBlock1Loaded} className="item-block1">
                                <img src={block1Icon} alt="" />
                                <p>{checkLanguage({ vi: 'Lợi tức cao lên tới', en: 'High income up to ' }, language)} <br /> 48%/{checkLanguage({ vi: 'năm', en: 'year' }, language)}</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-block1">
                                <img src={block1Icon} alt="" />
                                <p>{checkLanguage({ vi: 'Hỗ trợ ', en: 'Support' }, language)}Game Token, ERC-20 <br /> {checkLanguage({ vi: 'và', en: 'and' }, language)} TRC-20 Token</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-block1">
                                <img src={block1Icon} alt="" />
                                <p>{checkLanguage({ vi: 'Stake KDG nhận thêm ', en: 'Stake KDG gets another ' }, language)}<br /> Token Game {checkLanguage({ vi: 'khác miễn phí', en: 'for free' }, language)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stake">
                <div className="block2">
                    <div className="kdg-container">
                        <div className="kdg-row kdg-column-3 list-block2 text-c">
                            <div className="item">
                                <div className="block2-item">
                                    <div className="outside-block">
                                        <div className="inside-block">
                                            <div className="number"> {Info.stake} </div>
                                        </div>
                                    </div>
                                    <div className="block-name">{checkLanguage({ vi: 'Tổng Stake (~USDT)', en: 'Total Stake (~USDT)' }, language)}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="block2-item">
                                    <div className="outside-block">
                                        <div className="inside-block">
                                            <div className="number"> {Info.profit} </div>
                                        </div>
                                    </div>
                                    <div className="block-name">{checkLanguage({ vi: 'Lợi Nhuận (~USDT)', en: 'Profit (~USDT)' }, language)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kdg-container stake">
                <div className="history">
                    <table className="stacking-history">
                        <thead>
                            <tr>
                                <th className="head-title" colSpan="4">STAKING</th>
                            </tr>
                            <tr>
                                <th>Coin/Token</th>
                                <th>{checkLanguage({ vi: 'Số dư', en: 'Balance' }, language)}</th>
                                <th>{checkLanguage({ vi: 'Hoạt động', en: 'Operation' }, language)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balances?.map(o => o.coin.actions.includes(4) && <tr>
                                    <td>
                                        <img style={{width : 50, marginRight : 10}} alt="" src={STORAGE_DOMAIN + o.coin.icon.path}/>
                                        {o.coin.code}
                                    </td>
                                    <td>{o.balance}</td>
                                    <td>
                                        <button onClick={()=>history.push('/staking?coin='+o._id)} className="enable">{checkLanguage({ vi: 'Tham gia', en: 'Join' }, language)}</button>
                                        <button onClick={()=>history.push('/staking/history?coin=' + o._id)} className="disable">{checkLanguage({ vi: 'Lịch sử', en: 'History' }, language)}</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}