import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../../assets/css/popup.scss';
import { useLang } from '../../context/LanguageLayer';
import CloseIcon from './CloseIcon';

const popupLanguage = {
  vi: {
    swapnow: 'Chuyển đổi ngay',
    backgroundImageURL: '/images/popup/bg1.png',
  },
  en: {
    swapnow: 'Swap now',
    backgroundImageURL: '/images/popup/bg2.png',
  },
};

export default function Popup() {
  const history = useHistory();
  const [{ language }] = useLang();

  const [isShow, setIsShow] = useState(true);

  const handleHidePopup = useCallback(() => setIsShow(false), []);

  useEffect(() => {
    const hidePopup = e => e.keyCode === 27 && isShow && setIsShow(false);
    window.addEventListener('keyup', hidePopup);
    return () => window.removeEventListener('keyup', hidePopup);
  }, [isShow]);

  return (
    <div className={`popup ${isShow ? 'show' : 'hide'}`}>
      <div className='popup__mask' onClick={handleHidePopup}></div>

      <div
        className='popup__content'
        style={{ backgroundImage: `url(${popupLanguage[language].backgroundImageURL})` }}
      >
        <CloseIcon className='popup__closeicon' onClick={handleHidePopup} />

        <div
          className='popup__swapbutton'
          onClick={() => {
            setIsShow(false);
            history.push('/wallet');
            window.scrollTo(0, 600);
          }}
        >
          {popupLanguage[language].swapnow}
        </div>
      </div>
    </div>
  );
}
