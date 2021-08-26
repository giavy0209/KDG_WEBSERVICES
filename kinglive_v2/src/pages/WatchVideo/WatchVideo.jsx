import { useWeb3React } from '@web3-react/core'
import Avatar from 'components/Avatar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../../assets/scss/watchlive.scss'
import emptyGift from '../../assets/svg/emptyGift.svg'
import callAPI from '../../axios'
import ButtonFollow from '../../components/ButtonFollow'
import VideoPlayer from '../../components/VideoPlayer'
import convertDateAgo from '../../helpers/convertDateAgo'

export default function WatchVideo() {
  const history = useHistory()
  const { account } = useWeb3React()
  const userRedux = useSelector((state) => state.user)

  const [videoData, setVideoData] = useState({})
  const user = videoData?.user

  const [liveList, setLiveList] = useState([])
  const [isFollow, setIsFollow] = useState(false)
  const [hideLive] = useState(false)

  const id = new URLSearchParams(window.location.search).get('v')
  !id && history.push('/')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get(`/video?sid=${id}`)
        setVideoData(res.data)

        // Check Follow Yet
        if (res.is_followed) {
          setIsFollow(true)
        } else {
          setIsFollow(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id, history])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get('/recommend')
        res.status === 1 && setLiveList(res.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleFollow = async () => {
    try {
      const res = await callAPI.post(`follow?id=${user?._id}`)
      res.status === 1 && setIsFollow((x) => !x)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='watchlive'>
      <div className='watchlive__left'>
        <VideoPlayer guid={videoData.guid} />

        <div className='watchlive__titleVideo'>{videoData.name}</div>

        <div className='mb-30'>
          <span>
            {videoData.views} views • {convertDateAgo(videoData.create_date)}
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
            <div>{user?.kinglive.total_follower} followers</div>
            <div>{videoData.description}</div>

            {account && user && userRedux && userRedux._id !== user._id && (
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <ButtonFollow isFollow={isFollow} handleFollow={handleFollow} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='watchlive__right'>
        <div className='watchlive__buttonToggle'>Watch Video</div>

        {!hideLive && (
          <>
            {liveList.length !== 0 && (
              <div>
                {liveList.map((live) => (
                  <div
                    key={live._id}
                    className='watchlive__livevideo'
                    onClick={() => {
                      history.push(`/watchvideo?v=${live.short_id}`)
                      window.scroll(0, 0)
                    }}
                  >
                    <div>
                      <img
                        src={`https://vz-eb27802e-8db.b-cdn.net/${live.guid}/thumbnail.jpg`}
                        alt=''
                      />
                    </div>

                    <div>
                      <div>{live.name}</div>
                      <div>
                        {live.user?.kyc.first_name || live.user?.kyc.last_name
                          ? `${live.user.kyc.first_name} ${live.user.kyc.last_name}`
                          : 'Username'}
                      </div>
                      <div>
                        {live.views} views • {convertDateAgo(live.create_date)}
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
  )
}
