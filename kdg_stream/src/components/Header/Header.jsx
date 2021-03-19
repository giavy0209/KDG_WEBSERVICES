import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/css/header.css';

import logo from '../../assets/images/header/logo.svg';
import diamond0 from '../../assets/images/header/diamond0.svg';
import diamond1 from '../../assets/images/header/diamond1.svg';
import avatar0 from '../../assets/images/header/avatar0.png';
import avatar1 from '../../assets/images/header/avatar1.png';
import * as IoIcon from 'react-icons/io';
import * as RiIcon from 'react-icons/ri';
import * as VscIcon from 'react-icons/vsc';

import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser, actionClearUser } from '../../store/action';
import { storage } from '../../helpers';
import useNumber from '../../hooks/useNumber';
import useWindowSize from '../../hooks/useWindowSize';

const Header = () => {
    const [{ language, header }] = useLanguageLayerValue();
    const [width] = useWindowSize();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const user_id = useSelector(state => state.user?._id);
    const first_name = useSelector(state => state.user?.first_name);
    const last_name = useSelector(state => state.user?.last_name);
    const email = useSelector(state => state.user?.email);
    const followNumber = useNumber(useSelector(state => state.user?.follow?.length));
    // const followNumber = useNumber(100000000);

    useEffect(() => {
        dispatch(actionGetUser());
    }, [dispatch]);

    const handleNavigation = useCallback(
        pathname => {
            location.pathname !== pathname && history.push(pathname);
        },
        [location, history]
    );

    const NBs = useNumber(10000);
    const [isShowBuyNB, setIsShowBuyNB] = useState(false);
    const [isShowNoti, setIsShowNoti] = useState(false);
    const [isShowUserinfo, setIsShowUserinfo] = useState(false);
    const [isShowSearchBar, setIsShowSearchBar] = useState(false);
    const [isHaveNoti] = useState(false);

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

                <div className='header__left--right'>
                    {width > 1500 ? (
                        <>
                            <button className='button-upload mr-20' onClick={() => handleNavigation('/upload')}>Upload</button>
                            <button
                                className='button-livenow'
                                onClick={() => handleNavigation('/setup')}
                            >
                                Setup
                            </button>
                        </>
                    ) : (
                        <>
                            <RiIcon.RiVideoUploadLine className='header__iconHover mr-30' onClick={() => handleNavigation('/upload')} />
                            <RiIcon.RiLiveLine
                                className='header__iconHover'
                                onClick={() => handleNavigation('/setup')}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className='header__right'>
                <div
                    style={{ position: 'relative' }}
                    onClick={e => {
                        e.stopPropagation();
                        setIsShowBuyNB(!isShowBuyNB);
                    }}
                >
                    {width > 1500 ? (
                        <button className={`button-buyNB ${isShowBuyNB ? 'show' : ''}`}>
                            <img src={diamond0} alt='icon' className='mr-10' />
                            <span>{header[language].buyNB}</span>
                        </button>
                    ) : (
                        <RiIcon.RiVipDiamondLine className='header__iconHover' />
                    )}
                    {isShowBuyNB && (
                        <div className='popper-buyNB' onClick={e => e.stopPropagation()}>
                            <div className='header__buyNB bb'>
                                <p className='header__NBquantity'>
                                    <span>{header[language].youhave}</span>
                                    <img src={diamond1} alt='icon' className='ml-10 mr-10' />
                                    <span>
                                        {NBs} {header[language].NBs}
                                    </span>
                                </p>
                                <p className='header__NBdesc'>{header[language].desc1}</p>
                                <p
                                    className='header__NBdetail'
                                    onClick={() => {
                                        handleNavigation('/profile');
                                        setIsShowBuyNB(false);
                                    }}
                                >
                                    {header[language].detail}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className='header__notification'
                    onClick={e => {
                        e.stopPropagation();
                        setIsShowNoti(!isShowNoti);
                    }}
                >
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

                {user_id ? (
                    <div
                        className='header__userinfo'
                        onClick={e => {
                            e.stopPropagation();
                            setIsShowUserinfo(!isShowUserinfo);
                        }}
                    >
                        <img src={true ? avatar1 : avatar0} alt='' className='header__avatar' />
                        {isShowUserinfo && (
                            <div className='popper-userinfo' onClick={e => e.stopPropagation()}>
                                <div className='header__info bb'>
                                    <img
                                        src={true ? avatar1 : avatar0}
                                        alt=''
                                        className='header__info-avatar'
                                    />
                                    <div>
                                        <p className='header__info-name'>
                                            {first_name && last_name
                                                ? `${first_name} ${last_name}`
                                                : email}
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
                                <div
                                    className='header__manage'
                                    onClick={() => {
                                        storage.clear();
                                        dispatch(actionClearUser());
                                        handleNavigation('/login');
                                    }}
                                >
                                    {header[language].logout}
                                </div>
                            </div>
                        )}
                    </div>
                ) : width > 1500 ? (
                    <div className='header__login' onClick={() => handleNavigation('/login')}>
                        {header[language].login}
                    </div>
                ) : (
                    <RiIcon.RiLoginBoxLine
                        className='header__iconHover'
                        onClick={() => handleNavigation('/login')}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
