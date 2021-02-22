import React, { useCallback,  useMemo, useState } from 'react';
import ListChart from './ListChart'
import ListCoin from './ListCoin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { InputNumber } from 'antd';
import '../../assets/css/wallet.scss'
import nodata from '../../assets/img/nodata.png'
import { checkLanguage } from '../../helpers';
import callAPI from '../../axios';

const ITEM_PER_PAGE = 10

function App() {
    const [Page, setPage] = useState(1)
    const [History, setHistory] = useState([])
    const [Total, setTotal] = useState(0)
    const language = useSelector(state => state.lang)
    const user = useSelector(state => state.user)

    const handleGetHistory = useCallback(async page => {
        const res = await callAPI.get(`/transactions?skip=${(page - 1) * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}&type=1,2,3,4,5,6`)
        setHistory(res.data)
        setTotal(res.total)
    },[])

    useMemo(() => {
        handleGetHistory(Page)
    },[Page, handleGetHistory])
    return (
        <>

            <main>
                <div className="kdg-container">
                    <section className="section-prices">
                        <h2 className="title"> {checkLanguage({ vi: 'Giá thị trường', en: 'MARKET' }, language)}</h2>
                        <div className="kdg-row kdg-column-4 list-price">
                            <ListChart />
                        </div>
                    </section>
                    <section className="section-wallet">
                        <h2 className="title">{checkLanguage({ vi: 'thông tin số dư', en: 'BALANCE INFORMATION' }, language)}</h2>
                        <div className="kdg-row kdg-column-2 list-coin">
                            <ListCoin />
                        </div>
                    </section>

                    <section className="section-history">
                        <h2 className="title">{checkLanguage({ vi: 'LỊCH SỬ GIAO DỊCH', en: 'HISTORY' }, language)}</h2>
                        {/* <div className="list-tab">
                            <div onClick={() => {
                                setType('2')
                                setPage(1)
                            }} className={`tab ${Type === '2' && 'active'}`}>
                                <p> {checkLanguage({ vi: 'Tất cả', en: 'All' }, language)} </p>
                            </div>
                        </div> */}

                        <div className="history">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>{checkLanguage({ vi: 'Thời gian', en: 'Date' }, language)}</th>
                                        <th>{checkLanguage({ vi: 'Số lượng', en: 'Volume' }, language)}</th>
                                        <th>Token</th>
                                        <th>{checkLanguage({ vi: 'Kiểu', en: 'Type' }, language)}</th>
                                    </tr>

                                    {
                                        (History && History.length > 0) ? History.map(({ create_date, type, value, coin , from }) => {
                                            create_date = new Date(create_date)
                                            return (
                                                <tr>
                                                    <td className="date-time">
                                                        <span className="date"> {create_date.getDate()} /{create_date.getMonth() + 1}/{create_date.getFullYear()}</span>
                                                        <span className="time">{create_date.getHours()}:{create_date.getMinutes()}:{create_date.getSeconds()}</span>
                                                    </td>
                                                    <td className={`quantity ${from?._id === user?._id ? 'red' : 'green'}`} >
                                                        {value}
                                                    </td>
                                                    <td>{coin.code}</td>
                                                    <td>
                                                    {
                                                        type === 1 ? checkLanguage({
                                                            vi : "Nạp",
                                                            en: "Deposit"
                                                        },language) :
                                                        type === 2 ? checkLanguage({
                                                            vi : "Rút",
                                                            en: "Withdrawal"
                                                        },language) :
                                                        type === 3 ? checkLanguage({
                                                            vi : "Swap",
                                                            en: "Swap"
                                                        },language) :
                                                        type === 4 ? checkLanguage({
                                                            vi : "Stake",
                                                            en: "Stake"
                                                        },language) :
                                                        type === 5 ? checkLanguage({
                                                            vi : 'Nhận tiền staking',
                                                            en : 'Receive stake',
                                                        },language) :
                                                        type === 6 ? checkLanguage({
                                                            vi : 'Nhận lãi staking',
                                                            en : 'Receive profit from stake',
                                                        },language) :
                                                        null
                                                    }
                                                    </td>
                                                </tr>
                                            )
                                        }) :
                                        <tr>
                                            <td colSpan="5">
                                                <img src={nodata} alt="" /> <br></br>
                                                {checkLanguage({ vi: 'Không có dữ liệu', en: 'No data' }, language)}
                                            </td>
                                        </tr>
                                    }

                                </tbody>
                            </table>

                        </div>
                        <div className="pagination">
                            <span onClick={() => {Page > 1 && setPage(Page - 1)}} className="arrow"><FontAwesomeIcon icon={faAngleLeft} /></span>
                            <InputNumber onPressEnter={e => {
                                setPage(Number(e.target.value))
                            }} value={Page} style={{ width: 60 }} />
                            <span onClick={() => {
                                Math.ceil(Total / ITEM_PER_PAGE) > Page && setPage(Page + 1)
                            }} className="arrow"><FontAwesomeIcon icon={faAngleRight} /></span>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}

export default App;
