import { useCallback, useEffect, useMemo, useState } from "react";

import * as HiIcon from 'react-icons/hi';
import * as TiIcon from 'react-icons/ti';
import callAPI from "../../axios";

import { Popper1, RecommendVideo, Tab, Table, TabPane } from '../../components';
import { useLanguageLayerValue } from "../../context/LanguageLayer";
import { convertDate, convertDateAgo } from "../../helpers";
import useNumber from "../../hooks/useNumber";


export default function App() {
    const [{ language, profile }] = useLanguageLayerValue();

    const [isShowHistory, setIsShowHistory] = useState(true);

    const [History, setHistory] = useState([]);

    const [IsMoreHistory, setIsMoreHistory] = useState(true);

    const getHistory = useCallback(async () => {
        /**
         * type : 7 = mua gift , 8 = bán gifts , 9 = donate , 10 = nhận donate
         */
        const res = await callAPI.get(`/transactions?type=7,8,9,10&skip=${History.length}&limit=5`)
        setHistory([...History , ...res.data])
        if(res.data.length < 5) setIsMoreHistory(false)
    }, [History])

    const renderType = useCallback((type , {gift : {name} , gift_user : {kyc : {first_name , last_name} }}) => {
        if(type === 7) return profile[language].type7.replace('user_name' , `${first_name ? first_name : ''} ${last_name ? last_name : ''}`).replace('gift_name' ,(name ? name : 'gift'))
        if(type === 8) return profile[language].type8.replace('gift_name' , name)
        if(type === 9) return profile[language].type9.replace('user_name' , `${first_name ? first_name : ''} ${last_name ? last_name : ''}`)
        if(type === 10) return profile[language].type10.replace('user_name' , `${first_name ? first_name : ''} ${last_name ? last_name : ''}`)
    },[language, profile])

    const dataHead = useMemo(() => {
        return [
            {
                key : "create_date",
                name : profile[language].date,
                render : date => <span 
                onClick={e => {
                    const el = e.target
                    const current = el.getAttribute('data-current')
                    if(current === 'ago') {
                        el.setAttribute('data-current' , 'date')
                        el.innerText = el.getAttribute('data-date')
                    }else {
                        el.setAttribute('data-current' , 'ago')
                        el.innerText = el.getAttribute('data-ago')
                    }
                }}
                data-date={convertDate(date)} data-ago={convertDateAgo(date)} data-current="ago">{convertDateAgo(date)}</span>,
            },
            {
                key : "value",
                name : profile[language].amount,
                render : useNumber
            },
            {
                key : "type",
                name : profile[language].note,
                render : renderType
            },
        ]
    } , [language, profile,renderType] );
    useEffect(() => {
        callAPI.get(`/transactions?type=7,8,9,10&limit=5`)
            .then(res => {
                setHistory([...res.data])
                if(res.data.length < 5) setIsMoreHistory(false)
            })
    }, [])
    return (
        <>
            <div className='profile__boxManage'>
                <div
                    className={`profile__boxManage-title profile__historyTitle ${!isShowHistory ? 'mb-0' : ''
                        }`}
                    onClick={() => setIsShowHistory(!isShowHistory)}
                >
                    <span>History</span>
                    <TiIcon.TiArrowSortedDown className={`icon ${isShowHistory ? 'rotate' : ''}`} />
                </div>

                <div className={`profile__history ${isShowHistory ? 'show' : ''}`}>
                    <div style={{ overflowX: 'auto' }}>
                        <Table dataHead={dataHead} dataBody={History} />
                    </div>
                    {IsMoreHistory && <div
                        className='profile__link'
                        onClick={getHistory}
                    >
                        View More
                    </div>}
                </div>
            </div>

            {/* <div className='profile__boxManage'>
              <div className='profile__boxManage-title'>Manage Donate</div>
              <div
                className={`layoutFlex layout-8`}
                style={{ '--gap-column': '60px', '--gap-row': '30px' }}
              >
                {dataPackage.map((item, i) => (
                  <div
                    key={i}
                    className='layoutFlex-item profile__package'
                    onClick={e => {
                      e.stopPropagation();
                      setType('changes');
                      setPack(item);
                      setIsShow(true);
                    }}
                  >
                    <img src={item} alt='' className='profile__package-img' />
                  </div>
                ))}

                <div
                  className='layoutFlex-item profile__packageAdd'
                  onClick={e => {
                    e.stopPropagation();
                    setType('add');
                    setPack(null);
                    setIsShow(true);
                  }}
                >
                  <HiIcon.HiPlus className='icon' />
                </div>
              </div>
            </div> */}
        </>
    )
}