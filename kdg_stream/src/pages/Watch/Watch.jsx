import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../../assets/css/watch.css';
import avatar0 from '../../assets/images/header/avatar0.png';
import avatar1 from '../../assets/images/live/avatar1.png';
import callAPI from '../../axios';
import { STORAGE_DOMAIN } from '../../constant';
import useNumber from '../../hooks/useNumber';

const Watch = () => {
  const id = new URLSearchParams(useLocation().search).get('v');
  const user = useSelector(state => state.user);

  const [Video, setVideo] = useState(null);
  const [TotalFollow, setTotalFollow] = useState(0);
  const [IsFollowed, setIsFollowed] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  useMemo(() => {
    callAPI.get('/video?sid=' + id).then(res => {
      setVideo(res.data);
      setIsFollowed(res.is_followed);
      setTotalFollow(res.total_follow);
    });
  }, [id]);

  const handleFollow = useCallback(async () => {
    const res = await callAPI.post('follow?id=' + Video?.user._id);
    if (res.status === 1) {
      setIsFollowed(!IsFollowed);
    }
  }, [Video, IsFollowed]);

  return (
    <div className='watch'>
      <div className='watch__left'>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          {Video && (
            <iframe
              title='video'
              loading='lazy'
              allowFullScreen={true}
              src={`https://iframe.mediadelivery.net/embed/1536/${Video.guid}?autoplay=true`}
              allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
              style={{
                border: 'none',
                position: 'absolute',
                top: 0,
                height: '100%',
                width: '100%',
              }}
            ></iframe>
          )}
        </div>

        <div className='watch__info'>
          <div className='watch__info-menu'></div>
          <div className='watch__info-title'>{Video?.name}</div>
          <div className='watch__info-info'>
            <div className='watch__info-avatar'>
              <img
                src={
                  Video?.user.kyc.avatar ? STORAGE_DOMAIN + Video?.user?.kyc.avatar.path : avatar0
                }
                alt=''
              />
            </div>
            <div>
              <div className='watch__info-name'>
                {Video?.user.kyc.first_name} {Video?.user.kyc.last_name}
              </div>
              <div className='watch__info-date'>{Video?.create_date}</div>
              <div className='watch__info-view'>
                <span>{useNumber(Video?.views)} view</span>
                <span>{useNumber(TotalFollow)} follower</span>
              </div>
              <div className={`watch__info-desc ${isShowMore ? 'd-block' : ''}`}>
                {Video?.description}
              </div>
              <div
                className='watch__info-showMore mt-20'
                onClick={() => setIsShowMore(!isShowMore)}
              >
                {!isShowMore ? 'Show more...' : 'Hide...'}
              </div>
            </div>
            {user && user._id !== Video?.user._id && (
              <div>
                <div
                  onClick={handleFollow}
                  className={`watch__info-btnFollow ${IsFollowed ? 'active' : ''}`}
                >
                  <span>{IsFollowed ? 'Unfollow' : 'Follow'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='watch__right'>
        <div className='watch__recommend'>
          <div className='watch__recommend-title'>Recommend</div>

          <div className='watch__recommend-ctn'>
            <div className='watch__recommend-ctn-avatar'>
              <img src={avatar1} alt='' />
            </div>
            <div>
              <div className='watch__recommend-ctn-name'>Trà Long</div>
              <div className='watch__recommend-ctn-title'>Live: Homeworld Mobile</div>
            </div>
            <div className='watch__recommend-ctn-watching'>{useNumber(3000)} watching</div>
          </div>

          <div className='watch__recommend-ctn'>
            <div className='watch__recommend-ctn-avatar'>
              <img src={avatar1} alt='' />
            </div>
            <div>
              <div className='watch__recommend-ctn-name'>Trà Long</div>
              <div className='watch__recommend-ctn-title'>
                Live: Homeworld Mobile – Hậu Bản Di Động Của Thương Hiệu Game Chiến Thuật Khi Xưa
              </div>
            </div>
            <div className='watch__recommend-ctn-watching'>{useNumber(30000000)} đang xem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
