import React, { useState, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { InputNumber, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { checkLanguage } from '../../helpers';
import callAPI from '../../axios';
import { actChangeLoading} from '../../store/action';
import renderDate from '../../helpers/renderDate';

const ITEM_PER_PAGE = 10

const RenderStatus = function ({id,status , language}) {
    const dispatch = useDispatch()
    const handleEndStaking = useCallback(async (type) => {
        dispatch(actChangeLoading(true))
        await callAPI.post('/end_staking' , {type , trans_id : id})
        dispatch(actChangeLoading(false))
        
        type === 1 && message.success(checkLanguage({vi : 'Gia hạn thành công' , en : 'Renew success' } , language))
        type === 2 && message.success(checkLanguage({vi : 'Kết thúc staking thành công' , en : 'End Success' } , language))

    },[language,id,dispatch])
    return (
        <>
        {
            status === 0 ? <td></td> :
            status === 1 ? <td className="green">{checkLanguage({vi : 'Đang nhận lãi', en : 'Progressing'}, language)}</td> :
            status === 4 ? <td className="red">{checkLanguage({vi : 'Kết thúc', en : 'Finished'}, language)}</td> :
            status === 2 ? <td className="red">{checkLanguage({vi : 'Chờ mở khóa', en : 'Waiting for unlock'}, language)}</td> :
            status === 3 ? <td>
                <button className="done" onClick={()=>handleEndStaking(1)}>{checkLanguage({vi : 'Gia hạn staking', en : 'Renewal'}, language)}</button> <br />
                <button className="cont" onClick={()=>handleEndStaking(2)}>{checkLanguage({vi : 'Kết thúc', en : 'Finished'}, language)}</button>
            </td> : null
        }
        </>
    )
}

export default function App({ ...prop }) {
    const coin = new URLSearchParams(useLocation().search).get('coin');
    const history = useHistory();
    const [Page, setPage] = useState(1)
    const [Total, setTotal] = useState(0)
    const [History, setHistory] = useState([])
    const language = useSelector(state => state.lang)
    const balance = useSelector(state => state.balances?.find(o=>o._id === coin))
    const handleGetStakingHistory = useCallback(async (balance,Page ) => {
        const res = await callAPI.get(`/transactions?type=4&coin=${balance.coin._id}&skip=${(Page - 1) * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`)
        setTotal(res.total)
        setHistory(res.data)
    },[])
    useMemo(() => {
        balance && handleGetStakingHistory(balance,Page)
    },[handleGetStakingHistory, Page, balance])
    
    return (
        <>
            <div className="staking-history">
                <div className="kdg-container">
                    <div className="block1">
                        <div
                        onClick={()=>history.goBack()}
                        className="back-button">
                            <span className="icon"><FontAwesomeIcon icon={faArrowLeft}/></span>
                            <span className="text"> {checkLanguage({vi : 'Trở về' , en : 'Back'}, language)} </span>
                        </div>
                    </div>

                    {/* <div className="date-picker">
                        <RangePicker 
                        placeholder={[
                            checkLanguage({vi : "Ngày bắt đầu", en : 'Start date'} , language),
                            checkLanguage({vi : "Ngày kết thúc", en : 'End date'} , language)
                        ]}
                        // onChange={handleChangeDatePicker}
                        />
                    </div> */}

                    <div className="history">
                        <table>
                            <thead>
                                <tr>
                                    <th className="head-title" colSpan="9">{checkLanguage({vi: 'LỊCH SỬ STAKING', en: 'MY STAKING RECORD'}, language)}</th>
                                </tr>
                                <tr>
                                    <th>{checkLanguage({vi: 'Ngày tạo staking', en: 'Create date'}, language)}</th>
                                    <th>{checkLanguage({vi: 'Thời gian bắt đầu trả lãi', en: 'Start date'}, language)}</th>
                                    <th>{checkLanguage({vi: 'Thời gian kết thúc trả lãi', en: 'End date'}, language)}</th>
                                    <th>{checkLanguage({vi: 'Thời gian mở khóa', en: 'Unlock date'}, language)}</th>
                                    <th>{checkLanguage({vi: 'Số tiền staking', en: 'Staking quantity'}, language)}</th>
                                    <th>{checkLanguage({vi: 'Lợi nhuận đã nhận', en: 'Profit receive'}, language)}</th>
                                    <th>{checkLanguage({vi: 'Trạng thái', en: 'Status'}, language)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {History.map(o => <tr>
                                    <td>{renderDate(o.create_date , 'dd/momo/yyyy')}</td>
                                    <td>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.start_after + 'd')}</td>
                                    <td>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.end_after + 'd')}</td>
                                    <td>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.unlock_after + 'd')}</td>
                                    <td>{ o.value}</td>
                                    <td>{ Math.floor(o.receive * 100) / 100}</td>
                                    <RenderStatus id={o._id} language={language} status={o.status}/>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <span onClick={() => {Page > 1 && setPage(Page - 1)}} className="arrow"><FontAwesomeIcon icon={faAngleLeft} /></span>
                            <InputNumber onPressEnter={e => {
                                setPage(Number(e.target.value))
                            }} value={Page} style={{ width: 60 }} />
                            <span onClick={() => {
                                Math.ceil(Total / ITEM_PER_PAGE) > Page && setPage(Page + 1)
                            }} className="arrow"><FontAwesomeIcon icon={faAngleRight} /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}