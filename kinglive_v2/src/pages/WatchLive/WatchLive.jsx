import { useEffect, useMemo, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import '../../assets/scss/watchlive.scss'
import shareSVG from '../../assets/svg/share.svg'
import avatest from '../../assets/svg/avatest.png'
import callAPI from '../../axios'
import { PLAY_STREAM } from '../../constant'

export default function WatchLive() {
  const [streamData, setStreamData] = useState({})

  const id = '60c1b71afe606a0f4d15389f'

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get(`/streamming?id=${id}`)
        console.log({ res })
        setStreamData(res.data)
      } catch (error) {
        console.log('error get video livestream', error)
      }
    })()
  }, [])

  const streamKey = useMemo(() => streamData.key, [streamData])

  return (
    <div className='watchlive'>
      <div className='watchlive__left'>
        <div className='watchlive__videoContainer'>
          <ReactHlsPlayer
            className='watchlive__videoPlayer'
            src={`${PLAY_STREAM}${streamKey}/index.m3u8`}
            autoPlay={false}
            controls={true}
            muted={false}
            width='100%'
            height='100%'
          />
        </div>

        <div className='watchlive__titleVideo'>
          Gầy On Stream Hướng Dẫn Ae Cách Nạp Và Rút KDG - CMT NHỮNG THẮC MẮC CỦA BẠN
        </div>

        <div className='watchlive__viewVideo'>
          <span>11 views</span>
          <span> • </span>
          <span>11 minutes ago</span>
          <span> | </span>
          <span className='sharebutton'>
            <img src={shareSVG} alt='' />
            Share
          </span>
        </div>

        <div className='watchlive__infoVideo'>
          <div>
            <img src={avatest} alt='' />
          </div>
          <div>
            <div>An thuong gia</div>
            <div>176 followers</div>
            <div>
              Cảm ơn mọi người ghé thăm livestream của em và đừng quên ủng hộ em 1 follow và 1 lời
              chào ở phần cmt nha. Phần quà của mọi người là động lực để em đồng hành cùng mọi người
              trong thời gian tới nha. Chúc mọi người xem stream vui vẻ và có thật nhiều sức khỏe
              hihi.
            </div>
          </div>
        </div>
      </div>

      <div className='watchlive__right'>
        <div className='watchlive__chatContainer'>
          <div></div>
          <div>Hide chat</div>
        </div>
      </div>
    </div>
  )
}
