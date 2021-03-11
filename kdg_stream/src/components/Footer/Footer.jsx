import React, { useState } from 'react';
import '../../assets/css/footer.css';

import { Language } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { CHANGE_LANGUAGE } from '../../context/reducer';

import * as CgIcon from 'react-icons/cg';
import * as AiIcon from 'react-icons/ai';
import * as ImIcon from 'react-icons/im';

const Footer = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [{ language, footer }, dispatch] = useLanguageLayerValue();

    return (
        <div className='footer'>
            <p className='footer__copyright'>{footer[language].copyright}</p>
            <div className='footer__social'>
                <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                    <AiIcon.AiFillYoutube />
                </a>
                <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
                    <AiIcon.AiOutlineTwitter />
                </a>
                <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
                    <ImIcon.ImFacebook />
                </a>
                <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                    <AiIcon.AiFillInstagram />
                </a>
                <Language />
            </div>
            <div className='footer__menu' onClick={() => setIsShowSidebar(!isShowSidebar)}>
                <CgIcon.CgMenuGridO size={26} className='footer__menuIcon' />
                <div className={`footer__sidebarContainer ${isShowSidebar ? 'show' : ''}`}>
                    <div
                        className={`footer__sidebar ${isShowSidebar ? 'show' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div
                            className='footer__sidebarClose'
                            onClick={() => setIsShowSidebar(false)}
                        >
                            <CgIcon.CgClose size={30} />
                        </div>
                        <div className='footer__sidebarBody'>
                            <p className='footer__sidebarTitle'>{footer[language].language}</p>
                            <p
                                className='footer__sidebarRow1'
                                onClick={() => {
                                    dispatch({
                                        type: CHANGE_LANGUAGE,
                                        payload: 'vi',
                                    });
                                    setIsShowSidebar(false);
                                }}
                            >
                                Việt Nam
                            </p>
                            <p
                                className='footer__sidebarRow1 mb-10'
                                onClick={() => {
                                    dispatch({
                                        type: CHANGE_LANGUAGE,
                                        payload: 'en',
                                    });
                                    setIsShowSidebar(false);
                                }}
                            >
                                English
                            </p>
                            <p className='footer__sidebarTitle'>{footer[language].social}</p>
                            <a
                                href='https://www.youtube.com/'
                                target='_blank'
                                rel='noreferrer'
                                className='footer__sidebarRow2'
                            >
                                <AiIcon.AiFillYoutube />
                                Youtube
                            </a>
                            <a
                                href='https://www.twitter.com/'
                                target='_blank'
                                rel='noreferrer'
                                className='footer__sidebarRow2'
                            >
                                <AiIcon.AiOutlineTwitter />
                                Twitter
                            </a>
                            <a
                                href='https://www.facebook.com/'
                                target='_blank'
                                rel='noreferrer'
                                className='footer__sidebarRow2'
                            >
                                <ImIcon.ImFacebook />
                                Facebook
                            </a>
                            <a
                                href='https://www.instagram.com/'
                                target='_blank'
                                rel='noreferrer'
                                className='footer__sidebarRow2'
                            >
                                <AiIcon.AiFillInstagram />
                                Instagram
                            </a>
                        </div>
                        <p className={`footer__sidebarCopyright ${isShowSidebar ? 'show' : ''}`}>
                            {footer[language].copyright}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
