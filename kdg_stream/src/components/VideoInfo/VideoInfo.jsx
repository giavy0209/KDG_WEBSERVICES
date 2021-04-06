import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as BiIcon from 'react-icons/bi';
import * as RiIcon from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar } from '..';
import '../../assets/css/video-info.css';
import callAPI from '../../axios';
import { BREAK_POINT_SMALL, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertDate, convertDateAgo, rippleEffect } from '../../helpers';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';

const VideoInfo = props => {
  const { id, type = 'watch' } = props;

  const history = useHistory();
  const [width] = useWindowSize();
  const user = useSelector(state => state.user);
  const [{ videoinfo, language }] = useLanguageLayerValue();

  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [convert, setConvert] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const [video, setVideo] = useState(null);

  const [comments, setComments] = useState([]);
  const [totalComment, setTotalComment] = useState(0);

  const _totalComment = useNumber(totalComment);

  const [totalFollow, setTotalFollow] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleEdit = useCallback(e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {};
    for (const x of formData) {
      data[x[0]] = x[1];
    }

    console.log(data);
  }, []);

  const handleFollow = useCallback(async () => {
    const res = await callAPI.post('follow?id=' + video?.user._id);
    if (res.status === 1) {
      setIsFollowed(x => !x);
    }
  }, [video]);

  const handleComment = useCallback(
    async e => {
      e.preventDefault();

      if (video?._id) {
        const data = new FormData(e.target);
        const res = await callAPI.post(`/comment?video=${video._id}`, {
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
    [video]
  );

  const handleGetComment = useCallback(async (videoId, next) => {
    const res = await callAPI.get(`/comment?video=${videoId}&next=${next}`);
    setComments(comment => [...comment, ...res.data]);
    setTotalComment(res.total);
  }, []);

  useMemo(() => {
    if (id) {
      if (type === 'watch') {
        callAPI.get('/video?sid=' + id).then(res => {
          setVideo(res.data);
          setIsFollowed(res.is_followed);
          setTotalFollow(res.data.user?.kinglive?.total_follower);
          handleGetComment(res.data._id);
        });
      } else {
        callAPI.get('/streamming?id=' + id).then(res => {
          console.log(res);
          setVideo(res.data);
          setIsFollowed(res.is_followed);
          setTotalFollow(res.data.user?.kinglive?.total_follower);
        });
      }
    }
  }, [id, type, handleGetComment]);

  useEffect(() => {
    const hideMenu1 = () => {
      showMenu && setShowMenu(false);
    };

    const hideMenu2 = e => {
      if (e.keyCode !== 27) return;
      showMenu && setShowMenu(false);
      showEdit && setShowEdit(false);
    };

    window.addEventListener('click', hideMenu1);
    window.addEventListener('keyup', hideMenu2);

    return () => {
      window.removeEventListener('click', hideMenu1);
      window.removeEventListener('keyup', hideMenu2);
    };
  }, [showMenu, showEdit]);

  return (
    <div className='videoInfo'>
      {showEdit && (
        <div className='popupBox' onClick={e => e.stopPropagation()}>
          <div className='mask' onClick={() => setShowEdit(false)}></div>

          <form className='content' onSubmit={handleEdit}>
            <div className='label'>Title</div>
            <input type='text' name='title' defaultValue={video?.name} />

            <div className='label'>Description</div>
            <textarea name='description' defaultValue={video?.description}></textarea>

            <button style={{ width: '100%' }} className='button'>
              Edit
            </button>
          </form>
        </div>
      )}

      <div className='videoInfo__info'>
        <div className='videoInfo__titleVideo'>
          {video?.name}

          <div className='videoInfo__menuBox' onClick={() => setShowMenu(x => !x)}>
            <div className='rippleBox' onClick={rippleEffect}></div>

            <BiIcon.BiDotsVerticalRounded className='menu-icon' />

            <div className={`menu ${showMenu ? 'show' : ''}`}>
              <div className='menu-item' onClick={() => setShowEdit(true)}>
                <BiIcon.BiEditAlt className='icon' />
                Edit
              </div>
              <div className='menu-item'>
                <BiIcon.BiEditAlt className='icon' />
                Delete
              </div>
            </div>
          </div>
        </div>

        <div className='videoInfo__info-info'>
          <div
            className='videoInfo__avatar'
            onClick={() => history.push('/profile?uid=' + video?.user._id)}
          >
            <Avatar
              src={
                video?.user?.kyc.avatar?.path
                  ? STORAGE_DOMAIN + video?.user?.kyc.avatar?.path
                  : undefined
              }
              position={video?.user?.kyc.avatar_pos}
            />
          </div>

          <div>
            <div className='videoInfo__name'>
              {video?.user?.kyc.first_name} {video?.user?.kyc.last_name}
            </div>

            <div className='videoInfo__date' onClick={() => setConvert(x => !x)}>
              {convert ? convertDateAgo(video?.create_date) : convertDate(video?.create_date)}
            </div>

            <div className='videoInfo__view'>
              <span>
                {useNumber(video?.views)} {videoinfo[language].views}
              </span>
              <span> • </span>
              <span>
                {useNumber(totalFollow)} {videoinfo[language].followers}
              </span>
            </div>

            <div className={`videoInfo__desc ${showMore ? 'd-block' : ''}`}>
              {video?.description}
            </div>

            <div className='videoInfo__showMore' onClick={() => setShowMore(x => !x)}>
              {showMore ? videoinfo[language].hide : videoinfo[language].showmore}
            </div>
          </div>

          {user?._id !== video?.user._id && (
            <div className='videoInfo__action'>
              <button onClick={handleFollow} className={`button ${isFollowed ? 'active' : ''}`}>
                {isFollowed ? (
                  <RiIcon.RiUserUnfollowLine className='icon' />
                ) : (
                  <RiIcon.RiUserFollowLine className='icon' />
                )}
                {width > BREAK_POINT_SMALL && (
                  <span>
                    {isFollowed ? videoinfo[language].unfollow : videoinfo[language].follow}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {type === 'watch' && (
        <div className='videoInfo__comment'>
          <div className='videoInfo__comment-total'>
            {_totalComment} {videoinfo[language].comment}
          </div>

          <div className='videoInfo__comment-input'>
            <div className='left'>
              <Avatar
                src={user?.kyc.avatar?.path ? STORAGE_DOMAIN + user?.kyc.avatar?.path : undefined}
                position={user?.kyc.avatar_pos}
              />
            </div>

            <form onSubmit={handleComment} className='right'>
              <input placeholder={videoinfo[language].comment} type='text' name='comment' />
              <span className='effect'></span>
            </form>
          </div>

          <div className='videoInfo__comment-list'>
            {comments.map(o => (
              <div className='comment' key={o._id}>
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
                    <span>
                      {o.user.kyc.first_name} {o.user.kyc.last_name}
                    </span>
                    <span> • </span>
                    <span>5 minutes ago</span>
                  </div>
                  <div className='content'>{o.comment}</div>
                </div>
              </div>
            ))}

            <div
              className='videoInfo__showMore'
              onClick={() => handleGetComment(video._id, comments[comments.length - 1]?._id)}
            >
              {videoinfo[language].loadmore}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInfo;
