import React, { useCallback, useMemo, useState } from 'react';
import * as IoIcon from 'react-icons/io';
import * as RiIcon from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../../assets/css/profile.css';
import avatarDefault from '../../assets/images/avatarDefault.png';
import cover1 from '../../assets/images/profile/cover1.png';
import callAPI from '../../axios';
import { Crop } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import Videos from './MainContainer';
import Modal from './Modal';
import ModalBody from './ModalBody';

const Profile = () => {
  const uid = new URLSearchParams(useLocation().search).get('uid');
  let user = useSelector(state => state.user);
  const [{ language, profile }] = useLanguageLayerValue();
  const [IsFollowed, setIsFollowed] = useState(false);
  const [UserOwner, setUserOwner] = useState({});

  const [VisiblePickAvatar, setVisiblePickAvatar] = useState(false);

  const [IsShowCropAvatar, setIsShowCropAvatar] = useState(false);
  const [IsShowCropCover, setIsShowCropCover] = useState(false);

  const [Image, setImage] = useState('');
  const [ImagePos, setImagePos] = useState({ zoom: 1, x: 0, y: 0 });

  const [Cover, setCover] = useState('');
  const [CoverPos, setCoverPos] = useState({ zoom: 1, x: 0, y: 0 });

  const readURLAvatar = input => {
    input.persist();
    input = input.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = async function (e) {
        let buffer = e.target.result;
        let videoBlob = new Blob([new Uint8Array(buffer)]);
        let url = window.URL.createObjectURL(videoBlob);
        input.parentElement.nextElementSibling.querySelector('img').setAttribute('src', url);
        setCover(url);
        setIsShowCropAvatar(true);
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  };

  const readURLCover = input => {
    input.persist();
    input = input.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = async function (e) {
        let buffer = e.target.result;
        let videoBlob = new Blob([new Uint8Array(buffer)]);
        let url = window.URL.createObjectURL(videoBlob);
        input.parentElement.nextElementSibling.querySelector('img').setAttribute('src', url);
        setImage(url);
        setIsShowCropAvatar(true);
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  };

  const handleFollow = useCallback(async () => {
    if (uid) {
      const res = await callAPI.post('/follow?id=' + uid);
      if (res.status === 1) {
        setIsFollowed(!IsFollowed);
      }
    }
  }, [uid, IsFollowed]);

  useMemo(() => {
    if (uid) {
      callAPI.get('/user?uid=' + uid).then(res => {
        setUserOwner(res.data);
        setIsFollowed(res.data.isFollowed);
        setImage(
          res.data.kyc.avatar?.path ? STORAGE_DOMAIN + res.data.kyc.avatar?.path : avatarDefault
        );
        setImagePos(res.data?.kyc?.avatar_pos ? res.data.kyc.avatar_pos : { x: 0, y: 0, zoom: 1 });
        setCover(res.data.kyc.cover?.path ? STORAGE_DOMAIN + res.data.kyc.cover?.path : cover1);
        setCoverPos(res.data?.kyc?.cover_pos ? res.data.kyc.cover_pos : { x: 0, y: 0, zoom: 1 });
      });
    }
  }, [uid]);
  return (
    <div className='profile'>
      <Modal
        visible={VisiblePickAvatar}
        onCancle={() => setVisiblePickAvatar(false)}
        title={'Avatar'}
        content={<ModalBody />}
      />
      {IsShowCropAvatar && (
        <Crop
          Image={Image}
          ImagePos={ImagePos}
          setImage={setImage}
          setImagePos={setImagePos}
          setIsShowCrop={setIsShowCropAvatar}
          currentImage={
            user?.kyc?.avatar ? STORAGE_DOMAIN + user?.kyc?.avatar?.path : avatarDefault
          }
        />
      )}

      {IsShowCropCover && (
        <Crop
          Image={Cover}
          ImagePos={CoverPos}
          setImage={setCover}
          setImagePos={setCoverPos}
          setIsShowCrop={setIsShowCropCover}
          currentImage={user?.kyc?.avatar ? STORAGE_DOMAIN + user?.kyc?.cover?.path : cover1}
        />
      )}

      <div className='profile__center mt-10'>
        <div className='profile__cover'>
          {uid === user?._id && (
            <form style={{ display: 'none' }} id='cover'>
              <input onChange={readURLCover} type='file' name='file' id='cover-input' />
            </form>
          )}
          <label htmlFor='cover-input' className='profile__cover-img'>
            <img
              style={{
                '--x': Cover.x * -1 + '%',
                '--y': Cover.y * -1 + '%',
                '--zoom': Cover.zoom + '%',
              }}
              src={Cover}
              alt=''
            />
          </label>

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

            <div htmlFor='avatar-input' className='profile__cover-avatar'>
              {uid === user?._id && (
                <div onClick={() => setVisiblePickAvatar(true)} className='button'>
                  <IoIcon.IoMdSettings className='icon' />
                </div>
              )}
              <img
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

          {uid === user?._id && (
            <div className='profile__cover-ctnBtn'>
              <button className='button'>
                <IoIcon.IoMdSettings className='icon' />
                <span>{profile[language].setting}</span>
              </button>
            </div>
          )}

          {uid !== user?._id && (
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
          )}
        </div>

        <Videos uid={uid} user={user} />
      </div>
    </div>
  );
};

export default Profile;
