import Avatar from 'components/Avatar'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import emptyGift from '../../assets/svg/emptyGift.svg'
import callAPI from '../../axios'
import convertDateAgo from '../../helpers/convertDateAgo'

export default function Search() {
  const history = useHistory()

  const [SearchVideo, setSearchVideo] = useState([])
  const [SearchUser, setSearchUser] = useState([])
  const s = new URLSearchParams(window.location.search).get('s')

  useEffect(() => {
    if (!s) return history.push('/')

    callAPI.get(`/search?s=${s}`).then((res) => {
      setSearchVideo(res.data.videos)
      setSearchUser(res.data.users)
    })
  }, [s, history])

  return (
    <>
      <div className='search'>
        <div className='container live-container'>
          <div className='left'>
            {SearchUser.length && (
              <div className='title-controls'>
                <h2 className='title'>Users</h2>
              </div>
            )}

            {SearchUser.length && (
              <div className='list-user'>
                {SearchUser.map((o) => (
                  <div
                    key={o._id}
                    onClick={() => history.push(`/user?uid=${o._id}`)}
                    className='item'
                  >
                    <div className='avatar'>
                      <Avatar
                        image={o.kyc.avatar?.path}
                        pos={o.kyc.avatar_pos}
                        style={{ width: '66px' }}
                      />
                    </div>
                    <div className='info'>
                      <div className='name'>
                        {o.kyc.first_name} {o.kyc.last_name}
                      </div>
                      <div className='follow'>{o.kinglive.total_follower} Follow</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className='title-controls'>
              <h2 className='title'>Videos</h2>
            </div>

            {SearchVideo.length === 0 && (
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

            {SearchVideo.length !== 0 && (
              <div className='recommend'>
                {SearchVideo.map((video) => (
                  <div className='item' onClick={() => history.push(`/watchlive?s=${video._id}`)}>
                    <div className='video-live'>
                      <div
                        className='thumb'
                        onClick={() => history.push(`/watchvideo?v=${video.short_id}`)}
                        onMouseEnter={(e) => {
                          e.target
                            .closest('.thumb')
                            .querySelector('img')
                            .setAttribute(
                              'src',
                              `https://vz-eb27802e-8db.b-cdn.net/${video.guid}/preview.webp`
                            )
                        }}
                        onMouseLeave={(e) => {
                          e.target
                            .closest('.thumb')
                            .querySelector('img')
                            .setAttribute(
                              'src',
                              `https://vz-eb27802e-8db.b-cdn.net/${video.guid}/thumbnail.jpg`
                            )
                        }}
                      >
                        <img
                          alt=''
                          src={`https://vz-eb27802e-8db.b-cdn.net/${video.guid}/thumbnail.jpg`}
                        />
                      </div>

                      <div className='detail-avatar'>
                        <div className='avatar'>
                          <Avatar
                            style={{ width: 33 }}
                            image={
                              video.user?.kyc?.avatar?.path ? video.user?.kyc?.avatar?.path : null
                            }
                            pos={video.user?.kyc?.avatar_pos}
                          />
                        </div>

                        <div className='detail'>
                          <div className='name'>{video.name}</div>
                          <div className='view-time'>
                            {video.views} views • {convertDateAgo(video.create_date)}
                          </div>
                          <div className='user-name'>
                            {video.user?.kyc?.first_name || video.user?.kyc?.last_name
                              ? `${video.user?.kyc?.first_name} ${video.user?.kyc?.last_name}`.trim()
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
        </div>
      </div>
    </>
  )
}
