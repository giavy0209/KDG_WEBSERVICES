import { useCallback, useEffect, useMemo, useState } from 'react';
import * as TiIcon from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import callAPI from '../../axios';
import { Table } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertDate, convertDateAgo } from '../../helpers';
import useNumber from '../../hooks/useNumber';

export default function App() {
  const [{ language, profile }] = useLanguageLayerValue();

  const [isShowHistory, setIsShowHistory] = useState(true);
  const GiftStorage = useSelector(state => state.giftStorage);

  const [History, setHistory] = useState([]);

  const [IsMoreHistory, setIsMoreHistory] = useState(true);
  const [HistoryActive, setHistoryActive] = useState(8);

  const getHistory = useCallback(async () => {
    /**
     * type : 7 = mua gift , 8 = bán gifts , 9 = donate , 10 = nhận donate
     */
    const res = await callAPI.get(`/transactions?type=${HistoryActive}&skip=${History.length}&limit=5`);
    setHistory([...History, ...res.data]);
    if (res.data.length < 5) setIsMoreHistory(false);
  }, [History, HistoryActive]);

  const renderType = useCallback(
    (type, { gift: { name }, gift_user }) => {
      const { kyc } = gift_user || {};
      const { first_name, last_name } = kyc || {};
      if (type === 7)
        return profile[language].type7
          .replace('user_name', `${first_name ? first_name : ''} ${last_name ? last_name : ''}`)
          .replace('gift_name', name ? name : 'gift');
      if (type === 8) return profile[language].type8.replace('gift_name', name);
      if (type === 9)
        return profile[language].type9.replace(
          'user_name',
          `${first_name ? first_name : ''} ${last_name ? last_name : ''}`
        );
      if (type === 10)
        return profile[language].type10.replace(
          'user_name',
          `${first_name ? first_name : ''} ${last_name ? last_name : ''}`
        );
    },
    [language, profile]
  );

  const historyHead = useMemo(() => {
    return [
      {
        key: 'create_date',
        name: profile[language].date,
        render: date => (
          <span
            style={{ cursor: 'pointer' }}
            onClick={e => {
              const el = e.target;
              const current = el.getAttribute('data-current');
              if (current === 'ago') {
                el.setAttribute('data-current', 'date');
                el.innerText = el.getAttribute('data-date');
              } else {
                el.setAttribute('data-current', 'ago');
                el.innerText = el.getAttribute('data-ago');
              }
            }}
            data-date={convertDate(date)}
            data-ago={convertDateAgo(date)}
            data-current='ago'
          >
            {convertDateAgo(date)}
          </span>
        ),
      },
      {
        key: 'gift',
        name: profile[language].gift,
        render: gift => gift.name,
      },
      {
        key: 'value',
        name: profile[language].amount,
        render: value => Math.round(value * 1000) / 1000,
      },
    ];
  }, [language, profile, renderType]);

  const handleSellGift = useCallback(async (e) => {
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.target);
    const submitData = {}
    for (const iterator of data.entries()) {
      submitData[iterator[0]] = iterator[1];
    }
    await callAPI.post('/sell_gift', submitData);
    toast('Đã bán thành công');
  }, []);

  const storageHead = useMemo(() => {
    return [
      {
        key: 'gift',
        name: profile[language].gift,
        width: '30%',
        render: gift => <img src={gift.img} alt='' />,
      },
      {
        key: 'quantity',
        name: profile[language].quantity,
      },
      {
        key: 'gift',
        name: profile[language].action,
        width: '30%',
        render: (gift, obj) => (
          <>
              <input onBlur={e => {
                const value = Number(e.target.value)
                if(value > obj.quantity ) e.target.value = obj.quantity 
                if(value <= 0) e.target.value = 1
              }} type="number" name="quantity" placeholder="Enter quantity gift"/>
              <button style={{color : "#e41a7f" , backgroundColor : 'transparent', marginLeft : '10px' , cursor : 'pointer'}} 
              onClick={e => {
                e.target.previousElementSibling.value = obj.quantity
              }}
              >All</button>
          </>
        ),
      },
    ];
  }, [language, profile, handleSellGift]);

  useEffect(() => {
    callAPI.get(`/transactions?type=${HistoryActive}&limit=5`).then(res => {
      setHistory([...res.data]);
      if (res.data.length < 5) setIsMoreHistory(false);
    });
  }, [HistoryActive]);

  // const [isShow, setIsShow] = useState(false);
  // const [type, setType] = useState('changes');
  // const [pack, setPack] = useState(null);

  return (
    <>
      {/* {isShow && <Popper1 type={type} pack={pack} />} */}

      <div className='profile__boxManage'>
        <div
          className={`profile__boxManage-title profile__historyTitle ${!isShowHistory ? 'mb-0' : ''
            }`}
          onClick={() => setIsShowHistory(!isShowHistory)}
        >
          <span>Storage</span>
          <TiIcon.TiArrowSortedDown className={`icon ${isShowHistory ? 'rotate' : ''}`} />
        </div>

        <div className={`profile__history ${isShowHistory ? 'show' : ''}`}>
          <div style={{ overflowX: 'auto' }}>
            <Table dataHead={storageHead} dataBody={GiftStorage || []} />
          </div>
        </div>
      </div>

      <div className='profile__boxManage'>
        <div
          className={`profile__boxManage-title profile__historyTitle ${!isShowHistory ? 'mb-0' : ''
            }`}
          onClick={() => setIsShowHistory(!isShowHistory)}
        >
          <span>Transaction History</span>
          <TiIcon.TiArrowSortedDown className={`icon ${isShowHistory ? 'rotate' : ''}`} />
        </div>

        <div className="profile__boxManage-tabs">
          <div className="item">
            <div onClick={() => setHistoryActive(8)} className={`tab ${HistoryActive === 8 ? 'active' : ''}`}>Trading History</div>
          </div>
          <div className="item">
            <div onClick={() => setHistoryActive(7)} className={`tab ${HistoryActive === 7 ? 'active' : ''}`}>Gift History</div>
          </div>
        </div>

        <div className={`profile__history ${isShowHistory ? 'show' : ''}`}>
          <div style={{ overflowX: 'auto' }}>
            <Table dataHead={historyHead} dataBody={History} />
          </div>
          {IsMoreHistory && (
            <div className='profile__link' onClick={getHistory}>
              View More
            </div>
          )}
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
  );
}
