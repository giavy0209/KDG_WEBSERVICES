import React, { useCallback, useEffect, useState } from 'react';
import * as GoIcon from 'react-icons/go';
import * as IoIcon from 'react-icons/io';
import * as RiIcon from 'react-icons/ri';
import * as VscIcon from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Avatar } from '..';
import '../../assets/css/header.css';
import diamond0 from '../../assets/images/header/diamond0.svg';
import logo from '../../assets/images/header/logo.svg';
import { BREAK_POINT_MEDIUM, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';

const handleShowPopper = fn => () => fn(x => !x);

const Header = () => {
  const [{ language, header }] = useLanguageLayerValue();
  const [width] = useWindowSize();
  const history = useHistory();
  const location = useLocation();

  const user = useSelector(state => state.user);
  const first_name = user?.kyc.first_name;
  const last_name = user?.kyc.last_name;
  const email = user?.email;
  const followNumber = useNumber(user?.kinglive?.total_follower);

  const NBs = useNumber(10000);

  const [isShowBuyNB, setIsShowBuyNB] = useState(false);
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [isShowUserinfo, setIsShowUserinfo] = useState(false);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  const handleNavigation = useCallback(
    pathname => {
      if (location.pathname !== pathname) {
        history.push(pathname);
      }
    },
    [location, history]
  );

  useEffect(() => {
    const handleHidePopper = () => {
      isShowBuyNB && setIsShowBuyNB(x => !x);
      isShowNoti && setIsShowNoti(x => !x);
      isShowUserinfo && setIsShowUserinfo(x => !x);
    };

    document.addEventListener('click', handleHidePopper);

    return () => {
      document.removeEventListener('click', handleHidePopper);
    };
  }, [isShowBuyNB, isShowNoti, isShowUserinfo]);

  useEffect(() => {
    const handleHidePopper = e => {
      if (e.keyCode === 27) {
        isShowBuyNB && setIsShowBuyNB(x => !x);
        isShowNoti && setIsShowNoti(x => !x);
        isShowUserinfo && setIsShowUserinfo(x => !x);
      }
    };

    window.addEventListener('keyup', handleHidePopper);

    return () => {
      window.removeEventListener('keyup', handleHidePopper);
    };
  }, [isShowBuyNB, isShowNoti, isShowUserinfo]);

  return (
    <div className='header'>
      {isShowSearchBar && (
        <div className='header__searchBarCon'>
          <IoIcon.IoMdArrowBack
            className='header__iconHover mr-20'
            onClick={() => setIsShowSearchBar(false)}
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

      <div className={`popper ${isShowNoti ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <div className='header__title'>
          <p>{header[language].notification}</p>
        </div>
        <div className='header__emptyNotification'>
          <p>{header[language].notihere}</p>
          <p>{header[language].notidesc1}</p>
        </div>
      </div>

      <div
        className={`popper popper--userinfo ${isShowUserinfo ? 'show' : ''}`}
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
              setIsShowUserinfo(false);
            }}
          >
            {header[language].personalinfo}
          </div>
          <div
            className='header__manage'
            onClick={() => {
              handleNavigation('/profile');
              setIsShowUserinfo(false);
            }}
          >
            {header[language].assetmanagement}
          </div>
        </div>
        <div className='header__manage' onClick={() => setIsShowUserinfo(false)}>
          {header[language].logout}
        </div>
      </div>

      <div className='header__left'>
        <div className='header__left--left'>
          <div className='header__logo' onClick={() => handleNavigation('/home')}>
            <img src={logo} alt='logo' />
          </div>

          {width > 768 ? (
            <div className='header__search'>
              <IoIcon.IoMdSearch className='header__searchIcon1 header__iconHover' />
              <input type='text' placeholder={header[language].search} />
            </div>
          ) : (
            <IoIcon.IoMdSearch
              className='header__iconHover ml-20'
              onClick={() => setIsShowSearchBar(true)}
            />
          )}
        </div>

        {user && (
          <div className='header__left--right'>
            <button className='button header__button mr-10' onClick={() => history.push('/upload')}>
              {width > BREAK_POINT_MEDIUM ? (
                header[language].upload
              ) : (
                <GoIcon.GoCloudUpload className='icon' />
              )}
            </button>
            <button className='button header__button' onClick={() => history.push('/setup')}>
              {width > BREAK_POINT_MEDIUM ? (
                header[language].setup
              ) : (
                <IoIcon.IoMdSettings className='icon' />
              )}
            </button>
          </div>
        )}
      </div>

      <div className='header__right'>
        {user && (
          <>
            {width > BREAK_POINT_MEDIUM ? (
              <button
                className={`button-buyNB ${isShowBuyNB ? 'show' : ''}`}
                onClick={handleShowPopper(setIsShowBuyNB)}
              >
                <img src={diamond0} alt='icon' className='mr-10' />
                <span>{header[language].buyNB}</span>
              </button>
            ) : (
              <RiIcon.RiVipDiamondLine
                className='header__iconHover'
                onClick={handleShowPopper(setIsShowBuyNB)}
              />
            )}

            <VscIcon.VscBell
              className='header__iconHover'
              onClick={handleShowPopper(setIsShowNoti)}
            />

            <div className='header__avatar' onClick={handleShowPopper(setIsShowUserinfo)}>
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
