import React, { useCallback, useEffect, useState } from 'react';
import * as GoIcon from 'react-icons/go';
import * as IoIcon from 'react-icons/io';
import * as VscIcon from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Avatar } from '..';
import '../../assets/css/header.css';
import logo from '../../assets/images/logo.png';
import logoText from '../../assets/images/logotext.png';
import callAPI from '../../axios';
import {
  BREAK_POINT_992,
  BREAK_POINT_EXTRA_SMALL,
  BREAK_POINT_SMALL,
  STORAGE_DOMAIN,
} from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertDateAgo } from '../../helpers';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';
import { actChangeUnreadNoti } from '../../store/action';

const handleShowPopper = (fnMain, ...fnSubs) => () => {
  fnMain(x => !x);
  fnSubs.forEach(fnSub => fnSub());
};

const Header = () => {
  const [{ language, header }] = useLanguageLayerValue();
  const [width] = useWindowSize();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const unreadNoti = useSelector(state => state.unreadNoti);
  const noties = useSelector(state => state.noties);

  const email = user?.email;
  const first_name = user?.kyc.first_name;
  const last_name = user?.kyc.last_name;
  const followNumber = useNumber(user?.kinglive?.total_follower);

  const NBs = useNumber(10000);

  const [showSearch, setShowSearch] = useState(false);
  const [isShowBuyNB, setIsShowBuyNB] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleNavigation = useCallback(
    pathname => {
      if (location.pathname !== pathname) {
        history.push(pathname);
      }
    },
    [location, history]
  );

  const handleReaded = useCallback(async () => {
    if (unreadNoti > 0) {
      await callAPI.post('/readed');
      dispatch(actChangeUnreadNoti(0));
    }
  }, [unreadNoti, dispatch]);

  const handleType = useCallback(
    ({ type, data }) => {
      let text = header[language]['noti' + type];
      if (type === 101) text = text.replace('data', data.name);
      if (type === 102) text = text.replace('data1', data.name).replace('data2', data.video_name);
      if (type === 103) text = text.replace('data1', data.video_name);
      if (type === 104) text = text.replace('data1', data.name).replace('data2', data.video_name);
      if (type === 105) text = text.replace('data1', data.name);
      return text;
    },
    [header, language]
  );

  const handleClickNoti = useCallback(
    ({ type, data }) => {
      if (type === 101) history.push(`/profile?uid=${data.user}`);
      if (type === 102 || type === 103 || type === 104) history.push(`/watch?v=${data.video}`);
      if (type === 105) history.push(`/live?s=${data.video}`);
    },
    [history]
  );

  useEffect(() => {
    const handleHidePopper1 = () => {
      isShowBuyNB && setIsShowBuyNB(x => !x);
      showNoti && setShowNoti(x => !x);
      showInfo && setShowInfo(x => !x);
    };

    const handleHidePopper2 = e => {
      if (e.keyCode !== 27) return;
      isShowBuyNB && setIsShowBuyNB(x => !x);
      showNoti && setShowNoti(x => !x);
      showInfo && setShowInfo(x => !x);
    };

    document.addEventListener('click', handleHidePopper1);
    window.addEventListener('keyup', handleHidePopper2);

    return () => {
      document.removeEventListener('click', handleHidePopper1);
      window.removeEventListener('keyup', handleHidePopper2);
    };
  }, [isShowBuyNB, showNoti, showInfo]);

  return (
    <div className='header'>
      {showSearch && (
        <div className='header__searchBarContainer'>
          <IoIcon.IoMdArrowBack
            className='header__iconHover mr-20'
            onClick={() => setShowSearch(false)}
          />
          <div className='header__searchBar'>
            <IoIcon.IoMdSearch className='header__searchIcon1 header__iconHover' />
            <input type='text' placeholder={header[language].search} />
          </div>
        </div>
      )}

      <div className={`popper ${isShowBuyNB ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <div className='header__buyNB bb'>
          <p className='header__NBquantity'>
            <span>{`${header[language].youhave} ${NBs} ${header[language].NBs}`}</span>
          </p>
          <p className='header__NBdesc'>{header[language].desc1}</p>
          <p className='header__NBdetail' onClick={() => setIsShowBuyNB(false)}>
            {header[language].detail}
          </p>
        </div>
      </div>

      <div className={`popper ${showNoti ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <div className='main__title right pl-25 pr-25'>
          <p>{header[language].notification}</p>
        </div>

        {noties?.length === 0 ? (
          <div className='header__emptyNotification'>
            <p>{header[language].notihere}</p>
            <p>{header[language].notidesc1}</p>
          </div>
        ) : (
          noties?.map(o => (
            <div key={o._id} onClick={() => handleClickNoti(o)} className='header__notiItem'>
              <p>{handleType(o)}</p>
              <p className='header__noti-date'>{convertDateAgo(o.last_update)}</p>
            </div>
          ))
        )}
      </div>

      <div
        className={`popper popper--userinfo ${showInfo ? 'show' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className='header__info bb'>
          <div className='header__info-avatar'>
            <Avatar
              src={user?.kyc.avatar ? STORAGE_DOMAIN + user?.kyc.avatar?.path : undefined}
              position={user?.kyc.avatar_pos}
            />
          </div>
          <div>
            <p className='header__info-name'>
              {first_name || last_name ? `${first_name} ${last_name}` : email}
            </p>
            <p className='header__info-follow'>
              {followNumber} {header[language].followers}
            </p>
          </div>
        </div>
        <div className='bb pt-20 pb-20'>
          <div
            className='header__manage'
            onClick={() => {
              history.push('/profile?uid=' + user?._id);
              setShowInfo(false);
            }}
          >
            {header[language].personalinfo}
          </div>
          <div
            className='header__manage'
            onClick={() => {
              handleNavigation('/profile');
              setShowInfo(false);
            }}
          >
            {header[language].assetmanagement}
          </div>
        </div>
        <div className='header__manage' onClick={() => setShowInfo(false)}>
          {header[language].logout}
        </div>
      </div>

      <div className='header__left'>
        <div className='header__logo' onClick={() => handleNavigation('/home')}>
          {width > BREAK_POINT_EXTRA_SMALL ? (
            <img src={logoText} alt='logo' />
          ) : (
            <img src={logo} alt='logo' />
          )}
        </div>

        {width > BREAK_POINT_SMALL ? (
          <div className='header__search'>
            <IoIcon.IoMdSearch className='header__searchIcon1 header__iconHover' />
            <input type='text' placeholder={header[language].search} />
          </div>
        ) : (
          <IoIcon.IoMdSearch
            className='header__iconHover ml-20'
            onClick={() => setShowSearch(true)}
          />
        )}
      </div>

      <div className='header__right'>
        {user && (
          <>
            <button className='button header__button mr-10' onClick={() => history.push('/upload')}>
              {width > BREAK_POINT_992 ? (
                header[language].upload
              ) : (
                <GoIcon.GoCloudUpload className='icon' />
              )}
            </button>

            <button
              className={`button active header__button ${
                width <= BREAK_POINT_EXTRA_SMALL ? 'mr-20' : 'mr-40'
              }`}
              onClick={() => history.push('/setup')}
            >
              {width > BREAK_POINT_992 ? (
                header[language].setup
              ) : (
                <IoIcon.IoMdSettings className='icon' />
              )}
            </button>

            <div
              onClick={handleShowPopper(setShowNoti, handleReaded)}
              className={`header__noti header__iconHover ${
                width <= BREAK_POINT_EXTRA_SMALL ? 'mr-20' : 'mr-40'
              }`}
            >
              {unreadNoti > 0 && (
                <span className='header__noti-unread'>
                  <span>{unreadNoti <= 99 ? unreadNoti : '99+'}</span>
                </span>
              )}
              <VscIcon.VscBell />
            </div>

            <div className='header__avatar' onClick={handleShowPopper(setShowInfo)}>
              <Avatar
                src={user?.kyc.avatar ? STORAGE_DOMAIN + user?.kyc.avatar?.path : undefined}
                position={user?.kyc.avatar_pos}
              />
            </div>
          </>
        )}

        {!user && (
          <div className='header__login' onClick={() => handleNavigation('/login')}>
            {header[language].login}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
