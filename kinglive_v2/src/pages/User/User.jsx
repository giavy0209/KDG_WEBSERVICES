import { useEffect, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player/dist'
import { useHistory } from 'react-router-dom'
import avatarDefault from '../../assets/svg/avatarDefault.svg'
import coverDefault from '../../assets/svg/coverDefault.jpg'
import emptyGift from '../../assets/svg/emptyGift.svg'
import titleSVG from '../../assets/svg/title.svg'
import callAPI from '../../axios'
import ButtonFollow from '../../components/ButtonFollow'
import VideoPlayer from '../../components/VideoPlayer'
import { PLAY_STREAM, STORAGE_DOMAIN } from '../../constant'
import convertDateAgo from '../../helpers/convertDateAgo'
import convertPositionIMG from '../../helpers/convertPositionIMG'
// import { statisticArray } from '../../mock/user'

export default function User() {
  const history = useHistory()

  const [isFollow, setIsFollow] = useState(false)
  const [previewIMG, setPreviewIMG] = useState('')

  const [userData, setUserData] = useState({})
  const avatar = userData?.kyc?.avatar?.path
  const avatarPos = userData?.kyc?.avatar_pos
  const cover = userData?.kyc?.cover?.path
  const coverPos = userData?.kyc?.cover_pos
  const userName = `${userData?.kyc?.first_name} ${userData?.kyc?.last_name}`
  const introduce = userData?.kinglive?.introduce

  const statisticArray = [
    {
      amount: userData?.kinglive?.total_follower || 0,
      name: 'Followers',
      color1: '#FA528D',
      color2: '#C954F0',
    },
    {
      amount: userData?.kinglive?.total_followed || 0,
      name: 'Followings',
      color1: '#F52871',
      color2: '#F52871',
    },
    {
      amount: userData?.kinglive?.total_stream_views || 0,
      name: 'Total Views',
      color1: '#2CE999',
      color2: '#2CE999',
    },
  ]

  const uid = new URLSearchParams(window.location.search).get('uid')
  if (!uid) history.push('/')

  useEffect(() => {
    callAPI
      .get(`/user?uid=${uid}`)
      .then((res) => {
        if (res.status === 1) {
          console.log(res.data)
          setUserData(res.data)
          setIsFollow(!!res.data.isFollowed)
        }
      })
      .catch((error) => console.log(error))
  }, [uid, history])

  const handleFollow = async () => {
    try {
      const res = await callAPI.post(`follow?id=${userData?._id}`)
      res.status === 1 && setIsFollow((x) => !x)
    } catch (error) {
      console.log(error)
    }
  }

  const [uploadList, setUploadList] = useState([])
  const [seeMoreCount, setSeeMoreCount] = useState(0)
  const initLimit = 6
  const seeMoreLimit = 12

  useEffect(() => {
    callAPI
      .get(`/videos?user=${uid}&limit=${initLimit}`)
      .then((res) => {
        if (res.status === 1) {
          setUploadList(res.data)
          const count = Math.ceil((res.total - initLimit) / seeMoreLimit)
          if (count <= 0) return
          setSeeMoreCount(count)
        }
      })
      .catch((error) => console.log(error))
  }, [uid])

  const handleSeeMore = async () => {
    if (uploadList.length === 0) return

    try {
      const lastVideoId = uploadList[uploadList.length - 1]._id
      const res = await callAPI.get(`/videos?user=${uid}&limit=${seeMoreLimit}&last=${lastVideoId}`)
      setUploadList((list) => [...list, ...res.data])
      setSeeMoreCount((x) => x - 1)
    } catch (error) {
      console.log(error)
    }
  }

  const [streaming, setStreaming] = useState(null)
  useEffect(() => {
    callAPI
      .get(`/streammings?uid=${uid}`)
      .then((res) => {
        if (res.status === 1 && res.data.length !== 0) {
          setStreaming(res.data[0])
        }
      })
      .catch((error) => console.log(error))
  }, [uid])

  return (
    <div className='profile😢 container'>
      <div style={{ position: 'relative', marginBottom: 60 }}>
        {previewIMG && (
          <div className='profile😢__previewIMG' onClick={() => setPreviewIMG('')}>
            <img src={previewIMG} alt='' />
          </div>
        )}

        <div className='profile😢__cover'>
          <img
            alt=''
            style={convertPositionIMG(coverPos)}
            onClick={(e) => setPreviewIMG(e.target.src)}
            src={cover ? `${STORAGE_DOMAIN}${cover}` : coverDefault}
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
              alt=''
              style={convertPositionIMG(avatarPos)}
              onClick={(e) => setPreviewIMG(e.target.src)}
              src={avatar ? `${STORAGE_DOMAIN}${avatar}` : avatarDefault}
            />
            <span></span>
          </div>
        </div>
      </div>

      <div className='profile😢__name'>{!userName || userName === ' ' ? 'Username' : userName}</div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 25 }}>
        <ButtonFollow isFollow={isFollow} handleFollow={handleFollow} />
      </div>

      <div className='profile😢__statistic'>
        {statisticArray.map((item) => (
          <div
            key={item.name}
            className='itemStatistic'
            style={{ '--color-1': item.color1, '--color-2': item.color2 }}
          >
            <div className='absolute'>
              <span>{item.amount}</span>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {introduce && (
        <div>
          <div className='profile😢__title'>
            <span>Video Introduce</span>
            <img src={titleSVG} alt='' />
          </div>

          <div className='profile😢__introduce'>
            <VideoPlayer guid={introduce.guid} />

            <div>
              <div onClick={() => history.push(`/watchvideo?v=${introduce.short_id}`)}>
                {introduce.name}
              </div>
              <div>
                {introduce.views} views • {convertDateAgo(introduce.create_date)}
              </div>
              <div>{introduce.description}</div>
            </div>
          </div>
        </div>
      )}

      {streaming && (
        <div>
          <div className='profile😢__title'>
            <span>Streaming</span>
            <img src={titleSVG} alt='' />
          </div>

          <div className='profile😢__introduce'>
            <ReactHlsPlayer
              src={`${PLAY_STREAM}${streaming.key}/index.m3u8`}
              autoPlay={true}
              controls={true}
              muted={false}
            />

            <div>
              <div onClick={() => history.push(`/watchlive?s=${streaming._id}`)}>
                {streaming.name}
              </div>
              <div>
                {streaming.views} views • {convertDateAgo(streaming.start_date)}
              </div>
              <div>{streaming.description}</div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className='profile😢__title'>
          <span>Video Uploaded</span>
          <img src={titleSVG} alt='' />
        </div>

        {uploadList.length !== 0 && (
          <>
            <div className='flexbox flex3' style={{ '--gap-col': '5px' }}>
              {uploadList.map((video) => (
                <div
                  key={video._id}
                  className='flexbox__item profile😢__video'
                  onClick={() => history.push(`/watchvideo?v=${video.short_id}`)}
                  onMouseEnter={(e) => {
                    e.target
                      .closest('.profile😢__video')
                      .querySelector('.thumbnail > img')
                      .setAttribute(
                        'src',
                        `https://vz-eb27802e-8db.b-cdn.net/${video.guid}/preview.webp`
                      )
                  }}
                  onMouseLeave={(e) => {
                    e.target
                      .closest('.profile😢__video')
                      .querySelector('.thumbnail > img')
                      .setAttribute(
                        'src',
                        `https://vz-eb27802e-8db.b-cdn.net/${video.guid}/thumbnail.jpg`
                      )
                  }}
                >
                  <div className='thumbnail'>
                    <img
                      src={`https://vz-eb27802e-8db.b-cdn.net/${video.guid}/thumbnail.jpg`}
                      alt=''
                    />
                  </div>

                  <div className='info'>
                    <div>{video.name}</div>
                  </div>
                </div>
              ))}
            </div>

            {seeMoreCount !== 0 && (
              <div className='buttonSeeMore pb-65' onClick={handleSeeMore}>
                See more
              </div>
            )}
          </>
        )}

        {uploadList.length === 0 && (
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
      </div>
    </div>
  )
}
