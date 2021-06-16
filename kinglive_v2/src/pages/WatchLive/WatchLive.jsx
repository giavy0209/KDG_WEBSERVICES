import { useEffect, useMemo, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import '../../assets/scss/watchlive.scss'
// import avatest from '../../assets/svg/avatest.png'
import bgtest from '../../assets/svg/bgtest.png'
import giftPNG from '../../assets/svg/gift.png'
import sendSVG from '../../assets/svg/send.svg'
import shareSVG from '../../assets/svg/share.svg'
import callAPI from '../../axios'
import { PLAY_STREAM, STORAGE_DOMAIN } from '../../constant'
import convertDateAgo from '../../helpers/convertDate'
import socket from '../../socket'

export default function WatchLive() {
  const chatListRef = useRef()

  const [streamData, setStreamData] = useState({})
  const [chatData, setChatData] = useState([])
  const [hideChat, setHideChat] = useState(false)
  const [hideLive, setHideLive] = useState(false)
  const [hideRecommend, setHideRecommend] = useState(false)

  const id = '60c9764670863c4b00c83bf5'

  useEffect(() => {
    let streamId
    ;(async () => {
      try {
        const res = await callAPI.get(`/streamming?id=${id}`)
        console.log({ streamData: res })
        setStreamData(res.data)

        streamId = res.data._id

        socket.emit('join_stream', streamId)
      } catch (error) {
        console.log('error get video livestream', error)
      }
    })()

    return () => {
      socket.emit('leave_stream', streamId)
    }
  }, [])

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
  }, [])

  useEffect(() => {
    chatListRef.current.scroll(0, chatListRef.current.scrollHeight)
  }, [chatData])

  const user = useMemo(() => streamData.user, [streamData])

  const handleChat = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    const chat = data.get('chat')
    if (!chat) return

    console.log({ chat })
    socket.emit('chat', { room: streamData._id, chat })
    e.target.reset()
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

        <div className='watchlive__viewVideo'>
          <span>
            {streamData.views} views • {convertDateAgo(streamData.start_date)} |{' '}
          </span>
          <span className='sharebutton'>
            <img src={shareSVG} alt='' />
            Share
          </span>
        </div>

        <div className='watchlive__infoVideo'>
          <div>
            <img src={`${STORAGE_DOMAIN}${user?.kyc.avatar.path}`} alt='' />
          </div>
          <div>
            <div>
              {user?.kyc.first_name || user?.kyc.last_name
                ? `${user?.kyc.first_name} ${user?.kyc.last_name}`
                : 'Username'}
            </div>
            <div>{user?.kinglive.total_follower} followers</div>
            <div>{streamData.description}</div>
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
                    <img src={`${STORAGE_DOMAIN}${chatItem.user.kyc.avatar.path}`} alt='' />
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
                <img src={`${STORAGE_DOMAIN}${user?.kyc.avatar.path}`} alt='' />
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

        {hideLive && (
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
        )}

        <div className='watchlive__buttonToggle' onClick={() => setHideRecommend(x => !x)}>
          Recommend
        </div>

        {hideRecommend && (
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
        )}
      </div>
    </div>
  )
}
