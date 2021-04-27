import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import depositIcon from '../../assets/images/deposit.svg';
import tradeIcon from '../../assets/images/trade.svg';
import callAPI from '../../axios';
import { AssetBox, PopupBox, QR, Table } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertDate, convertDateAgo } from '../../helpers';

export default function Asset() {
  const [{ language, profile }] = useLanguageLayerValue();

  const GiftStorage = useSelector(state => state.giftStorage);

  const [History, setHistory] = useState([]);

  const [IsMoreHistory, setIsMoreHistory] = useState(true);
  const [HistoryActive, setHistoryActive] = useState(8);

  const getHistory = useCallback(async () => {
    /**
     * type : 7 = mua gift , 8 = bán gifts , 9 = donate , 10 = nhận donate
     */
    const res = await callAPI.get(
      `/transactions?type=${HistoryActive}&skip=${History.length}&limit=5`
    );
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

  const handleSellGift = useCallback(async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const submitData = {};
    for (const iterator of data.entries()) {
      submitData[iterator[0]] = iterator[1];
    }
    console.log(submitData);
    await callAPI.post('/sell_gift',submitData);
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
          <form onSubmit={handleSellGift} action="">
            <input name="gift" type="text" style={{display : 'none'}} defaultValue={gift._id}/>
            <input
              onBlur={e => {
                const value = Number(e.target.value);
                if (value > obj.quantity) e.target.value = obj.quantity;
                if (value <= 0) e.target.value = 1;
              }}
              type='number'
              name='quantity'
              placeholder='Enter quantity gift'
            />
            <button type="submit">Sell</button>
            <button
              type="button"
              style={{
                color: '#e41a7f',
                backgroundColor: 'transparent',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
              onClick={e => {
                e.target.previousElementSibling.value = obj.quantity;
              }}
            >
              All
            </button>
          </form>
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

  const balanceKDG = useSelector(state => state.balanceKDG);
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <>
      {/* {isShow && <Popper1 type={type} pack={pack} />} */}

      {showDeposit && (
        <PopupBox onCancel={setShowDeposit}>
          <QR onCancel={setShowDeposit} />
        </PopupBox>
      )}

      <AssetBox title='Balance'>
        <div className='profile__balance'>
          <div className='profile__balance-balance mr-30'>
            <span>{balanceKDG}</span>
            <span>KDG</span>
          </div>

          <div className='profile__balance-deposit mr-30' onClick={() => setShowDeposit(true)}>
            <img src={depositIcon} alt='icon' />
            <span>Deposit</span>
          </div>

          <div
            className='profile__balance-trade'
            onClick={() => window.open('https://www.mxc.com/trade/easy#KDG_USDT', '_blank')}
          >
            <img src={tradeIcon} alt='icon' />
            <span>Trade</span>
          </div>
        </div>
      </AssetBox>

      <AssetBox title='Storage'>
        <div className='profile__table pt-20 pb-20 pl-30 pr-30'>
          <Table dataHead={storageHead} dataBody={GiftStorage || []} />
        </div>
      </AssetBox>

      <AssetBox title='Transaction History'>
        <div className='pt-20 pb-20 pl-30 pr-30'>
          <div className='profile__tabs'>
            <div
              onClick={() => setHistoryActive(8)}
              className={`profile__tabs-tab ${HistoryActive === 8 ? 'active' : ''}`}
            >
              Swap History
            </div>

            <div
              onClick={() => setHistoryActive(7)}
              className={`profile__tabs-tab ${HistoryActive === 7 ? 'active' : ''}`}
            >
              Gift History
            </div>
          </div>

          <div className='profile__table mt-30'>
            <Table dataHead={historyHead} dataBody={History} />
          </div>

          {IsMoreHistory && (
            <div className='profile__link' onClick={getHistory}>
              View More
            </div>
          )}
        </div>
      </AssetBox>

      {/* <AssetBox title='Package Donate'>
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
      </AssetBox> */}
    </>
  );
}
