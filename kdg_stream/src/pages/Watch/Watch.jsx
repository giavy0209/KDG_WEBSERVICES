import * as MdIcon from 'react-icons/md';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as RiIcon from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../../assets/css/watch.css';
import avatar0 from '../../assets/images/header/avatar0.png';
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

  const descRef = useRef();
  const [isDescLong, setIsDescLong] = useState(false);

  useEffect(() => {
    descRef.current && descRef.current.clientHeight >= 80 && setIsDescLong(true);
  }, []);

  return (
    <div className='watch'>
      <div className='watch__left'>
        <div className='watch__videoBox'>
          {Video && (
            <iframe
              title='video'
              loading='lazy'
              allowFullScreen={true}
              src={`https://iframe.mediadelivery.net/embed/1536/${Video.guid}?autoplay=true`}
              allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
            ></iframe>
          )}
        </div>

        <div className='watch__info'>
          <div className='watch__titleVideo'>{Video?.name}</div>

          <div className='watch__info-info'>
            <div className='watch__avatar'>
              <img
                alt=''
                src={
                  Video?.user.kyc.avatar ? STORAGE_DOMAIN + Video?.user?.kyc.avatar.path : avatar0
                }
              />
            </div>

            <div>
              <div className='watch__name'>
                {Video?.user.kyc.first_name} {Video?.user.kyc.last_name}
              </div>

              <div className='watch__date'>{Video?.create_date}</div>

              <div className='watch__view'>
                <span>{useNumber(Video?.views)} view</span>
                <span> • </span>
                <span>{useNumber(TotalFollow)} follower</span>
              </div>

              <div ref={descRef} className={`watch__desc ${isShowMore ? 'd-block' : ''}`}>
                {Video?.description}
              </div>

              {isDescLong && (
                <div className='watch__showMore' onClick={() => setIsShowMore(!isShowMore)}>
                  {isShowMore ? 'Hide' : 'Show more...'}
                </div>
              )}
            </div>

            {user && user._id !== Video?.user._id && (
              <div className='watch__action'>
                <button onClick={handleFollow} className={`button ${IsFollowed ? 'active' : ''}`}>
                  {IsFollowed ? (
                    <RiIcon.RiUserUnfollowLine className='icon' />
                  ) : (
                    <RiIcon.RiUserFollowLine className='icon' />
                  )}
                  <span>{IsFollowed ? 'Unfollow' : 'Follow'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='watch__right' style={{ height: '200vh' }}>
        <div className='watch__title'>
          <span>Watch Live</span>
          <MdIcon.MdArrowDropDown />
        </div>
      </div>
    </div>
  );
};

export default Watch;
