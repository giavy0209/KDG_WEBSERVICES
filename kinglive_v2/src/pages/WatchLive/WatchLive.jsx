import { useWeb3React } from '@web3-react/core'
import Avatar from 'components/Avatar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../../assets/scss/watchlive.scss'
import emptyGift from '../../assets/svg/emptyGift.svg'
import giftPNG from '../../assets/svg/gift.png'
import sendSVG from '../../assets/svg/send.svg'
import thumb from '../../assets/svg/thumb.png'
// import shareSVG from '../../assets/svg/share.svg'
import callAPI from '../../axios'
import ButtonFollow from '../../components/ButtonFollow'
import { useContractKL1155 } from '../../components/ConnectWalletButton/contract'
import { STORAGE_DOMAIN } from '../../constant'
import convertDateAgo from '../../helpers/convertDateAgo'
import socket from '../../socket'
import VideoPlayer from './VideoPlayer'

export default function WatchLive() {
  const history = useHistory()

  const { account } = useWeb3React()
  const contractKL1155 = useContractKL1155()

  const userRedux = useSelector((state) => state.user)
  const chatListRef = useRef()

  const [chatData, setChatData] = useState([])
  const [liveList, setLiveList] = useState([])
  const [isFollow, setIsFollow] = useState(false)

  const [hideChat, setHideChat] = useState(false)
  const [hideLive] = useState(false)

  const [streamData, setStreamData] = useState({})
  const user = streamData?.user

  const streamId = new URLSearchParams(window.location.search).get('s')
  !streamId && history.push('/')

  useEffect(() => {
    const handleStream = (data) => setStreamData(data)
    socket.on('stream', handleStream)

    return () => {
      socket.removeEventListener('stream', handleStream)
      setChatData([...[]])
    }
  }, [])

  useEffect(() => {
    if (streamData?.status && streamData.status !== 1) {
      history.push(`/user?uid=${streamData.user._id}`)
    }
  }, [history, streamData])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get(`/streamming?id=${streamId}`)
        console.log(res)
        res.status === 1 && setStreamData(res.data)

        if (res.is_followed) {
          setIsFollow(true)
        } else {
          setIsFollow(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    socket.emit('join_stream', streamId)
    return () => {
      socket.emit('leave_stream', streamId)
    }
  }, [history, streamId])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get(`/chats?stream=${streamId}`)
        setChatData(res.data)
      } catch (error) {}
    })()

    const handleReceiveChat = (chatItem) => setChatData((_chatData) => [..._chatData, chatItem])
    socket.on('chat', handleReceiveChat)

    return () => {
      socket.removeEventListener('chat', handleReceiveChat)
    }
  }, [streamId])

  useEffect(() => {
    chatListRef.current?.scroll(0, chatListRef.current.scrollHeight)
  }, [chatData])

  const handleChat = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const chat = data.get('chat')
    if (!chat) return

    console.log({ chat })
    socket.emit('chat', { room: streamData._id, chat })
    e.target.reset()
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get('/streammings')
        res.status === 1 && setLiveList(res.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleFollow = useCallback(async () => {
    try {
      const res = await callAPI.post(`follow?id=${user?._id}`)
      res.status === 1 && setIsFollow((x) => !x)
    } catch (error) {
      console.log(error)
    }
  }, [user])

  const [showGift, setShowGift] = useState(false)
  const [NFTList, setNFTList] = useState([])

  const handleGetUserAssets = useCallback(async () => {
    try {
      const res = await callAPI.get(`/user-asset?limit=20&status=1`)

      if (res.status === 1) {
        setNFTList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    handleGetUserAssets()
  }, [handleGetUserAssets])

  const [ShowListGift, setShowListGift] = useState([])
  const [CurrentShowGift, setCurrentShowGift] = useState(null)
  const isShowGift = useRef(false)

  useEffect(() => {
    const handleGiftData = (giftData) => {
      setShowListGift((_showListGift) => [..._showListGift, giftData])
    }

    socket.on('gift', handleGiftData)
    return () => {
      socket.removeEventListener('gift', handleGiftData)
    }
  }, [])

  useEffect(() => {
    console.log(ShowListGift)
    if (ShowListGift.length === 0 || isShowGift.current) return
    isShowGift.current = true
    const currentGift = ShowListGift[0]
    ShowListGift.splice(0, 1)
    setShowListGift([...ShowListGift])
    setCurrentShowGift({
      ...currentGift,
      img: currentGift.gift + `?${Date.now()}`,
    })
    setTimeout(() => {
      isShowGift.current = false
      setCurrentShowGift(null)
    }, 5000)
  }, [ShowListGift, CurrentShowGift])

  const handleDonate = useCallback(
    async (e) => {
      e.preventDefault()
      if (!account) return
      setShowGift(false)

      const formData = new FormData(e.target)
      const data = {}
      for (const x of formData) {
        const [key, value] = x
        data[key] = value
      }
      data.amount = Number(data.amount) || 1

      const _from = account
      const _to = user?.address
      const _id = data.id
      const _amount = data.amount
      const _data = 0x00

      try {
        await contractKL1155.safeTransferFrom(_from, _to, _id, _amount, _data)
        await handleGetUserAssets()

        socket.emit('gift', {
          gift_id: data._id,
          room: streamId,
        })
      } catch (error) {
        console.log(error)
      }
    },
    [account, contractKL1155, handleGetUserAssets, user, streamId]
  )

  return (
    <>
      <div className={`popup-show-gift ${CurrentShowGift ? 'show' : ''}`}>
        <div className='gift'>
          <img src={CurrentShowGift?.img} alt='' />
          <p>{CurrentShowGift?.name} sent you a gift</p>
        </div>
      </div>

      <div className={`popupGift ${showGift ? 'show' : ''}`}>
        <div className='popupGift__mask' onClick={() => setShowGift(false)}></div>

        <div className='popupGift__content'>
          <div style={{ color: '#fefefe', marginBottom: 16 }}>Gift</div>
          {NFTList.length !== 0 && (
            <div className='flexbox flex4 hideScrollbar' style={{ height: 362, overflowY: 'auto' }}>
              {NFTList.map((nft) => (
                <form
                  onSubmit={handleDonate}
                  key={nft._id}
                  className='popupGift__gift flexbox__item'
                >
                  <input
                    type='text'
                    defaultValue={nft._id}
                    name='_id'
                    style={{ display: 'none' }}
                  />
                  <img src={nft.asset.metadata.image_thumbnail} alt='gift' />
                  <p>{nft.asset.metadata.name}</p>
                  <div style={{ position: 'relative' }}>
                    <input
                      type='number'
                      name='amount'
                      defaultValue={1}
                      onInput={(e) => {
                        if (Number(e.target.value) <= 0) e.target.value = ''
                        if (Number(e.target.value) >= nft.amount) e.target.value = nft.amount
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 2,
                        bottom: 0,
                        fontSize: 14,
                        lineHeight: '25px',
                      }}
                    >
                      | of {nft.amount}
                    </div>
                  </div>
                  <input
                    style={{ display: 'none' }}
                    type='text'
                    name='id'
                    readOnly
                    defaultValue={nft.asset.id}
                  />
                  <button style={{ display: 'none' }} type='submit'>
                    Donate
                  </button>
                </form>
              ))}
            </div>
          )}

          {NFTList.length === 0 && (
            <div
              style={{
                height: 362,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={emptyGift} alt='' />
            </div>
          )}

          <div
            style={{
              color: '#f52871',
              textAlign: 'right',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => window.open('/nft-market', '_blank')}
          >
            Get more &gt;&gt;
          </div>
        </div>
      </div>

      <div className='watchlive'>
        <div className='watchlive__left'>
          <div className='watchlive__videoContainer'>
            <VideoPlayer streamData={streamData} />
          </div>

          <div className='watchlive__titleVideo'>{streamData?.name}</div>

          <div className='mb-30'>
            <span>
              {streamData?.views} views • {convertDateAgo(streamData?.start_date)}
            </span>
            {/* <span className='button-share'>
              <img src={shareSVG} alt='' />
              Share
            </span> */}
          </div>

          <div className='watchlive__infoVideo'>
            <div onClick={() => history.push(`/user?uid=${user?._id}`)}>
              <Avatar
                style={{ width: 45 }}
                image={user?.kyc?.avatar?.path ? user.kyc.avatar.path : null}
                pos={user?.kyc?.avatar_pos}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <div onClick={() => history.push(`/user?uid=${user?._id}`)}>
                {user?.kyc?.first_name || user?.kyc?.last_name
                  ? `${user?.kyc?.first_name} ${user?.kyc?.last_name}`
                  : 'Username'}
              </div>
              <div>{user?.kinglive?.total_follower} followers</div>
              <div>{streamData?.description}</div>

              {account && user && userRedux && userRedux._id !== user._id && (
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                  <ButtonFollow isFollow={isFollow} handleFollow={handleFollow} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='watchlive__right'>
          {account && (
            <div className='watchlive__chatContainer'>
              <div className={`${hideChat ? 'hide' : ''}`}>
                <div ref={chatListRef} className='watchlive__chatList'>
                  {chatData.map((chatItem) => (
                    <div key={chatItem._id} className='watchlive__chatItem'>
                      <div>
                        <Avatar
                          style={{ width: 25 }}
                          image={
                            chatItem?.user?.kyc?.avatar?.path
                              ? chatItem?.user?.kyc?.avatar?.path
                              : null
                          }
                          pos={chatItem?.user?.kyc?.avatar_pos}
                        />
                      </div>

                      <div>
                        <span>
                          {chatItem.user.kyc.first_name || chatItem.user.kyc.last_name
                            ? `${chatItem.user.kyc.first_name} ${chatItem.user.kyc.last_name}`
                            : 'Username'}
                        </span>
                        <span>{chatItem.chat}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form className='watchlive__chatInput' onSubmit={handleChat}>
                  <div>
                    <Avatar style={{ width: 25 }} />
                  </div>

                  <div>
                    <input type='text' name='chat' />
                    <button type='submit'>
                      <img src={sendSVG} alt='' />
                    </button>
                    {userRedux && user && userRedux.address !== user.address && (
                      <img src={giftPNG} alt='' onClick={() => setShowGift(true)} />
                    )}
                  </div>
                </form>
              </div>

              <div onClick={() => setHideChat((x) => !x)}>Hide chat</div>
            </div>
          )}

          <div className='watchlive__buttonToggle'>Streaming</div>

          {!hideLive && (
            <>
              {liveList.length !== 0 && (
                <div>
                  {liveList.map((live) => (
                    <div
                      key={live._id}
                      className='watchlive__livevideo'
                      onClick={() => {
                        history.push(`/watchlive?s=${live._id}`)
                        window.scroll(0, 0)
                      }}
                    >
                      <div>
                        <img
                          src={live.thumbnail ? `${STORAGE_DOMAIN}${live.thumbnail.path}` : thumb}
                          alt=''
                        />
                      </div>

                      <div>
                        <div>{live.name}</div>
                        <div>
                          {live.user.kyc.first_name || live.user.kyc.last_name
                            ? `${live.user.kyc.first_name} ${live.user.kyc.last_name}`
                            : 'Username'}
                        </div>
                        <div>
                          {live.views} views • {convertDateAgo(live.start_date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {liveList.length === 0 && (
                <div
                  style={{
                    height: 362,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img src={emptyGift} alt='' />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
