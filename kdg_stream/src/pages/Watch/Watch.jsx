import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import * as RiIcon from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import '../../assets/css/watch.css';
import avatar0 from '../../assets/images/header/avatar0.png';
import callAPI from '../../axios';
import { Avatar, Stream, Video as Videosss } from '../../components';
import { BREAK_POINT_MEDIUM, BREAK_POINT_SMALL, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';

const useStyles = makeStyles(theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#e41a7f',
  },
}));

const Watch = () => {
  const history = useHistory();

  const classes = useStyles();

  const [width] = useWindowSize();
  const [{ language, watch }] = useLanguageLayerValue();

  const id = new URLSearchParams(useLocation().search).get('v');
  const user = useSelector(state => state.user);

  const [Video, setVideo] = useState(null);
  const [TotalFollow, setTotalFollow] = useState(0);
  const [IsFollowed, setIsFollowed] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const [Videos, setVideos] = useState([]);
  const [Streammings, setStreammings] = useState([]);

  const [isShowStreammings, setIsShowStreammings] = useState(true);
  const [isShowRecommend, setIsShowRecommend] = useState(true);

  useMemo(() => {
    callAPI.get('/recommend').then(res => {
      setVideos([...res.data]);
    });

    callAPI.get('/streammings').then(res => {
      setStreammings(res.data);
    });
  }, []);

  const isLoadRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommend = useCallback(async () => {
    const ids = Videos.map(o => o._id);
    const res = await callAPI.get(`/recommend?ids=${ids}`);

    if (res.data.length === 0) {
      return (isLoadRef.current = false);
    }

    setVideos([...Videos, ...res.data]);
  }, [Videos]);

  useEffect(() => {
    const handleLoad = async () => {
      const totalHeight = document.getElementById('root').clientHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;
      const restHeight = totalHeight - scrolledHeight;
      const isEnd = restHeight <= 300;

      if (isEnd && isLoadRef.current) {
        setIsLoading(true);
        await getRecommend();
        setIsLoading(false);
      }
    };

    window.addEventListener('scroll', handleLoad);

    return () => {
      window.removeEventListener('scroll', handleLoad);
    };
  }, [getRecommend]);

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
            <div
              className='watch__avatar'
              onClick={() => history.push('/profile?uid=' + Video?.user._id)}
            >
              <Avatar src={Video?.user.kyc.avatar ? STORAGE_DOMAIN + Video?.user?.kyc.avatar.path : avatar0} position={Video?.user.kyc.avatar_pos || null}/>
              
            </div>

            <div>
              <div className='watch__name'>
                {Video?.user.kyc.first_name} {Video?.user.kyc.last_name}
              </div>

              <div className='watch__date'>{Video?.create_date}</div>

              <div className='watch__view'>
                <span>
                  {useNumber(Video?.views)} {watch[language].views}
                </span>
                <span> • </span>
                <span>
                  {useNumber(TotalFollow)} {watch[language].followers}
                </span>
              </div>

              <div ref={descRef} className={`watch__desc ${isShowMore ? 'd-block' : ''}`}>
                {Video?.description}
              </div>

              {isDescLong && (
                <div className='watch__showMore' onClick={() => setIsShowMore(!isShowMore)}>
                  {isShowMore ? watch[language].hide : watch[language].showmore}
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
                  {width > BREAK_POINT_SMALL && (
                    <span>{IsFollowed ? watch[language].unfollow : watch[language].follow}</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='watch__right'>
        {Streammings.length > 0 && (
          <div className='watch__title' onClick={() => setIsShowStreammings(x => !x)}>
            <span>{watch[language].watchlive}</span>
            <MdIcon.MdArrowDropDown className={isShowStreammings ? 'down' : 'up'} />
          </div>
        )}

        {isShowStreammings && (
          <div className='layoutFlex layout-1' style={{ '--gap-row': '40px' }}>
            {Streammings.map(el => (
              <div key={el._id} className='layoutFlex-item'>
                <Stream
                  avatar={
                    el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path : undefined
                  }
                  video={el}
                  title={el.name}
                  description={el.description}
                  onClick={() => {
                    history.push('/live?s=' + el._id);
                    window.scrollTo(0, 0);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {Videos.length > 0 && (
          <div className='watch__title' onClick={() => setIsShowRecommend(x => !x)}>
            <span>{watch[language].recommend}</span>
            <MdIcon.MdArrowDropDown className={isShowRecommend ? 'down' : 'up'} />
          </div>
        )}

        {isShowRecommend && (
          <div
            className={`layoutFlex ${
              width > BREAK_POINT_MEDIUM
                ? 'layout-1'
                : width > 1187
                ? 'layout-4'
                : width > 897
                ? 'layout-3'
                : width > 577
                ? 'layout-2'
                : 'layout-1'
            }`}
            style={{ '--gap-row': '40px', '--gap-column': '40px' }}
          >
            {Videos.map(el => (
              <div key={el._id} className='layoutFlex-item'>
                <Videosss
                  avatar={
                    el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path : null
                  }
                  video={el}
                  title={el.name}
                  description={el.description}
                  onClick={() => {
                    history.push('/watch?v=' + el.short_id);
                    window.scrollTo(0, 0);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {isLoading && (
          <Box className={classes.loading} p={3}>
            <CircularProgress color='inherit' />
          </Box>
        )}
      </div>
    </div>
  );
};

export default Watch;
