import { faArrowLeft, faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useState ,useMemo} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import '../../assets/css/staking.scss'
import { checkLanguage } from '../../helpers'
import { message } from 'antd'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'

const style = `
body #root{
    background-color: #f1f3f4;
}
`

export default function App() {
    const coin = new URLSearchParams(useLocation().search).get('coin');
    const history = useHistory()
    const language = useSelector(state=>state.lang)
    
    const [Packages, setPackages] = useState([]);
    const [Choose, setChoose] = useState('');
    const [Value , setValue] = useState(0)
    const balance = useSelector(state => state.balances?.find(o=>o._id === coin))

    const handleGetStakingPackage = useCallback(async (coin) => {
        const res = await callAPI.get(`/staking_package?coin=${coin}`)
        setPackages(res.data)
        setChoose(res.data[0])
    },[])

    const handleChangeValue = useCallback(e => {
        const value = Number(e.target.value)
        if(value !== 0 && !value) return setValue(0)
        
        if(value > balance.balance) return setValue(balance.balance)
        setValue(value)
    },[balance])

    const profitPerDay = useMemo(() => {
        if(!Choose || !Value) return 0;
        const findPackage = Packages.find(o => o._id === Choose._id);
        return Value * findPackage.profit_per_day / 100
    },[Choose,Packages, Value])

    const totalProfit = useMemo(() => {
        if(Choose === '' || !Value) return 0;
        const findPackage = Packages.find(o => o._id === Choose._id);
        return (Value * findPackage.profit_per_day / 100) * findPackage.end_after + Value
    },[Choose,Packages, Value])

    const handleStaking = useCallback(async () => {
        const res = await callAPI.post('/staking' , {value : Value , coin : balance.coin._id , package : Choose._id})
        if(res.status === 1) message.success(checkLanguage({
            vi :'Staking thành công',
            en: 'Staking success'
        }, language))
    },[Value , balance , Choose , language])

    useMemo(() => {
        handleGetStakingPackage(coin)
    },[coin , handleGetStakingPackage])
    return(
        <>
            <style>{style}</style>
            <div className="kdg-container">
                <div className="stake-join">
                    <div className="block1">
                        <div
                        onClick={()=>history.goBack()}
                        className="back-button">
                            <span className="icon"><FontAwesomeIcon icon={faArrowLeft}/></span>
                            <span className="text"> {checkLanguage({vi : 'Trở về' , en : 'Back'}, language)} </span>
                        </div>
                        <h2 className="title">Staking</h2>
                        <div className="block-top-info">
                            <div className="coin-info">
                                <img src={STORAGE_DOMAIN + balance?.coin.icon.path} alt=""/>
                                <span className="name">{balance?.coin.code}</span>
                            </div>
                            <div className="stake-info">
                            {checkLanguage({vi: 'Tỷ lệ lợi nhuận tham chiếu lên tới', en: 'Expected annual rate of return up to'}, language)} <span className="percent">{Math.ceil(Choose.profit_per_day * 360)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="block2">
                        <div className="title">{checkLanguage({vi: 'Các Gói Stake', en: 'Lookup Options'}, language)}</div>
                        <p className="sub-title">{checkLanguage({vi: 'Chọn một trong số các gói stake dưới đây:', en: 'Choose one of the Staking packages below'}, language)}</p>

                        <div className="kdg-row kdg-column-4 list-block2">
                            {
                                Packages.map( _stake => 
                                    <div className="item">
                                        <div 
                                        onClick={()=>setChoose(_stake)}
                                        className={`choose-stake ${Choose._id === _stake._id ? 'active' : ''}`}>
                                            <span className="checkbox">
                                                <div className="icon">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                            </span>
                                            <span className="des"> {_stake.end_after - _stake.start_after} {checkLanguage({vi : 'Ngày', en: 'Days'}, language)} </span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/* <div className="block3">
                        <div className="kdg-row kdg-column-4">
                            <div className="item">
                                <div className="dot"></div>
                                <div className="des">
                                    <div className="text">
                                        {checkLanguage({vi: 'Thời gian bắt đầu trả lãi', en: 'Starting time'}, language)}
                                    </div>
                                    <div className="date"> {renderDate(calcDate(Selected).start_date)} </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="dot"></div>
                                <div className="des">
                                    <div className="text">
                                        {checkLanguage({vi: 'Thời gian kết thúc trả lãi', en: 'Closing time'}, language)}
                                    </div>
                                    <div className="date"> {renderDate(calcDate(Selected).end_date)} </div>
                                </div>
                            </div>

                            <div className="item">
                                <div className="dot"></div>
                                <div className="des">
                                    <div className="text">
                                        {checkLanguage({vi: 'Thời gian mở khóa', en: 'Unlocking time'}, language)}
                                    </div>
                                    <div className="date"> {renderDate(calcDate(Selected).unlock_date)} </div>
                                </div>
                            </div>

                            <div className="item">
                                <div className="dot"></div>
                                <div className="des">
                                    <div className="text">
                                        {checkLanguage({vi: 'Thời gian xác nhận kết thúc', en: 'Confirmimg time'}, language)}
                                    </div>
                                    <div className="date"> {renderDate(calcDate(Selected).confirm_date)} </div>
                                </div>
                            </div>
                            
                        </div>
                    </div> */}

                    <div className="block4">
                        <div className="title">{checkLanguage({vi: 'Số Lượng Đầu Tư', en: 'Investment Amount'}, language)}</div>
                        <p className="sub-title">{checkLanguage({vi: 'Nhập số lượng bạn muốn đầu tư', en: 'Enter the amount you want to invest'}, language)}</p>
                        <div className="kdg-row group-input-calc">
                            <div className="kdg-col-8">
                                <div className="group-input-info">
                                    <div className="available">
                                        {checkLanguage({vi: 'Số dư khả dụng:', en: 'Available balance'}, language)} {balance?.balance} {balance?.coin.code}
                                    </div>
                                    <div className="group-input">
                                        <span className="input">
                                            <span>{checkLanguage({vi: 'Nhập số lượng đầu tư:', en: 'Enter amount to stake'}, language)}</span>
                                            <input 
                                            onChange={handleChangeValue}
                                            type="text" 
                                            value={Value}
                                            />
                                        </span>
                                        <span className="coin-name">{balance?.coin.code}</span>
                                    </div>
                                    <div className="kdg-row kdg-column-2">
                                        <span className="item" style={{color : '#ff0000'}}>
                                            {checkLanguage({vi : 'Tối thiểu', en : 'Minimum'}, language)} : {Choose.min}
                                        </span>
                                        <span className="item" style={{color : '#ff0000'}}>
                                            {checkLanguage({vi : 'Tối đa', en : 'Maximum'},language)} : {Choose.max}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="kdg-col-4">
                                <div className="calc-group">
                                    <div className="top">
                                        <div className="name">{checkLanguage({vi: 'Lợi nhuận ngày', en: 'Daily interest'}, language)}</div>
                                        <div className="data">{profitPerDay} {balance?.coin.code}</div>
                                    </div>
                                    <div className="bottom">
                                        <div className="name">{checkLanguage({vi: 'Tổng gốc & lãi', en: 'Total principal & interest'}, language)}</div>
                                        <div className="data"> {totalProfit} {balance?.coin.code}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block5">
                        <div className="title">{checkLanguage({vi: 'Xác Nhận Thông Tin', en: 'Confirm information'}, language)} <div className="icon"><FontAwesomeIcon icon={faExclamationCircle}/></div> </div>
                        <p className="sub-title">{checkLanguage({vi: 'Vui lòng đọc kỹ quy tắc trước khi tham gia', en: 'Please read the rules carefully before joining'}, language)}</p>
                        <div className="block-content">
                            <div className="group-content">
                                <div className="title-content"><span className="index">(1)</span> {checkLanguage({vi: 'Lãi suất được trả lúc 8:00 hàng ngày (Tối thiểu 24 tiếng cho lần nhận lãi đầu tiên).', en: 'Interest is paid at 8:00 every day (Min 24 hours for the first interest payment)'}, language)}</div>
                            </div>
                            <div className="group-content">
                                <div className="title-content"><span className="index">(2)</span> {checkLanguage({vi: 'Kết thúc thời hạn stake, người dùng có thể rút khoản gốc đã stake trong vòng 05 ngày bằng cách nhấn xác nhận kết thúc stake. Khoản stake không được rút sẽ được tự động gia hạn.', en: 'At the end of the Stake period, users can withdraw the Stake original within 05 days by pressing the button to confirm. Stakes that are not withdrawn will be automatically renewed'}, language)}</div>
                            </div>
                        </div>
                        <div className="input-group checkbox">
                            <input 
                            className="checkbox"
                            type="checkbox" name="confirm" id="confirm"/> 
                            <label className="checkbox-label" for="confirm">
                                <span className="checkbox-box"></span> 
                                <span>
                                    {checkLanguage({vi: 'Tôi đã đọc và hiểu rõ', en: 'I have read and understood the risk warning before participating'}, language)} <a href='terms-of-service/1' target="_blank" className="link">{checkLanguage({vi: 'cảnh báo rủi ro', en: 'the risk warning'}, language)}</a> {checkLanguage({vi: 'trước khi tham gia', en: 'before participating'}, language)}
                                </span>
                            </label>

                            <button 
                            style={(Value < Choose.min || Value > Choose.max) ? {pointerEvents : 'none'} : null}
                            onClick={handleStaking}>
                                {checkLanguage({vi: 'Tham gia ngay', en: 'Join now'}, language)}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}