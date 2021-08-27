import { useWeb3React } from '@web3-react/core'
import Avatar from 'components/Avatar'
import { Decimal } from 'decimal.js'
import shortAddress from 'helpers/shortAddress'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import banner from '../../assets/images/nft-market/banner.jpg'
import '../../assets/scss/nft-market.scss'

import closeSVG from '../../assets/svg/close1.svg'
import rank1 from '../../assets/svg/rank1.svg'
import rank2 from '../../assets/svg/rank2.svg'
import rank3 from '../../assets/svg/rank3.svg'
import titleSVG from '../../assets/svg/title.svg'
import avatarBackSVG from '../../assets/svg/avatarBack.svg'
import kdgSVG from '../../assets/svg/kdg.svg'
import callAPI from '../../axios'
import { useContractERC20, useContractMarket } from '../../components/ConnectWalletButton/contract'

import { paymentList } from '../../contracts/ERC20'
import { addressMarket } from '../../contracts/Market'

export default function NFT() {
  const history = useHistory()
  const { account } = useWeb3React()

  const [PopulateList, setPopulateList] = useState([])
  const [top9List, setTop9List] = useState([])

  const [itemBuy, setItemBuy] = useState({})
  const [isApproval, setIsApproval] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [amountBuy, setAmountBuy] = useState(0)
  const [price, setPrice] = useState(0)

  const [topRevenue, setRevenue] = useState([])
  const [topQuantity, setTopQuantity] = useState([])
  console.log({ PopulateList })

  const [ActiveTop9, setActiveTop9] = useState(0)
  const [ActiveRanking, setActiveRanking] = useState(0)
  const isLoadMore = useRef(true)
  const isLoadingAPI = useRef(false)
  const [isOpenBuy, setIsOpenBuy] = useState(false)
  const contractERC20 = useContractERC20()
  const contractMarket = useContractMarket()

  const total = useMemo(() => {
    if (itemBuy?.type === 1 && amountBuy && itemBuy?.price) {
      return new Decimal(amountBuy).mul(itemBuy?.price).div(new Decimal(10).pow(18)).toNumber()
    }
    if (itemBuy?.type === 2 && amountBuy && price) {
      return new Decimal(amountBuy).mul(price).toNumber()
    }
  }, [amountBuy, itemBuy, price])

  const getAssets = useCallback(async () => {
    var ids = PopulateList.map((o) => o._id)

    const res = await callAPI.get(
      `/market/get-top-populate?limit=9&${ids.length ? `ids=${ids}` : ''}`,
      true
    )
    if (res?.data?.length === 0) {
      isLoadMore.current = false
      setPopulateList([...PopulateList])
      return
    }
    setPopulateList([...PopulateList, ...(res?.data ? res.data : [])])
  }, [PopulateList])

  const getTop9 = useCallback(async () => {
    const res = await callAPI.get(`/market/get-top-assets?limit=9`, true)

    if (res?.data?.length === 0) {
      return
    }
    setTop9List([...(res?.data ? res.data : [])])
  }, [])

  useEffect(() => {
    const handleLoad = async () => {
      const totalHeight = document.getElementById('root').clientHeight
      const scrolledHeight = window.scrollY + window.innerHeight
      const restHeight = totalHeight - scrolledHeight
      const isEnd = restHeight <= 500

      if (isEnd && isLoadMore.current && !isLoadingAPI.current) {
        isLoadingAPI.current = true
        await getAssets()
        isLoadingAPI.current = false
      }
    }
    window.addEventListener('scroll', handleLoad)
    return () => {
      window.removeEventListener('scroll', handleLoad)
    }
  }, [getAssets])

  useEffect(() => {
    ;(async () => {
      const res = await callAPI.get(`/market/get-top-assets?limit=9`, true)
      if (res?.data?.length) {
        setTop9List(res.data)
      }
      const res2 = await callAPI.get(`/market/get-top-populate?limit=10`, true)
      if (res2?.data?.length) {
        setPopulateList(res2.data)
      }
      const res3 = await callAPI.get(`/top-sellers-quantity?limit=6`, true)
      if (res3?.data?.length) {
        setTopQuantity(res3.data)
      }
      const res4 = await callAPI.get(`/top-sellers-revenue?limit=6`, true)
      if (res4?.data?.length) {
        setRevenue(res4.data)
      }
    })()
  }, [account])

  const handleBuy = async (e) => {
    e.preventDefault()
    if (!account) return
    const listId = e.target._listid.value
    const type = Number(e.target._type.value)
    const amount = new Decimal(e.target._amount.value).toHex()
    const token = paymentList[e.target._paymentToken.value]
    const paymentToken = token.address
    const netTotalPayment = new Decimal(total).mul(new Decimal(10).pow(token.decimal)).toHex()
    if (type === 1) {
      contractMarket.buy(listId, amount, paymentToken, netTotalPayment).then((result) => {
        if (result) {
          top9List.length = 0
          PopulateList.length = 0
          getTop9()
          getAssets()
          setIsOpenBuy(false)
        }
      })
    } else {
      const netPaymentPrice = new Decimal(price).mul(new Decimal(10).pow(token.decimal)).toHex()
      contractMarket
        .bid(listId, amount, paymentToken, netPaymentPrice, 100000000)
        .then((result) => {
          if (result) {
            top9List.length = 0
            PopulateList.length = 0
            getTop9()
            getAssets()
            setIsOpenBuy(false)
          }
        })
    }
  }

  const handleApproval = async () => {
    if (!account) return
    contractERC20
      .approve(addressMarket, '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      .then((result) => {
        if (result) {
          top9List.length = 0
          PopulateList.length = 0
          getTop9()
          getAssets()
          setIsOpenBuy(false)
        }
      })
  }

  const handleDelist = async (item) => {
    if (!account) return
    contractMarket.cancelListed(item).then((result) => {
      top9List.length = 0
      PopulateList.length = 0
      getTop9()
      getAssets()
      setIsOpenBuy(false)
    })
  }

  const checkApproval = useCallback(
    async (item) => {
      if (!account) return

      const allowance = await contractERC20.allowance(account, addressMarket)
      if (allowance && item) {
        if (new Decimal(allowance.toString()).gt(new Decimal(item.price).mul(item?.quantity))) {
          setIsApproval(true)
        }
      }
      if (account?.toLowerCase() === item?.owner?.address) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    },
    [account, contractERC20]
  )

  const handleChangeAmount = (event) => {
    let { value, min, max } = event.target
    value = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setAmountBuy(value)
  }

  const handleChangePrice = (event) => {
    let { value, min, max } = event.target
    value = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setPrice(value)
  }

  const handleShowDetailTop9 = async () => {
    var ids = top9List.map((o) => o?._id)
    history.push(`/nft-detail?ids=${ids}&index=${ActiveTop9}`)
  }
  const handleShowDetailPopulate = async (index) => {
    var ids = PopulateList.map((o) => o?._id)
    history.push(`/nft-detail?ids=${ids}&index=${index}`)
  }

  const handleMouseOverNFT = useCallback((e) => {
    let target = e.target
    while (true) {
      const targetClassList = Array.from(target.classList)
      if (targetClassList.includes('mid') || targetClassList.includes('blur')) {
        break
      }
      target = target.parentElement
    }
    target.classList.add('active-video')
    const video = target.querySelector('video')
    if (video) {
      video.play()
    }
  }, [])

  const handleMouseOutNFT = useCallback((e) => {
    let target = e.target
    while (true) {
      const targetClassList = Array.from(target.classList)
      if (targetClassList.includes('mid') || targetClassList.includes('blur')) {
        break
      }
      target = target.parentElement
    }
    target.classList.remove('active-video')
    const video = target.querySelector('video')
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }, [])

  return (
    <>
      {isOpenBuy && (
        <div className='popupX ' onClick={() => setIsOpenBuy(false)}>
          <form
            onSubmit={handleBuy}
            style={{ padding: 20, width: 615 }}
            className='containerX scroll-style'
            onClick={(e) => e.stopPropagation()}
          >
            <img className='closeX' src={closeSVG} alt='' onClick={() => setIsOpenBuy(false)} />
            {itemBuy?.type === 1 && <div className='titleX1'>Checkout</div>}
            {itemBuy?.type === 2 && <div className='titleX1'>Bidding</div>}

            <div className='flex27'>
              <div className='img11895'>
                <img src={itemBuy?.asset?.metadata?.image} alt='' />
              </div>

              <div>
                <p>{itemBuy?.asset?.metadata?.name}</p>

                <p>
                  Available: <span>{itemBuy?.quantity}</span>
                </p>

                {paymentList.map((token, index) => {
                  if (token.address === top9List[ActiveTop9]?.payment_token) {
                    const _price = new Decimal(top9List[ActiveTop9]?.price).div(
                      new Decimal(10).pow(token.decimal)
                    )

                    return <p key={index}>{`${_price} ${token.coin}`}</p>
                  }

                  return <p key={index}>No Price</p>
                })}
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div className='flex_column'>
                <label>Quantity</label>
                <div className='input_boundingbox'>
                  <input type='hidden' id='_listid' name='_listid' value={itemBuy?.id} />
                  <input type='hidden' id='_type' name='_type' value={itemBuy?.type} />
                  <input
                    type='number'
                    id='_amount'
                    name='_amount'
                    min='1'
                    step='1'
                    max={itemBuy?.quantity}
                    value={amountBuy}
                    onChange={(e) => handleChangeAmount(e)}
                  />
                  <span
                    className='increment'
                    onClick={() => {
                      if (amountBuy >= itemBuy?.quantity) return
                      setAmountBuy(amountBuy + 1)
                    }}
                  ></span>
                  <span
                    className='decrement'
                    onClick={() => {
                      if (amountBuy <= 1) return
                      setAmountBuy(amountBuy - 1)
                    }}
                  ></span>
                </div>
              </div>

              {itemBuy?.type === 2 && (
                <div className='flex_column'>
                  <label className='label'>Price</label>
                  <div className='input_boundingbox'>
                    <input
                      type='number'
                      id='_price'
                      name='_price'
                      min={new Decimal(itemBuy.price).div(new Decimal(10).pow(18)).toNumber()}
                      max='100000'
                      readOnly={itemBuy.type === 1}
                      value={price}
                      onChange={(e) => handleChangePrice(e)}
                    />
                    <span
                      className='increment'
                      onClick={() => {
                        if (price >= 100000) return
                        setPrice(price + 1)
                      }}
                    ></span>
                    <span
                      className='decrement'
                      onClick={() => {
                        if (
                          price <=
                          new Decimal(itemBuy.price).div(new Decimal(10).pow(18)).toNumber()
                        )
                          return
                        setPrice(price - 1)
                      }}
                    ></span>
                  </div>
                </div>
              )}

              <div className='flex_column'>
                <label className='label'>Payment Token</label>
                <div className='box'>
                  <select name='_paymentToken'>
                    {paymentList.map((pm, i) => (
                      <option key={i} value={i}>
                        {pm.coin}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='extra_row'>
              <p>
                Estimated Amount:
                <strong>{total} KDG </strong>
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {isOwner && (
                <button className='buttonX' onClick={() => handleDelist(itemBuy.id)}>
                  Delisting
                </button>
              )}

              {!isOwner && itemBuy?.type === 1 && isApproval && (
                <button type='submit' className='buttonX'>
                  Buy
                </button>
              )}

              {!isOwner && itemBuy?.type === 2 && isApproval && (
                <button type='submit' className='buttonX'>
                  Bid orders
                </button>
              )}

              {!isOwner && !isApproval && (
                <>
                  <button className='buttonX mr-20' onClick={handleApproval}>
                    Approval
                  </button>
                  <button className='buttonX buttonX--cancel' onClick={() => setIsOpenBuy(false)}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      )}

      <div className='nft-market'>
        <div className='banner'>
          <img src={banner} alt='' />
        </div>

        <div className='container'>
          <div className='top-9'>
            <p className='sub-title'>Buy, sell, bidding and discover artworks</p>
            <p className='title'>The 1st & The Best NFT Marketplace</p>

            {account && (
              <div className='create' onClick={() => history.push('/mint-nft')}>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z'
                    fill='#F52871'
                  />
                  <path
                    d='M12.1117 7.17614V8.60015H8.92775V11.9441H7.43975V8.60015H4.23975V7.17614H7.43975V3.84814H8.92775V7.17614H12.1117Z'
                    fill='#F52871'
                  />
                </svg>
                Create New NFT
              </div>
            )}

            <div className='list'>
              <div className='left'>
                {top9List.map((o, index) => (
                  <span
                    key={o._id}
                    onClick={() => setActiveTop9(index)}
                    className={`item ${ActiveTop9 === index ? 'active' : ''}`}
                  >
                    <img src={o.asset?.metadata?.image} alt='' />
                  </span>
                ))}
              </div>

              <div className='mid' onMouseOver={handleMouseOverNFT} onMouseOut={handleMouseOutNFT}>
                {top9List[ActiveTop9]?.asset?.metadata?.mimetype.startsWith('image') && (
                  <div className='img'>
                    <img src={top9List[ActiveTop9]?.asset?.metadata?.image} alt='' />
                  </div>
                )}
                {top9List[ActiveTop9]?.asset?.metadata?.mimetype.startsWith('video/mp4') && (
                  <div className='video'>
                    <img src={top9List[ActiveTop9]?.asset?.metadata?.image} alt='' />
                    <video
                      muted
                      autoPlay
                      src={top9List[ActiveTop9]?.asset?.metadata?.animation_url}
                    />
                  </div>
                )}
              </div>

              <div className='right'>
                <div className='name'>{top9List[ActiveTop9]?.asset?.metadata?.name}</div>

                {paymentList.map((token, index) => {
                  if (token.address === top9List[ActiveTop9]?.payment_token) {
                    const _price = new Decimal(top9List[ActiveTop9]?.price).div(
                      new Decimal(10).pow(token.decimal)
                    )

                    return <div key={index} className='price'>{`${_price} ${token.coin}`}</div>
                  }

                  return (
                    <div key={index} className='price'>
                      No Price
                    </div>
                  )
                })}

                <div className='info'>
                  <div className='row'>
                    Artist:
                    {(top9List[ActiveTop9]?.owner?.kyc?.first_name ||
                      top9List[ActiveTop9]?.owner?.kyc?.last_name) && (
                      <span>
                        {` ${top9List[ActiveTop9]?.owner?.kyc?.first_name} ${top9List[ActiveTop9]?.owner?.kyc?.last_name}`}
                      </span>
                    )}
                    {!(
                      top9List[ActiveTop9]?.owner?.kyc?.first_name ||
                      top9List[ActiveTop9]?.owner?.kyc?.last_name
                    ) && <span>{` ${shortAddress(top9List[ActiveTop9]?.owner?.address)}`}</span>}
                  </div>

                  <div className='row'>
                    Created:
                    <span>{` ${new Date(top9List[ActiveTop9]?.asset?.time).toDateString()}`}</span>
                  </div>

                  <div className='row'>
                    Available:
                    <span>{` ${top9List[ActiveTop9]?.quantity}`}</span>
                  </div>
                </div>

                <div className='open_detail_btn' onClick={() => handleShowDetailTop9()}>
                  Detail &gt;&gt;
                </div>

                {account && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 45,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    className='btn'
                    onClick={async () => {
                      const _price = new Decimal(top9List[ActiveTop9]?.price)
                        .div(new Decimal(10).pow(18))
                        .toNumber()

                      setPrice(_price)
                      setAmountBuy(0)
                      setIsOpenBuy(true)
                      setItemBuy(top9List[ActiveTop9])
                      checkApproval(top9List[ActiveTop9])
                    }}
                  >
                    Buy Now
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='ranking'>
            <div className='titleY'>
              <span>Ranking</span>
              <img src={titleSVG} alt='' />
            </div>

            <div className='tabs'>
              <div
                onClick={() => setActiveRanking(0)}
                className={`tab ${ActiveRanking === 0 ? 'active' : ''}`}
              >
                Top Seller (Quantity)
              </div>
              <div
                onClick={() => setActiveRanking(1)}
                className={`tab ${ActiveRanking === 1 ? 'active' : ''}`}
              >
                Top Seller (Revenue)
              </div>
            </div>

            <div className='list'>
              <div className={`top-quatity ${ActiveRanking === 0 ? 'show' : ''}`}>
                <div>
                  {topQuantity.length !== 0 &&
                    topQuantity
                      .filter((o, i) => i <= 2)
                      .map((o, i) => (
                        <div
                          key={o._id}
                          className='item'
                          onClick={() => history.push(`/user?uid=${o.user?._id}`)}
                        >
                          <div className='index'>{`0${i + 1}`}</div>
                          <Avatar
                            style={{ width: 65 }}
                            image={o.user?.kyc?.avatar?.path ? o.user?.kyc?.avatar?.path : null}
                            pos={o.user?.kyc?.avatar_pos}
                          />
                          <div className='info'>
                            <div className='name'>
                              {o.user?.kyc?.first_name || o.user?.kyc?.last_name
                                ? `${o.user?.kyc?.first_name} ${o.user?.kyc?.last_name}`.trim()
                                : shortAddress(o.user?.address)}
                            </div>
                            <div className='amount'>{o.quantity} Artworks</div>
                          </div>
                          {i === 0 && <img className='rank' src={rank1} alt='' />}
                          {i === 1 && <img className='rank' src={rank2} alt='' />}
                          {i === 2 && <img className='rank' src={rank3} alt='' />}
                        </div>
                      ))}
                </div>

                <div>
                  <div>
                    {topQuantity.length !== 0 &&
                      topQuantity
                        .filter((o, i) => i >= 3 && i <= 5)
                        .map((o, i) => (
                          <div
                            key={o._id}
                            className='item'
                            onClick={() => history.push(`/user?uid=${o.user?._id}`)}
                          >
                            <div className='index'>{`0${i + 4}`}</div>
                            <Avatar
                              style={{ width: 65 }}
                              image={o.user?.kyc?.avatar?.path ? o.user?.kyc?.avatar?.path : null}
                              pos={o.user?.kyc?.avatar_pos}
                            />
                            <div className='info'>
                              <div className='name'>
                                {o.user?.kyc?.first_name || o.user?.kyc?.last_name
                                  ? `${o.user?.kyc?.first_name} ${o.user?.kyc?.last_name}`.trim()
                                  : shortAddress(o.user?.address)}
                              </div>
                              <div className='amount'>{o.quantity} Artworks</div>
                            </div>
                          </div>
                        ))}
                  </div>

                  <div>
                    {topQuantity.length !== 0 &&
                      topQuantity
                        .filter((o, i) => i >= 6 && i <= 8)
                        .map((o, i) => (
                          <div
                            key={o._id}
                            className='item'
                            onClick={() => history.push(`/user?uid=${o.user?._id}`)}
                          >
                            <div className='index'>{`0${i + 7}`}</div>
                            <Avatar
                              style={{ width: 65 }}
                              image={o.user?.kyc?.avatar?.path ? o.user?.kyc?.avatar?.path : null}
                              pos={o.user?.kyc?.avatar_pos}
                            />
                            <div className='info'>
                              <div className='name'>
                                {o.user?.kyc?.first_name || o.user?.kyc?.last_name
                                  ? `${o.user?.kyc?.first_name} ${o.user?.kyc?.last_name}`.trim()
                                  : shortAddress(o.user?.address)}
                              </div>
                              <div className='amount'>{o.quantity} Artworks</div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>

              <div className={`top-seller ${ActiveRanking === 1 ? 'show' : ''}`}>
                <div>
                  {topRevenue.length !== 0 &&
                    topRevenue
                      .filter((o, i) => i <= 2)
                      .map((o, i) => {
                        const _price = new Decimal(o?.payment_amount)
                          .div(new Decimal(10).pow(18))
                          .toString()

                        return (
                          <div
                            key={o._id}
                            className='item'
                            onClick={() => history.push(`/user?uid=${o.user?._id}`)}
                          >
                            <div className='index'>{`0${i + 1}`}</div>
                            <Avatar
                              style={{ width: 65 }}
                              image={o.user?.kyc?.avatar?.path ? o.user?.kyc?.avatar?.path : null}
                              pos={o.user?.kyc?.avatar_pos}
                            />
                            <div className='info'>
                              <div className='name'>
                                {o.user?.kyc?.first_name || o.user?.kyc?.last_name
                                  ? `${o.user?.kyc?.first_name} ${o.user?.kyc?.last_name}`.trim()
                                  : shortAddress(o.user?.address)}
                              </div>
                              <div className='amount'>{_price} KGD</div>
                            </div>
                            {i === 0 && <img className='rank' src={rank1} alt='' />}
                            {i === 1 && <img className='rank' src={rank2} alt='' />}
                            {i === 2 && <img className='rank' src={rank3} alt='' />}
                          </div>
                        )
                      })}
                </div>

                <div>
                  <div>
                    {topRevenue.length !== 0 &&
                      topRevenue
                        .filter((o, i) => i >= 3 && i <= 5)
                        .map((o, i) => {
                          const _price = new Decimal(o?.payment_amount)
                            .div(new Decimal(10).pow(18))
                            .toString()

                          return (
                            <div
                              key={o._id}
                              className='item'
                              onClick={() => history.push(`/user?uid=${o.user?._id}`)}
                            >
                              <div className='index'>{`0${i + 4}`}</div>
                              <Avatar
                                style={{ width: 65 }}
                                image={o.user?.kyc?.avatar?.path ? o.user?.kyc?.avatar?.path : null}
                                pos={o.user?.kyc?.avatar_pos}
                              />
                              <div className='info'>
                                <div className='name'>
                                  {o.user?.kyc?.first_name || o.user?.kyc?.last_name
                                    ? `${o.user?.kyc?.first_name} ${o.user?.kyc?.last_name}`.trim()
                                    : shortAddress(o.user?.address)}
                                </div>
                                <div className='amount'>{_price} KGD</div>
                              </div>
                            </div>
                          )
                        })}
                  </div>

                  <div>
                    {topRevenue.length !== 0 &&
                      topRevenue
                        .filter((o, i) => i >= 6 && i <= 8)
                        .map((o, i) => {
                          const _price = new Decimal(o?.payment_amount)
                            .div(new Decimal(10).pow(18))
                            .toString()

                          return (
                            <div
                              key={o._id}
                              className='item'
                              onClick={() => history.push(`/user?uid=${o.user?._id}`)}
                            >
                              <div className='index'>{`0${i + 7}`}</div>
                              <Avatar
                                style={{ width: 65 }}
                                image={o.user?.kyc?.avatar?.path ? o.user?.kyc?.avatar?.path : null}
                                pos={o.user?.kyc?.avatar_pos}
                              />
                              <div className='info'>
                                <div className='name'>
                                  {o.user?.kyc?.first_name || o.user?.kyc?.last_name
                                    ? `${o.user?.kyc?.first_name} ${o.user?.kyc?.last_name}`.trim()
                                    : shortAddress(o.user?.address)}
                                </div>
                                <div className='amount'>{_price} KGD</div>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                </div>

                {/* {topRevenue.map((o, index) => (
                  <div className='item' key={o._id}>
                    <span className='index'>{index + 1}</span>
                    <span className='avatar'>
                      <img
                        alt=''
                        src={
                          o.user?.kyc?.avatar?.path
                            ? `${STORAGE_DOMAIN}${o.user?.kyc?.avatar?.path}`
                            : avatarDefault
                        }
                      />
                    </span>
                    <span className='info'>
                      <span className='name'>
                        {o.user?.kyc?.last_name
                          ? o.user?.kyc?.last_name + ' ' + o.user?.kyc?.first_name
                          : '0x....' +
                            o.user?.address.substring(
                              o.user?.address.length - 8,
                              o.user?.address.length
                            )}
                      </span>
                      <span className='quatity'>
                        {new Decimal(o?.payment_amount).div(new Decimal(10).pow(18)).toString()} KGD
                      </span>
                    </span>
                  </div>
                ))} */}
              </div>
            </div>
          </div>

          <div className='popular-nft'>
            <div className='titleY'>
              <span>Popular NFT</span>
              <img src={titleSVG} alt='' />
            </div>

            <div className='flexbox flex4'>
              {PopulateList.map((o, index) => (
                <div className='flexbox__item item' key={o._id}>
                  <div className='avatar-container'>
                    <img className='back' src={avatarBackSVG} alt='' />
                    <Avatar
                      style={{
                        width: 35,
                        position: 'absolute',
                        top: 2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                      image={o.owner?.kyc?.avatar?.path ? o.owner?.kyc?.avatar?.path : null}
                      pos={o.owner?.kyc?.avatar_pos}
                    />
                  </div>

                  <div className='nft-blur'>
                    <div className='nft-behind'>
                      <img src={o.asset?.metadata?.image} alt='' />
                    </div>

                    <div
                      className='blur'
                      onMouseOver={handleMouseOverNFT}
                      onMouseOut={handleMouseOutNFT}
                    >
                      {o?.asset?.metadata?.mimetype.startsWith('image') && (
                        <div className='img'>
                          <img src={o.asset?.metadata?.image} alt='' />
                        </div>
                      )}

                      {o?.asset?.metadata?.mimetype.startsWith('video/mp4') && (
                        <div className='video'>
                          <img src={o?.asset?.metadata?.image} alt='' />
                          <video muted autoPlay src={o?.asset?.metadata?.animation_url} alt='' />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='name'>{o.asset?.metadata?.name}</div>

                  <div className='info'>
                    {paymentList.map((token, index) => {
                      if (token.address === top9List[ActiveTop9]?.payment_token) {
                        const _price = new Decimal(top9List[ActiveTop9]?.price).div(
                          new Decimal(10).pow(token.decimal)
                        )

                        return (
                          <div key={index} className='price'>
                            <img src={kdgSVG} alt='' />
                            {`${_price}`}
                          </div>
                        )
                      }

                      return (
                        <div key={index} className='price'>
                          <img src={kdgSVG} alt='' />
                          No Price
                        </div>
                      )
                    })}

                    <span className='amount'>Amount: {o.quantity}</span>
                  </div>

                  <div className='btn' onClick={() => handleShowDetailPopulate(index)}>
                    Detail
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
