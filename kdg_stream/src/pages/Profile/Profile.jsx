import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as FaIcon from 'react-icons/fa';
import * as RiIcon from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/css/profile.css';
import avatarDefault from '../../assets/images/avatarDefault.svg';
import coverDefault from '../../assets/images/coverDefault.png';
import callAPI from '../../axios';
import { Crop } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguage } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import { actChangeUploadStatus } from '../../store/action';
import MainContainer from './MainContainer';
import Modal from './Modal';
import ModalBody from './ModalBody';

const posImg = pos => ({
  '--x': pos.x * -1 + '%',
  '--y': pos.y * -1 + '%',
  '--zoom': pos.zoom + '%',
});

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const uid = new URLSearchParams(useLocation().search).get('uid');
  const user = useSelector(state => state.user);

  const uploadStatus = useSelector(state => state.uploadStatus);
  const [{ language, profile }] = useLanguage();

  const [IsFollowed, setIsFollowed] = useState(false);
  const [UserOwner, setUserOwner] = useState({});
  const kinglive = useMemo(() => UserOwner.kinglive, [UserOwner]);

  const [VisiblePickAvatar, setVisiblePickAvatar] = useState(false);

  const [FullScreen, setFullScreen] = useState('');

  const [Image, setImage] = useState('');
  const [ImagePos, setImagePos] = useState({ zoom: 100, x: 0, y: 0 });

  const [Cover, setCover] = useState('');
  const [CoverPos, setCoverPos] = useState({ zoom: 100, x: 0, y: 0 });

  const [videoStreamming, setVideoStreamming] = useState({});

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
      document.getElementById(label).value = null;
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

      setVisiblePickAvatar(false);
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

  const handleFollow = useCallback(async () => {
    if (uid) {
      try {
        const res = await callAPI.post('/follow?id=' + uid);

        if (res.status === 1) setIsFollowed(x => !x);
      } catch (error) {
        console.log({ error });
        toast(profile[language].fail);
      }
    }
  }, [uid, profile, language]);

  useEffect(() => {
    if (uid) {
      callAPI.get('/user?uid=' + uid).then(res => {
        document.title = res.data.kyc
          ? `${res.data.kyc.first_name} ${res.data.kyc.last_name}`
          : res.data.email;
        setUserOwner(res.data);
        setIsFollowed(res.data.isFollowed);
        setImage(
          res.data.kyc.avatar?.path ? STORAGE_DOMAIN + res.data.kyc.avatar?.path : avatarDefault
        );
        setImagePos(
          res.data?.kyc?.avatar_pos ? res.data.kyc.avatar_pos : { x: 0, y: 0, zoom: 100 }
        );
        setCover(
          res.data.kyc.cover?.path ? STORAGE_DOMAIN + res.data.kyc.cover?.path : coverDefault
        );
        setCoverPos(res.data?.kyc?.cover_pos ? res.data.kyc.cover_pos : { x: 0, y: 0, zoom: 100 });
      });

      callAPI.get('/streammings?uid=' + uid).then(res => {
        console.log('streammings?uid', res);
        setVideoStreamming(res.data);
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
        title={
          uploadStatus.label === 'cover-input'
            ? profile[language].change_cover
            : profile[language].change_avatar
        }
        content={<ModalBody />}
      />

      {uploadStatus?.isShowCrop && <Crop onCancel={onCancelCrop} onFinish={onFinishCrop} />}

      <div className='profile__cover'>
        {uid === user?._id && (
          <form style={{ display: 'none' }} id='cover'>
            <input onChange={readURLAvatar} type='file' name='file' id='cover-input' />
          </form>
        )}

        <div className='profile__IMGcover'>
          <img onClick={() => setFullScreen(Cover)} style={posImg(CoverPos)} src={Cover} alt='' />
          <span></span>

          {uid === user?._id && (
            <div onClick={handlePickCover} className='profile__IMGcover-button'>
              <FaIcon.FaCamera className='icon' />
              <span>{profile[language].change_cover}</span>
            </div>
          )}

          {user && user._id !== uid && (
            <div className='profile__action'>
              <button
                onClick={handleFollow}
                className={`profile__action-button ${IsFollowed ? 'active' : ''}`}
              >
                {IsFollowed ? (
                  <RiIcon.RiUserUnfollowLine className='icon' />
                ) : (
                  <RiIcon.RiUserFollowLine className='icon' />
                )}
                <span>{IsFollowed ? profile[language].unfollow : profile[language].follow}</span>
              </button>
            </div>
          )}
        </div>

        {uid === user?._id && (
          <form style={{ display: 'none' }} id='avatar'>
            <input onChange={readURLAvatar} type='file' name='file' id='avatar-input' />
          </form>
        )}

        <div className='profile__infoBox'>
          <div className='profile__IMGavatarBox'>
            <div className='profile__IMGavatar'>
              <img
                onClick={() => setFullScreen(Image)}
                style={posImg(ImagePos)}
                src={Image}
                alt=''
              />
              <span></span>
            </div>

            {uid === user?._id && (
              <div onClick={handlePickAvatar} className='profile__IMGavatarBox-button'>
                <FaIcon.FaCamera className='icon' />
              </div>
            )}
          </div>

          <div className='profile__name'>
            {UserOwner.kyc?.first_name} {UserOwner.kyc?.last_name}
          </div>

          <div className='layoutFlex layout-3' style={{ '--gap-column': '10px' }}>
            <div className='layoutFlex-item profile__info'>
              <p>{profile[language].followers}</p>
              <p>{useNumber(kinglive?.total_follower)}</p>
            </div>

            <div className='layoutFlex-item profile__info'>
              <p>{profile[language].following}</p>
              <p>{useNumber(kinglive?.total_followed)}</p>
            </div>

            <div className='layoutFlex-item profile__info'>
              <p>{profile[language].total_view}</p>
              <p>{useNumber(kinglive?.total_view)}</p>
            </div>
          </div>
        </div>
      </div>

      <MainContainer
        UserOwner={UserOwner}
        uid={uid}
        user={user}
        videoStreamming={videoStreamming}
      />
    </div>
  );
};

export default Profile;
