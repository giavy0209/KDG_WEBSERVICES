import { useEffect, useMemo, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../../assets/scss/watchlive.scss'
import avatarDefaultSVG from '../../assets/svg/avatarDefault.svg'
import coverDefaultJPG from '../../assets/svg/coverDefault.jpg'
import giftPNG from '../../assets/svg/gift.png'
import sendSVG from '../../assets/svg/send.svg'
import shareSVG from '../../assets/svg/share.svg'
import callAPI from '../../axios'
import ButtonFollow from '../../components/ButtonFollow'
import { PLAY_STREAM, STORAGE_DOMAIN } from '../../constant'
import convertDateAgo from '../../helpers/convertDateAgo'
import socket from '../../socket'

export default function WatchLive() {
  const history = useHistory()
  const userRedux = useSelector(state => state.user)

  const chatListRef = useRef()

  const [streamData, setStreamData] = useState({})
  const user = useMemo(() => streamData.user, [streamData])
  const [chatData, setChatData] = useState([])
  const [liveList, setLiveList] = useState([])
  const [isFollow, setIsFollow] = useState(false)

  const [hideChat, setHideChat] = useState(false)
  const [hideLive, setHideLive] = useState(false)
  // const [hideRecommend, setHideRecommend] = useState(false)

  const id = new URLSearchParams(window.location.search).get('s')

  // Push to Home when id === undefined
  // Get Current LiveVideo
  useEffect(() => {
    if (!id) return history.push('/')

    let streamId
    ;(async () => {
      try {
        const res = await callAPI.get(`/streamming?id=${id}`)
        console.log({ streamData: res })
        setStreamData(res.data)

        // Check Follow Yet
        if (res.is_followed) {
          setIsFollow(true)
        } else {
          setIsFollow(false)
        }

        streamId = res.data._id
        socket.emit('join_stream', streamId)
      } catch (error) {
        console.log('error get video livestream', error)
      }
    })()

    return () => {
      socket.emit('leave_stream', streamId)
    }
  }, [id, history])

  // Get Chat of LiveVideo
  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get(`/chats?stream=${id}`)
        console.log({ chatData: res })
        setChatData(res.data)
      } catch (error) {
        console.log('error get chat', error)
      }
    })()

    const handleReceiveChat = chatItem => setChatData(_chatData => [..._chatData, chatItem])
    socket.on('chat', handleReceiveChat)

    return () => {
      socket.removeEventListener('chat', handleReceiveChat)
    }
  }, [id])

  // Scroll ChatBox to very bottom when have new chat
  useEffect(() => {
    chatListRef.current.scroll(0, chatListRef.current.scrollHeight)
  }, [chatData])

  // Emit new Chat
  const handleChat = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    const chat = data.get('chat')
    if (!chat) return

    console.log({ chat })
    socket.emit('chat', { room: streamData._id, chat })
    e.target.reset()
  }

  // Get Live List
  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get('/streammings')
        console.log({ liveList: res })
        setLiveList(res.data)
      } catch (error) {
        console.log('error get live list', error)
      }
    })()
  }, [])

  // Follow and Unfollow
  const handleFollow = async () => {
    try {
      const res = await callAPI.post(`follow?id=${user?._id}`)
      if (res.status === 1) setIsFollow(x => !x)
    } catch (error) {
      console.log('error follow or unfollow', error)
    }
  }

  return (
    <div className='watchlive'>
      <div className='watchlive__left'>
        <div className='watchlive__videoContainer'>
          <ReactHlsPlayer
            className='watchlive__videoPlayer'
            src={`${PLAY_STREAM}${streamData.key}/index.m3u8`}
            autoPlay={true}
            controls={true}
            muted={false}
            width='100%'
            height='100%'
          />
        </div>

        <div className='watchlive__titleVideo'>{streamData.name}</div>

        <div className='mb-30'>
          <span>
            {streamData.views} views • {convertDateAgo(streamData.start_date)} |{' '}
          </span>
          <span className='button-share'>
            <img src={shareSVG} alt='' />
            Share
          </span>
        </div>

        <div className='watchlive__infoVideo'>
          <div>
            <img src={`${STORAGE_DOMAIN}${user?.kyc.avatar.path}`} alt='' />
          </div>

          <div style={{ position: 'relative' }}>
            <div>
              {user?.kyc.first_name || user?.kyc.last_name
                ? `${user?.kyc.first_name} ${user?.kyc.last_name}`
                : 'Username'}
            </div>
            <div>{user?.kinglive.total_follower} followers</div>
            <div>{streamData.description}</div>

            {userRedux?._id !== user?._id && (
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <ButtonFollow isFollow={isFollow} handleFollow={handleFollow} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='watchlive__right'>
        <div className='watchlive__chatContainer'>
          <div className={`${hideChat ? 'hide' : ''}`}>
            <div ref={chatListRef} className='watchlive__chatList'>
              {chatData.map(chatItem => (
                <div key={chatItem._id} className='watchlive__chatItem'>
                  <div>
                    <img
                      src={
                        chatItem.user.kyc.avatar
                          ? `${STORAGE_DOMAIN}${chatItem.user.kyc.avatar.path}`
                          : avatarDefaultSVG
                      }
                      alt=''
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
                <img
                  src={
                    user?.kyc.avatar
                      ? `${STORAGE_DOMAIN}${user?.kyc.avatar.path}`
                      : avatarDefaultSVG
                  }
                  alt=''
                />
              </div>

              <div>
                <input type='text' name='chat' />
                <button type='submit'>
                  <img src={sendSVG} alt='' />
                </button>
                <img src={giftPNG} alt='' />
              </div>
            </form>
          </div>

          <div onClick={() => setHideChat(x => !x)}>Hide chat</div>
        </div>

        <div className='watchlive__buttonToggle' onClick={() => setHideLive(x => !x)}>
          Watch Live
        </div>

        {!hideLive && (
          <div>
            {liveList.map(live => (
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
                    src={
                      live.thumbnail ? `${STORAGE_DOMAIN}${live.thumbnail.path}` : coverDefaultJPG
                    }
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

        {/* <div className='watchlive__buttonToggle' onClick={() => setHideRecommend(x => !x)}>
          Recommend
        </div>

        {!hideRecommend && (
          <div>
            <div className='watchlive__livevideo'>
              <div>
                <img src={bgtest} alt='' />
              </div>

              <div>
                <div>Greatest Hits Game Of Popular</div>
                <div>Trung Quan An Quan</div>
                <div>11 views • 11 minutes ago</div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}
