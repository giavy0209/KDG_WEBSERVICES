import Avatar from 'components/Avatar'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import bannerKinglive from '../../assets/images/live/bannerKinglive.gif'
import '../../assets/scss/live.scss'
import rank1 from '../../assets/svg/rank1.svg'
import rank2 from '../../assets/svg/rank2.svg'
import rank3 from '../../assets/svg/rank3.svg'
import coverDefault from '../../assets/svg/coverDefault.jpg'
import emptyGift from '../../assets/svg/emptyGift.svg'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'
import convertDateAgo from '../../helpers/convertDateAgo'

const slide = [bannerKinglive]

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
          {slide.length >= 2 && (
            <div className='controls'>
              {slide.map((o, index) => (
                <div
                  onClick={() => manualChangeSlide(index)}
                  className={`btn ${ActiveSlide === index ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          )}
        </div>

        <div className='container live-container'>
          <div className='left'>
            <div className='title-controls mb-10'>
              <h2 className='title'>Streaming</h2>
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
                          style={{ width: 25, marginTop: 5 }}
                          image={
                            stream.user?.kyc?.avatar?.path ? stream.user.kyc.avatar.path : null
                          }
                          pos={stream.user?.kyc?.avatar_pos}
                        />

                        <div className='detail'>
                          <div className='name'>{stream.name}</div>
                          <div className='view-time'>
                            {stream.views} views • {convertDateAgo(stream.start_date)}
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
                    {Ranking.follows.map((o, idx) => (
                      <div
                        onClick={() => history.push(`/user?uid=${o._id}`)}
                        key={o._id + 'followers'}
                        className='item'
                      >
                        <Avatar
                          style={{ width: 65 }}
                          image={o.kyc.avatar?.path ? o.kyc.avatar.path : null}
                          pos={o.kyc.avatar_pos}
                        />
                        {idx === 0 && <img className='rank' src={rank1} alt='' />}
                        {idx === 1 && <img className='rank' src={rank2} alt='' />}
                        {idx === 2 && <img className='rank' src={rank3} alt='' />}
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
                    {Ranking.views.map((o, idx) => (
                      <div
                        onClick={() => history.push(`/user?uid=${o._id}`)}
                        key={o._id + 'views'}
                        className='item'
                      >
                        <Avatar
                          style={{ width: 65 }}
                          image={o.kyc.avatar?.path ? o.kyc.avatar.path : null}
                          pos={o.kyc.avatar_pos}
                        />
                        {idx === 0 && <img className='rank' src={rank1} alt='' />}
                        {idx === 1 && <img className='rank' src={rank2} alt='' />}
                        {idx === 2 && <img className='rank' src={rank3} alt='' />}
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
