import React ,{useState, useCallback} from 'react'
import swap from '../../assets/img/swap.png'
import deposit from '../../assets/img/deposit.png'
import withdraw from '../../assets/img/withdraw.png'
import stake from '../../assets/img/stake.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy} from '@fortawesome/free-solid-svg-icons'
import Form from '../../Components/Form'
import QRCode from 'qrcode'
import Modal from '../../Components/Modal'
import { useSelector } from 'react-redux'
import { message, Radio } from 'antd'
import { useHistory } from 'react-router-dom'
import { checkLanguage } from '../../helpers'
import callAPI from '../../axios'

const listAct = [
    {
        vi : 'Nạp',
        en : 'Deposit',
        icon : deposit
    },
    {
        vi : 'Rút',
        en : 'Withdraw',
        icon : withdraw
    },
    {
        vi : 'Swap',
        en : 'Swap',
        icon : swap
    },
    {
        vi : 'Stake',
        en : 'Stake',
        icon : stake
    },
]

export default function ListCoin(){
    const history = useHistory()
    const [SwapTo , setSwapTo] = useState({})
    const [VisibleSwap, setVisibleSwap] = useState(false)
    const [VisibleDeposit, setVisibleDeposit] = useState(false)
    const [VisibleWithdraw, setVisibleWithdraw] = useState(false)
    const [Balance, setBalance] = useState({})

    const language = useSelector(state => state.lang)
    const balances = useSelector(state => state.balances)


    const handleCopy = useCallback( e=>{
        var input = document.createElement('input');
        document.querySelector('body').append(input);
        input.value = e.target.innerText;
        input.select();
        document.execCommand("copy");
        input.remove();
        message.success(checkLanguage({vi: 'Đã copy', en: 'copied'},language))
    },[language])

    const handleWithdraw = useCallback(async data => {
        const res = await callAPI.post('/withdraw' , data)
        if(res.status === 100) {
            message.error(checkLanguage({
                vi: "Vui lòng thiết lập 2FA trước",
                en: "Please active 2FA"
            }, language) )
        }
        if(res.status === 101){
            message.error(checkLanguage({
                vi: "2Fa không đúng",
                en: "Incorrect 2FA"
            },language))
        }
        if(res.status === 102){
            message.error(checkLanguage({
                vi: "Vui lòng xác minh danh tính trước",
                en: "Please complete KYC"
            },language))
        }
        if(res.status === 103){
            message.error(checkLanguage({
                vi: "Số lượng rút tối thiểu không đủ",
                en: "Transaction minimum not enough"
            },language))
        }
        if(res.status === 104){
            message.error(checkLanguage({
                vi: "Số dư không đủ",
                en: "Not enough balance"
            },language))
        }
        if(res.status === 1){
            message.success(checkLanguage({
                vi: "Rút tiền thành công",
                en: "Withdraw Successfully"
            },language))
        }
    },[language])

    const handleSwap = useCallback(async data => {
        const res = await callAPI.post('/swap' , data)
        if(res.status === 101) {
            message.error(checkLanguage({
                vi : 'Số lượng swap chưa đạt mức tối thiểu',
                en: 'Swap quantity has not reached minimum'
            } , language))
        }
        if(res.status === 102) {
            message.error(checkLanguage({
                vi : 'Số lượng swap vượt mức tối đa',
                en: 'Swap quantity has exceeded maximum'
            } , language))
        }
        if(res.status === 103) {
            message.error(checkLanguage({
                vi : 'Bạn đã swap vượt quá số lần trong ngày',
                en: ' The number of swap times is exceeded'
            } , language))
        }
        if(res.status === 1) {
            message.success(checkLanguage( {
                vi : 'Bạn đã swap thành công',
                en: 'Swap successfully'
            } , language))
        }
    },[language])

    const handleAct = useCallback(async (act, balance) => {
        if(act === 1){
            const qr = await QRCode.toDataURL(balance.wallet.address)
            setBalance({...balance , qr})
            setVisibleDeposit(true)
            return
        }
        if(act === 2){
            setBalance({...balance})
            setVisibleWithdraw(true)
            return
        }
        if(act === 3){
            setBalance({...balance})
            setVisibleSwap(true)
            return
        }
        if(act === 4){
            history.push('/staking')
        }

    },[history])
    return(
        <>
        <Modal isVisible={VisibleDeposit} onCancel={()=>setVisibleDeposit(false)} title={checkLanguage(listAct[0] , language)}>
            <div className="model-deposit">
                <div className="qr-code">
                    <img alt="" src={Balance.qr} /> <span></span>
                </div>
                <div className="deposit-address"><span onClick={handleCopy}>{Balance.wallet?.address}</span><FontAwesomeIcon icon={faCopy}/></div>
            </div>
        </Modal>
        <Modal isVisible={VisibleWithdraw} onCancel={()=>setVisibleWithdraw(false)} title={checkLanguage(listAct[1] , language)}>
            <Form onSubmit={handleWithdraw} className="model-withdraw">
                <div className="input-group">
                    <p>{checkLanguage({vi : 'Địa chỉ' , en : 'Address'} , language)}</p>
                    <input name="to_address"/>
                </div>
                <div className="input-group">
                    <p>{checkLanguage({vi : 'Số lượng' , en : 'Amount'} , language)}</p>
                    <input name="value"/>
                </div>
                <div className="input-group">
                    <p>{checkLanguage({vi : 'Mã Google 2FA' , en : 'Google 2FA'} , language)}</p>
                    <input name="token"/>
                </div>
                <input style={{display : "none"}} name="coin" value={Balance.coin?._id}/>
                <button type="submit">
                    {checkLanguage({vi : 'rút' , en : 'Withdraw' } , language)}
                </button>
            </Form>
        </Modal>
        
        <Modal isVisible={VisibleSwap} onCancel={() => setVisibleSwap(false)} title="Swap">
            <Form onSubmit={handleSwap} className="model-swap">
                <input className="input-hidden" name="swapFrom" value={Balance.coin?._id} />
                <div className="input-group">
                    <p>{checkLanguage({vi : 'Swap với' , en : 'Swap with'} , language)}</p>
                    <Radio.Group value={SwapTo.coin?._id} name='swapTo' buttonStyle='solid'>
                        {Balance.coin?.swap_with?.map(o => {
                            const swapTo = balances.find(_balance => _balance.coin._id === o)
                            return <Radio.Button
                            onClick={() =>
                                setSwapTo(swapTo)
                            }
                            key={swapTo._id}
                            value={swapTo.coin?._id}
                            >
                                {swapTo.coin.code}
                            </Radio.Button>
                        })}
                    </Radio.Group>
                </div>
                <div className="input-group">
                    <p>{checkLanguage({vi : 'Số lượng' , en : 'Amount'} , language)}</p>
                    <input
                    onChange={e => {
                        let target = e.target
                        let value = Number(target.value)
                        if(!value) {
                            value = 0
                            target.value = value
                        }
                        if(value) {
                            if(SwapTo._id){
                                const swapToValue = Balance.coin?.price / SwapTo.coin.price * value
                                target.parentElement.nextElementSibling.lastElementChild.value = swapToValue

                            }
                        }
                    }}
                    name="value" type="number" />
                </div>
                <div className="input-group">
                    <p>{checkLanguage({vi : 'Nhận được' , en : 'Receive'} , language)}</p>
                    <input disabled type="number" />
                </div>
                <button type="submit">Swap</button>
            </Form>
        </Modal>

        {
            balances && balances.map (balance => {
                return <div key={balance._id} className="item">
                    <div className="coin">
                        <div className="top-info">
                        <div className="coin-image-name">
                            <img src={`https://kdg-api.kingdomgame.co${balance.coin.icon.path}`} alt="coin"/>
                            <span className="name"> {balance.coin.code} </span>
                        </div>
                        <div className='balance'>
                            <p><span>Available: </span><span> {balance.balance} </span></p>
                            <p><span>Locked: </span><span>{balance.locked}</span></p>
                        </div>
                        </div>
                        <div className="button-group">
                        <div className="kdg-row kdg-column-4 list-button text-c va-m">
                            {
                                balance.coin.actions.map(o => <div key={o} className="item">
                                    <div 
                                    onClick={() => handleAct(o , balance)}
                                    className="button">
                                        <img alt="" src={listAct[o - 1].icon}/>
                                        <p>
                                            {checkLanguage(listAct[o - 1] , language)}
                                        </p>
                                    </div>
                                </div>)
                            }
                        </div>
                        </div>
                    </div>
                </div>
            })
        }

       </>
    )
}