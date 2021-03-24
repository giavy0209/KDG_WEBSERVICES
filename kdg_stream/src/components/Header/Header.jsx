import React, { useCallback, useState } from 'react';
import * as IoIcon from 'react-icons/io';
import * as VscIcon from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import '../../assets/css/header.css';
import avatar0 from '../../assets/images/header/avatar0.png';
import diamond0 from '../../assets/images/header/diamond0.svg';
import logo from '../../assets/images/header/logo.svg';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';

const Header = () => {
  const [{ language, header }] = useLanguageLayerValue();
  const [width] = useWindowSize();
  const history = useHistory();
  const location = useLocation();

  const user = useSelector(state => state.user);
  const first_name = user?.kyc.first_name;
  const last_name = user?.kyc.last_name;
  const email = user?.email;
  const followNumber = useNumber(user?.follow?.length);

  const NBs = useNumber(10000);
  const [isShowBuyNB, setIsShowBuyNB] = useState(false);
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [isShowUserinfo, setIsShowUserinfo] = useState(false);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [isHaveNoti] = useState(false);

  const handleNavigation = useCallback(
    pathname => {
      if (location.pathname !== pathname) {
        history.push(pathname);
      }
    },
    [location, history]
  );

  return (
    <div className='header'>
      {isShowSearchBar && (
        <div className='header__searchBarCon'>
          <IoIcon.IoMdArrowBack
            className='header__iconHover'
            onClick={() => setIsShowSearchBar(false)}
          />
          <div className='header__searchBar'>
            <IoIcon.IoMdSearch className='header__searchIcon1 header__iconHover' />
            <input type='text' placeholder={header[language].search} />
          </div>
        </div>
      )}

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
            <button className='button-upload mr-10' onClick={() => history.push('/upload')}>
              {header[language].upload}
            </button>
            <button className='button-upload' onClick={() => history.push('/setup')}>
              {header[language].setup}
            </button>
          </div>
        )}
      </div>

      <div className='header__right'>
        {user && (
          <>
            <div
              style={{ position: 'relative' }}
              onClick={e => {
                e.stopPropagation();
                setIsShowBuyNB(x => !x);
              }}
            >
              <button className={`button-buyNB ${isShowBuyNB ? 'show' : ''}`}>
                <img src={diamond0} alt='icon' className='mr-10' />
                <span>{header[language].buyNB}</span>
              </button>

              {isShowBuyNB && (
                <div className='popper-buyNB' onClick={e => e.stopPropagation()}>
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
              )}
            </div>

            <div className='header__notification' onClick={() => setIsShowNoti(x => !x)}>
              {isHaveNoti ? (
                <VscIcon.VscBellDot className='header__iconHover' />
              ) : (
                <VscIcon.VscBell className='header__iconHover' />
              )}
              {isShowNoti && (
                <div className='popper-notification' onClick={e => e.stopPropagation()}>
                  <div className='header__title'>
                    <p>{header[language].notification}</p>
                  </div>
                  <div className='header__emptyNotification'>
                    <p>{header[language].notihere}</p>
                    <p>{header[language].notidesc1}</p>
                  </div>
                </div>
              )}
            </div>

            <div
              className='header__userinfo'
              onClick={e => {
                e.stopPropagation();
                setIsShowUserinfo(x => !x);
              }}
            >
              <div className='header__avatar'>
                <img
                  src={user?.kyc.avatar ? STORAGE_DOMAIN + user?.kyc.avatar?.path : avatar0}
                  style={{
                    '--x': user?.kyc.avatar_pos ? user?.kyc.avatar_pos.x * -1 + '%' : 0,
                    '--y': user?.kyc.avatar_pos ? user?.kyc.avatar_pos.y * -1 + '%' : 0,
                    '--zoom': user?.kyc.avatar_pos ? user?.kyc.avatar_pos.zoom + '%' : '100%',
                  }}
                  alt=''
                  className='header__avatar-img'
                />
              </div>
              {isShowUserinfo && (
                <div className='popper-userinfo' onClick={e => e.stopPropagation()}>
                  <div className='header__info bb'>
                    <div className='header__info-avatar'>
                      <img
                        src={user?.kyc.avatar ? STORAGE_DOMAIN + user?.kyc.avatar?.path : avatar0}
                        alt=''
                        style={{
                          '--x': user?.kyc.avatar_pos ? user?.kyc.avatar_pos.x * -1 + '%' : 0,
                          '--y': user?.kyc.avatar_pos ? user?.kyc.avatar_pos.y * -1 + '%' : 0,
                          '--zoom': user?.kyc.avatar_pos ? user?.kyc.avatar_pos.zoom + '%' : '100%',
                        }}
                        className='header__info-avatar-img'
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
                        handleNavigation('/profile');
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
              )}
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
