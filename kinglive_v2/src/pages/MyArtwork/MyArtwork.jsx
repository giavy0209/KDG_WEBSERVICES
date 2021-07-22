import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../assets/scss/my-artwork.scss'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'
import { ABIKL1155, addressKL1155 } from '../../contracts/KL1155'
import { addressMarket } from '../../contracts/Market'
import convertPositionIMG from '../../helpers/convertPositionIMG'

export default function MyArtwork() {
  const userRedux = useSelector(state => state.user)
  const [status, setStatus] = useState(1)
  const [previewIMG, setPreviewIMG] = useState('')
  const [AssetList, setAssetList] = useState([])

  const isLoadMore = useRef(true)
  const isLoadingAPI = useRef(false)
  const [, setIsLoading] = useState(false)
  const [, setIsApprovedForAll] = useState(false)

  const [userData, setUserData] = useState({})
  const avatar = useMemo(() => userData?.kyc?.avatar?.path, [userData])
  const avatarPos = useMemo(() => userData?.kyc?.avatar_pos, [userData])
  const cover = useMemo(() => userData?.kyc?.cover?.path, [userData])
  const coverPos = useMemo(() => userData?.kyc?.cover_pos, [userData])
  const userName = useMemo(
    () => `${userData?.kyc?.first_name} ${userData?.kyc?.last_name}`,
    [userData]
  )

  const handleChangeStatus = useCallback(async (status) => {
    setStatus(status);
    AssetList.length = 0;
    await getAssets(status)
  })

  const getAssets = useCallback(async (status) => {
    var ids = AssetList.map(o => o._id);
    
    const res = await callAPI.get(`/user-asset?limit=20&${ids.length?`ids=${ids}`:""}&status=${status}`,true, { headers:{'x-authenticated-id-by-kdg':'60f5dff80169e54df90a0884'}})

    if (res?.data?.length === 0) {
      isLoadMore.current = false
      setAssetList([...AssetList])
      return
    }

    setAssetList([...AssetList, ...res.data])
  }, [AssetList])

  useEffect(() => {
    const handleLoad = async () => {
      const totalHeight = document.getElementById('root').clientHeight
      const scrolledHeight = window.scrollY + window.innerHeight
      const restHeight = totalHeight - scrolledHeight
      const isEnd = restHeight <= 500

      if (isEnd && isLoadMore.current && !isLoadingAPI.current) {
        isLoadingAPI.current = true
        setIsLoading(true)
        await getAssets(status)
        setIsLoading(false)
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
      try {
        const res = await callAPI.get(`/user?uid=${userRedux?._id}`)
        setUserData(res.data)

        if (window.web3.eth) {
          const approved = await new window.web3.eth.Contract(ABIKL1155, addressKL1155).methods
            .isApprovedForAll(window.ethereum.selectedAddress, addressMarket)
            .call()
            console.log("approved",approved)
          setIsApprovedForAll(approved)
        }
      } catch (error) {}
    })()
  }, [userRedux])

  useMemo(() => {
    callAPI.get(`/user-asset?limit=20&status=${status}`,true, { headers:{'x-authenticated-id-by-kdg':'60f5dff80169e54df90a0884'}}).then(res => {
      setAssetList(res.data)
    })
  }, [])

  const [isOpenSell, setIsOpenSell] = useState(false)

  const handleSell = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const submitData = {}
    for (let x of data) {
      const [key, value] = x
      submitData[key] = value
    }

    console.log(submitData)
    setIsOpenSell(false)
  }

  return (
    <>
      {isOpenSell && (
        <div className='popupX' onClick={() => setIsOpenSell(false)}>
          <form className='containerX' onSubmit={handleSell} onClick={(e) => e.stopPropagation()}>
            <div className='form-control'>
              <div class='label'>Quantity</div>
              <input type='number' name='_quantity' />
            </div>
            <div className='form-control'>
              <div class='label'>Mask</div>
              <input type='number' name='_mask' />
            </div>
            <div className='form-control'>
              <div class='label'>Price</div>
              <input type='number' name='_price' />
            </div>
            <div className='form-control'>
              <div class='label'>Payment Token</div>
              <select name='_paymentToken'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
              </select>
            </div>
            <button className='buttonX'>Confirm</button>
          </form>
        </div>
      )}

      <div className='myartwork profile😢 container'>
        <div style={{ position: 'relative', marginBottom: 60 }}>
          {previewIMG && (
            <div className='profile😢__previewIMG' onClick={() => setPreviewIMG('')}>
              <img src={previewIMG} alt='' />
            </div>
          )}

          <div className='profile😢__cover'>
            <img
              src={`${STORAGE_DOMAIN}${cover}`}
              alt=''
              style={convertPositionIMG(coverPos)}
              onClick={() => setPreviewIMG(`${STORAGE_DOMAIN}${cover}`)}
            />
            <span></span>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className='profile😢__avatar'>
              <img
                src={`${STORAGE_DOMAIN}${avatar}`}
                alt=''
                style={convertPositionIMG(avatarPos)}
                onClick={() => setPreviewIMG(`${STORAGE_DOMAIN}${avatar}`)}
              />
              <span></span>
            </div>
          </div>
        </div>

        <div className='profile😢__name'>
          {!userName || userName === ' ' ? 'Username' : userName}
        </div>

        <div className='myartwork__container mt-35'>
          <div className='myartwork__tabs'>
            <div
              className={`myartwork__tab ${status === 1 ? 'active' : ''}`}
              onClick={() => handleChangeStatus(1)}
            >
              Revewed <span>Revewed</span>{' '}
            </div>
            <div
              className={`myartwork__tab ${status === 0 ? 'active' : ''}`}
              onClick={() => handleChangeStatus(0)}
            >
              Pending <span>Pending</span>{' '}
            </div>
            <div
              className={`myartwork__tab ${status === 2 ? 'active' : ''}`}
              onClick={() => handleChangeStatus(2)}
            >
              Reject <span>Reject</span>{' '}
            </div>
            <div
              className={`myartwork__tab ${status === 3 ? 'active' : ''}`}
              onClick={() => handleChangeStatus(3)}
            >
              Bidding <span>Bidding</span>{' '}
            </div>
          </div>

          {AssetList?.length > 0 && (
            <div className='myartwork__list'>
              {AssetList.map((al) => (
                <div className='myartwork__list-item'>
                  <div className='artwork'>
                    <div className='img'>
                      <img src={al.asset?.metadata?.image} alt='' />
                    </div>
                    <div className='name'>{al.asset?.metadata?.name}</div>
                    <div className='quantity'>{al.amount}</div>
                    <div className='create-date'>
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M7 0C3.14027 0 0 3.14027 0 7C0 10.8597 3.14027 14 7 14C10.8597 14 14 10.8597 14 7C14 3.14027 10.8597 0 7 0ZM7 13.125C3.62262 13.125 0.875004 10.3774 0.875004 7C0.875004 3.62262 3.62262 0.875004 7 0.875004C10.3774 0.875004 13.125 3.62262 13.125 7C13.125 10.3774 10.3774 13.125 7 13.125Z'
                          fill='#6A6A6D'
                        />
                        <path
                          d='M7.4375 2.625H6.5625V7.18114L9.31567 9.93431L9.93432 9.31566L7.4375 6.81884V2.625Z'
                          fill='#6A6A6D'
                        />
                      </svg>

                      <span></span>
                    </div>
                  </div>
                  <div className='buttonX' onClick={() => setIsOpenSell(true)}>
                  Sell
                </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
