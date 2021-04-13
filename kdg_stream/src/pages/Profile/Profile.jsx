import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as IoIcon from 'react-icons/io';
import * as FaIcon from 'react-icons/fa';
import * as RiIcon from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import '../../assets/css/profile.css';
import avatarDefault from '../../assets/images/avatarDefault.svg';
import coverDefault from '../../assets/images/coverDefault.png';
import callAPI from '../../axios';
import { Crop } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import { actChangeUploadStatus } from '../../store/action';
import MainContainer from './MainContainer';
import Modal from './Modal';
import ModalBody from './ModalBody';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const uid = new URLSearchParams(useLocation().search).get('uid');
  const user = useSelector(state => state.user);

  const uploadStatus = useSelector(state => state.uploadStatus);
  const [{ language, profile }] = useLanguageLayerValue();

  const [IsFollowed, setIsFollowed] = useState(false);
  const [UserOwner, setUserOwner] = useState({});

  const [VisiblePickAvatar, setVisiblePickAvatar] = useState(false);

  const [FullScreen, setFullScreen] = useState('');

  const [Image, setImage] = useState('');
  const [ImagePos, setImagePos] = useState({ zoom: 1, x: 0, y: 0 });

  const [Cover, setCover] = useState('');
  const [CoverPos, setCoverPos] = useState({ zoom: 1, x: 0, y: 0 });

  useEffect(() => {
    if (uid || !user) return;

    history.push(window.location.pathname + '?uid=' + user._id);
  }, [uid, user, history]);

  const onCancelCrop = useCallback(
    label => {
      dispatch(
        actChangeUploadStatus({
          ...uploadStatus,
          isShowCrop: false,
          _id: null,
        })
      );
      if (label === 'avatar-input') {
        setImage(uploadStatus.currentImage);
      }
      if (label === 'cover-input') {
        setCover(uploadStatus.currentImage);
      }
    },
    [uploadStatus, dispatch]
  );

  const onFinishCrop = useCallback(
    label => {
      dispatch(
        actChangeUploadStatus({
          ...uploadStatus,
          isShowCrop: false,
          _id: null,
        })
      );

      if (label === 'avatar-input') {
        setImage(uploadStatus.image);
        setImagePos(uploadStatus.imagePos);
      }
      if (label === 'cover-input') {
        setCover(uploadStatus.image);
        setCoverPos(uploadStatus.imagePos);
      }
    },
    [uploadStatus, dispatch]
  );

  const handlePickAvatar = useCallback(() => {
    setVisiblePickAvatar(true);
    dispatch(
      actChangeUploadStatus({
        ...uploadStatus,
        label: 'avatar-input',
        currentImage: Image,
      })
    );
  }, [uploadStatus, dispatch, Image]);

  const handlePickCover = useCallback(() => {
    setVisiblePickAvatar(true);
    dispatch(
      actChangeUploadStatus({
        ...uploadStatus,
        label: 'cover-input',
        currentImage: Cover,
      })
    );
  }, [uploadStatus, dispatch, Cover]);

  const readURLAvatar = useCallback(
    input => {
      input.persist();
      input = input.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = async function (e) {
          let buffer = e.target.result;
          let videoBlob = new Blob([new Uint8Array(buffer)]);
          let url = window.URL.createObjectURL(videoBlob);
          input.parentElement.nextElementSibling.querySelector('img').setAttribute('src', url);
          if (uploadStatus.label === 'avatar-input') {
            setImage(url);
          }
          if (uploadStatus.label === 'cover-input') {
            setCover(url);
          }
          dispatch(
            actChangeUploadStatus({
              ...uploadStatus,
              image: url,
              isShowCrop: true,
            })
          );
        };
        reader.readAsArrayBuffer(input.files[0]);
      }
    },
    [uploadStatus, dispatch]
  );

  // const fullScreenImage = useCallback(src => {
  //   setFullScreen(src);
  // }, []);

  const handleFollow = useCallback(async () => {
    if (uid) {
      const res = await callAPI.post('/follow?id=' + uid);
      if (res.status === 1) {
        setIsFollowed(x => !x);
      }
    }
  }, [uid]);

  useMemo(() => {
    if (uid) {
      callAPI.get('/user?uid=' + uid).then(res => {
        setUserOwner(res.data);
        setIsFollowed(res.data.isFollowed);
        setImage(
          res.data.kyc.avatar?.path ? STORAGE_DOMAIN + res.data.kyc.avatar?.path : avatarDefault
        );
        setImagePos(
          res.data?.kyc?.avatar_pos ? res.data.kyc.avatar_pos : { x: 0, y: 0, zoom: 100 }
        );
        // setCover(
        //   res.data.kyc.cover?.path ? STORAGE_DOMAIN + res.data.kyc.cover?.path : coverDefault
        // );
        setCover(coverDefault);
        setCoverPos(res.data?.kyc?.cover_pos ? res.data.kyc.cover_pos : { x: 0, y: 0, zoom: 100 });
      });
    }
  }, [uid]);

  return (
    <div className='profile'>
      {FullScreen && (
        <div onClick={() => setFullScreen(null)} className='fullscreen-mask'>
          <img src={FullScreen} alt='' className='fullscreen' />
        </div>
      )}

      <Modal
        visible={VisiblePickAvatar}
        onCancle={() => setVisiblePickAvatar(false)}
        title={'Avatar'}
        content={<ModalBody />}
      />

      {uploadStatus?.isShowCrop && <Crop onCancel={onCancelCrop} onFinish={onFinishCrop} />}

      <div className='profile__center mt-10'>
        <div className='profile__cover'>
          {uid === user?._id && (
            <form style={{ display: 'none' }} id='cover'>
              <input onChange={readURLAvatar} type='file' name='file' id='cover-input' />
            </form>
          )}

          <div htmlFor='cover-input' className='profile__cover-img'>
            {uid === user?._id && (
              <div onClick={handlePickCover} className='button'>
                <IoIcon.IoMdSettings className='icon' />
              </div>
            )}
            <img
              onClick={() => setFullScreen(Cover)}
              style={{
                '--x': CoverPos.x * -1 + '%',
                '--y': CoverPos.y * -1 + '%',
                '--zoom': CoverPos.zoom + '%',
              }}
              src={Cover}
              alt=''
            />
          </div>

          <div className='profile__cover-ctnInfo'>
            {uid === user?._id && (
              <form id='avatar'>
                <input
                  onChange={readURLAvatar}
                  style={{ display: 'none' }}
                  type='file'
                  name='file'
                  id='avatar-input'
                />
              </form>
            )}

            <div className='profile__cover-avatar'>
              {uid === user?._id && (
                <div onClick={handlePickAvatar} className='button'>
                  <FaIcon.FaCamera className='icon' />
                </div>
              )}
              <img
                onClick={() => setFullScreen(Image)}
                style={{
                  '--x': ImagePos.x * -1 + '%',
                  '--y': ImagePos.y * -1 + '%',
                  '--zoom': ImagePos.zoom + '%',
                }}
                src={Image}
                alt=''
              />
            </div>

            <p className='profile__cover-name'>
              {UserOwner?.kyc?.first_name} {UserOwner?.kyc?.last_name}
            </p>

            <div className='layoutFlex layout-3' style={{ '--gap-column': '10px' }}>
              <div className='profile__cover-info layoutFlex-item'>
                <p>{profile[language].follower}</p>
                <p>{useNumber(UserOwner.total_follows)}</p>
              </div>

              <div className='profile__cover-info layoutFlex-item'>
                <p>{profile[language].following}</p>
                <p>{useNumber(UserOwner.total_followed)}</p>
              </div>

              <div className='profile__cover-info layoutFlex-item'>
                <p>{profile[language].balance}</p>
                <p>{useNumber(0)}</p>
              </div>
            </div>
          </div>

          {/* {uid === user?._id && (
            <div className='profile__cover-ctnBtn'>
              <button className='button'>
                <IoIcon.IoMdSettings className='icon' />
                <span>{profile[language].setting}</span>
              </button>
            </div>
          )} */}

          {/* {uid !== user?._id && (
            <div className='profile__cover-ctnBtn'>
              <button onClick={handleFollow} className={`button ${IsFollowed ? 'active' : ''}`}>
                {IsFollowed ? (
                  <RiIcon.RiUserUnfollowLine className='icon' />
                ) : (
                  <RiIcon.RiUserFollowLine className='icon' />
                )}
                <span>{IsFollowed ? profile[language].unfollow : profile[language].follow}</span>
              </button>
            </div>
          )} */}
        </div>

        <MainContainer uid={uid} user={user} />
      </div>
    </div>
  );
};

export default Profile;
