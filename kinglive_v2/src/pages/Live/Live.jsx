import Avatar from 'components/Avatar'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import banner from '../../assets/images/live/banner.png'
import banner01 from '../../assets/images/home/b01.jpg'
import banner02 from '../../assets/images/home/b02.jpg'
import banner03 from '../../assets/images/home/b03.jpg'
import '../../assets/scss/live.scss'
import avatarDefault from '../../assets/svg/avatarDefault.svg'
import coverDefault from '../../assets/svg/coverDefault.jpg'
import emptyGift from '../../assets/svg/emptyGift.svg'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'
import convertDateAgo from '../../helpers/convertDateAgo'

const slide = [banner01, banner02, banner03]

const live = []
for (let index = 0; index < 100; index++) {
  live.push(index)
}

export default function Live() {
  const history = useHistory()

  const [ActiveSlide, setActiveSlide] = useState(0)
  const [ActiveTab, setActiveTab] = useState(0)
  const [streamList, setStreamList] = useState([])
  const [Ranking, setRanking] = useState({ views: [], follows: [] })

  const manualChangeSlide = useCallback((index) => {
    setActiveSlide(index)
  }, [])

  useEffect(() => {
    callAPI.get('/streammings').then((res) => {
      if (res.status === 1) {
        setStreamList(res.data)
      }
    })

    callAPI.get('/ranking').then((res) => {
      setRanking(res.data)
    })
  }, [])

  return (
    <>
      <div className='live'>
        <div className='slide-track'>
          <div
            style={{ '--translate': -(100 / slide.length) * ActiveSlide + '%' }}
            className='slide'
          >
            {slide.map((o) => (
              <div className='item'>
                <img src={o} alt='' />
              </div>
            ))}
          </div>
          <div className='controls'>
            {slide.map((o, index) => (
              <div
                onClick={() => manualChangeSlide(index)}
                className={`btn ${ActiveSlide === index ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
        <div className='container live-container'>
          <div className='left'>
            <div className='title-controls'>
              <h2 className='title'>Watch Live</h2>
            </div>

            {streamList.length === 0 && (
              <div
                style={{
                  height: 472,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={emptyGift} alt='' />
              </div>
            )}

            {streamList.length !== 0 && (
              <div className='recommend'>
                {streamList.map((stream) => (
                  <div className='item' onClick={() => history.push(`/watchlive?s=${stream._id}`)}>
                    <div className='video-live'>
                      <div className='thumb'>
                        <img
                          src={
                            stream.thumbnail?.path
                              ? `${STORAGE_DOMAIN}${stream.thumbnail.path}`
                              : coverDefault
                          }
                          alt=''
                        />
                      </div>
                      <div className='detail-avatar'>
                        <Avatar
                          image={
                            stream.user?.kyc?.avatar?.path
                              ? `${STORAGE_DOMAIN}${stream.user.kyc.avatar.path}`
                              : avatarDefault
                          }
                          pos={stream.user?.kyc?.avatar_pos}
                        />
                        <div className='avatar'>
                          <img
                            src={
                              stream.user?.kyc?.avatar?.path
                                ? `${STORAGE_DOMAIN}${stream.user.kyc.avatar.path}`
                                : avatarDefault
                            }
                            alt=''
                          />
                        </div>
                        <div className='detail'>
                          <div className='name'>{stream.name}</div>
                          <div className='view-time'>
                            {stream.views} views
                            <svg
                              width='4'
                              height='4'
                              viewBox='0 0 4 4'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <circle cx='1.67185' cy='2.23797' r='1.40135' fill='#98999A' />
                            </svg>
                            {convertDateAgo(stream.start_date)}
                          </div>
                          <div className='user-name'>
                            {stream.user?.kyc?.first_name
                              ? `${stream.user?.kyc?.first_name} ${stream.user?.kyc?.last_name}`
                              : 'Username'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='right'>
            <div style={{ '--item': ActiveTab }} className='ranking'>
              <div className='title'>Ranking</div>
              <div className='tabs'>
                <div
                  onClick={() => setActiveTab(0)}
                  className={`tab ${ActiveTab === 0 ? 'active' : ''}`}
                >
                  Followers
                </div>
                <div
                  onClick={() => setActiveTab(1)}
                  className={`tab ${ActiveTab === 1 ? 'active' : ''}`}
                >
                  Views
                </div>
              </div>
              <div className='track-tabs'>
                <div className='tabs-items'>
                  <div className='tab-item'>
                    {Ranking.follows.map((o) => (
                      <div
                        onClick={() => history.push(`/user?uid=${o._id}`)}
                        key={o._id + 'followers'}
                        className='item'
                      >
                        <Avatar
                          style={{ width: '65px' }}
                          image={o.kyc.avatar?.path}
                          pos={o.kyc.avatar_pos}
                        />
                        <div className='info'>
                          <div className='name'>
                            {o.kyc.first_name} {o.kyc.last_name}
                          </div>
                          <div className='rank-info'>{o.kinglive.total_follower} Followers</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='tab-item'>
                    {Ranking.views.map((o) => (
                      <div
                        onClick={() => history.push(`/user?uid=${o._id}`)}
                        key={o._id + 'views'}
                        className='item'
                      >
                        <Avatar
                          style={{ width: '65px' }}
                          image={o.kyc.avatar?.path}
                          pos={o.kyc.avatar_pos}
                        />
                        <div className='info'>
                          <div className='name'>
                            {o.kyc.first_name} {o.kyc.last_name}
                          </div>
                          <div className='rank-info'>{o.kinglive.total_view} Views</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
