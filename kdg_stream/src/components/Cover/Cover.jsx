import React, { useState, useEffect } from 'react';
import '../../assets/css/cover.css';

import * as MdIcon from 'react-icons/md';
import * as IoIcon from 'react-icons/io';

import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { smoothscroll } from '../../helpers/';
import { useHistory } from 'react-router-dom';
import useNumber from '../../hooks/useNumber';

// import thumb1 from '../../assets/images/cover/thumb1.png';
// import thumb2 from '../../assets/images/cover/thumb2.jpg';
// import thumb3 from '../../assets/images/cover/thumb3.jpg';

const itemCover = 3;

const Cover = () => {
  const [{ language, cover }] = useLanguageLayerValue();
  const history = useHistory();
  const viewers = useNumber(11000);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let track = document.querySelector('.coverTrack');
    if (track) {
      let item = track.querySelector('.cover__item');
      if (item) {
        smoothscroll(track, track.scrollLeft, item.offsetWidth * activeIndex, 0, 0, 300);
      }
    }
  }, [activeIndex]);

  return (
    <div className='position-relative userSelect-none'>
      <div
        onClick={() => setActiveIndex(activeIndex - 1)}
        className={`coverBtn coverBtnLeft ${activeIndex > 0 ? 'show' : ''}`}
      >
        <MdIcon.MdKeyboardArrowLeft className='icon' />
      </div>
      <div
        onClick={() => setActiveIndex(activeIndex + 1)}
        className={`coverBtn coverBtnRight ${activeIndex < itemCover - 1 ? 'show' : ''}`}
      >
        <MdIcon.MdKeyboardArrowRight className='icon' />
      </div>
      <div
        className={`coverOverlay coverOverlayLeft ${activeIndex === itemCover - 1 ? 'show' : ''}`}
      ></div>
      <div
        className={`coverOverlay coverOverlayRight ${activeIndex === itemCover - 1 ? '' : 'show'}`}
      ></div>

      <div className='label-container'>
        <div className='label'>
          <p>{cover[language].live}</p>
        </div>
        <div className='label'>
          <IoIcon.IoIosEye className='icon' />
          <p>{viewers}</p>
        </div>
      </div>

      <div className='coverTrack'>
        <div className='cover' style={{ '--item': itemCover }}></div>
      </div>
    </div>
  );
};

export default Cover;
