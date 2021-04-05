import { CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import * as RiIcon from 'react-icons/ri';
import * as BiIcon from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import '../../assets/css/watch.css';
import callAPI from '../../axios';
import { Avatar, Stream, Video as Videosss } from '../../components';
import { BREAK_POINT_MEDIUM, BREAK_POINT_SMALL, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertDate, convertDateAgo } from '../../helpers';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';

const Watch = () => {
  const history = useHistory();
  const id = new URLSearchParams(useLocation().search).get('v');
  
  const user = useSelector(state => state.user);

  const [width] = useWindowSize();
  const [{ language, watch }] = useLanguageLayerValue();

  const [convert, setConvert] = useState(true);

  const [Video, setVideo] = useState(null);

  const [Comments, setComments] = useState([]);
  const [TotalComment, setTotalComment] = useState(0);

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

  const handleGetComment = useCallback(async (videoId, next) => {
    const res = await callAPI.get(`/comment?video=${videoId}&next=${next}`);
    setComments(comment => [...comment,...res.data]);
    setTotalComment(res.total);
  }, []);

  useMemo(() => {
    if (id) {
      callAPI.get('/video?sid=' + id).then(res => {
        setVideo(res.data);
        setIsFollowed(res.is_followed);
        setTotalFollow(res.data.user?.kinglive?.total_follower);
        handleGetComment(res.data._id);
      });
    }
  }, [id, handleGetComment]);

  const handleFollow = useCallback(async () => {
    const res = await callAPI.post('follow?id=' + Video?.user._id);
    if (res.status === 1) {
      setIsFollowed(!IsFollowed);
    }
  }, [Video, IsFollowed]);

  const handleComment = useCallback(
    async e => {
      e.preventDefault();
      if (Video?._id) {
        const data = new FormData(e.target);
        const res = await callAPI.post(`/comment?video=${Video._id}`, {
          comment: data.get('comment'),
        });
        console.log(res);
        setComments(comments => {
          console.log(comments);
          return [res.data, ...comments];
        });
        e.target.reset();
      }
    },
    [Video]
  );

  useEffect(() => {
    console.log(Comments);
  }, [Comments]);

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const hideMenu1 = () => {
      isShowMenu && setIsShowMenu(false);
      isEdit && setIsEdit(false);
    };

    const hideMenu2 = e => {
      if (e.keyCode !== 27) return;
      isShowMenu && setIsShowMenu(false);
      isEdit && setIsEdit(false);
    };

    window.addEventListener('click', hideMenu1);
    window.addEventListener('keyup', hideMenu2);

    return () => {
      window.removeEventListener('click', hideMenu1);
      window.removeEventListener('keyup', hideMenu2);
    };
  }, [isShowMenu, isEdit]);

  const handleSubmitEdit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {};
    for (const x of formData) {
      data[x[0]] = x[1];
    }

    console.log(data);
  };

  return (
    <div className='watch'>
      {isEdit && (
        <div className='popup-edit' onClick={e => e.stopPropagation()}>
          <form onSubmit={handleSubmitEdit}>
            <div className='label'>Title</div>
            <input type='text' name='title' defaultValue={Video?.name} />

            <div className='label'>Description</div>
            <textarea name='description' defaultValue={Video?.description}></textarea>

            <button className='button'>Edit</button>
          </form>
        </div>
      )}

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
          <div className='watch__titleVideo'>
            {Video?.name}

            <div className='iconBox' onClick={() => setIsShowMenu(x => !x)}>
              <BiIcon.BiDotsVerticalRounded className='icon' />

              <div className={`menu ${isShowMenu ? 'show' : ''}`}>
                <div className='menu-item' onClick={() => setIsEdit(true)}>
                  <BiIcon.BiEditAlt className='icon' />
                  Edit
                </div>
                <div className='menu-item'>
                  <BiIcon.BiEditAlt className='icon' />
                  Report
                </div>
                <div className='menu-item'>
                  <BiIcon.BiEditAlt className='icon' />
                  Delete
                </div>
              </div>
            </div>
          </div>

          <div className='watch__info-info'>
            <div
              className='watch__avatar'
              onClick={() => history.push('/profile?uid=' + Video?.user._id)}
            >
              <Avatar
                src={
                  Video?.user.kyc.avatar ? STORAGE_DOMAIN + Video?.user?.kyc.avatar.path : undefined
                }
                position={Video?.user.kyc.avatar_pos}
              />
            </div>

            <div>
              <div className='watch__name'>
                {Video?.user.kyc.first_name} {Video?.user.kyc.last_name}
              </div>

              <div className='watch__date' onClick={() => setConvert(x => !x)}>
                {convert ? convertDateAgo(Video?.create_date) : convertDate(Video?.create_date)}
              </div>

              <div className='watch__view'>
                <span>
                  {useNumber(Video?.views)} {watch[language].views}
                </span>
                <span> • </span>
                <span>
                  {useNumber(TotalFollow)} {watch[language].followers}
                </span>
              </div>

              <div className={`watch__desc ${isShowMore ? 'd-block' : ''}`}>
                {Video?.description}
              </div>

              <div className='watch__showMore' onClick={() => setIsShowMore(x => !x)}>
                {isShowMore ? watch[language].hide : watch[language].showmore}
              </div>
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

        <div className='watch__comment'>
          <div className='watch__comment-total'>{useNumber(TotalComment)} Bình luận</div>
          <div className='watch__comment-input'>
            <div className='left'>
              <Avatar
                src={
                  user?.kyc.avatar?.path
                    ? STORAGE_DOMAIN + user?.kyc.avatar?.path
                    : undefined
                }
                position={user?.kyc.avatar_pos}
              />
            </div>

            <form onSubmit={handleComment} className='right'>
              <input placeholder='Bình luận' type='text' name='comment' />
            </form>
          </div>
          <div className='watch__comment-list'>
            {Comments.map(o => (
              <div className='comment'>
                <div className='left'>
                  <Avatar
                    src={
                      o?.user?.kyc.avatar?.path
                        ? STORAGE_DOMAIN + o?.user?.kyc.avatar?.path
                        : undefined
                    }
                    position={o?.user?.kyc.avatar_pos}
                  />
                </div>

                <div className='right'>
                  <div className='name'>
                    {o.user.kyc.first_name} {o.user.kyc.last_name}
                  </div>
                  <div className='content'>{o.comment}</div>
                </div>
              </div>
            ))}
            <div onClick={()=>handleGetComment(Video._id , Comments[Comments.length - 1]?._id)} className="button mt-20">{watch[language].loadmore}</div>
          </div>
        </div>
      </div>

      <div className='watch__right'>
        {Streammings.length > 0 && (
          <div className='watch__titleList' onClick={() => setIsShowStreammings(x => !x)}>
            <span>{watch[language].watchlive}</span>
            <MdIcon.MdArrowDropDown className={isShowStreammings ? 'down' : 'up'} />
          </div>
        )}

        {isShowStreammings && (
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
            {Streammings.map(el => (
              <div key={el._id} className='layoutFlex-item'>
                <Stream
                  video={el}
                  title={el.name}
                  description={el.description}
                  avataPos={el.user?.kyc?.avatar_pos}
                  avatar={
                    el.user?.kyc.avatar?.path
                      ? STORAGE_DOMAIN + el.user?.kyc.avatar?.path
                      : undefined
                  }
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
          <div className='watch__titleList' onClick={() => setIsShowRecommend(x => !x)}>
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
                  avataPos={el.user?.kyc?.avatar_pos}
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
          <CircularProgress
            color='inherit'
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              margin: '20px',
              color: '#e41a7f',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Watch;
