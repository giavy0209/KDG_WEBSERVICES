import '../../assets/scss/watchlive.scss'
import ReactHlsPlayer from 'react-hls-player'
import { PLAY_STREAM } from '../../constant'
import { useEffect, useMemo, useState } from 'react'
import callAPI from '../../axios'

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
            controls={false}
            muted={false}
            width='100%'
            height='100%'
          />
        </div>
      </div>
      <div className='watchlive__right'></div>
    </div>
  )
}
