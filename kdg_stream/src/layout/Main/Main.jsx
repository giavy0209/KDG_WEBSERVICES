import React, { useEffect, useRef, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/css/main.css';
import { BREAK_POINT_LARGE } from '../../constant';
import useWindowSize from '../../hooks/useWindowSize';

const Main = props => {
  const {
    className = '',
    left = 'left',
    right = undefined,
    widthLeft = '75%',
    minWidthLeftLarge = '400px',
  } = props;

  const [width] = useWindowSize();

  const minWidthLeftSmall = useRef('327px');
  const bannerHeight = useRef();
  const rightRef = useRef();

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const bannerEle = document.querySelector('.banner');
    if (!bannerEle) return (bannerHeight.current = '0px');

    bannerHeight.current = bannerEle.clientHeight + 'px';
  });

  useEffect(() => {
    const handlePositionRight = () => {
      if (!rightRef.current) return;

      const footerEle = document.querySelector('.footer');
      const headerEle = document.querySelector('.header');
      const { top } = headerEle.getBoundingClientRect();

      const totalHeight =
        footerEle.clientHeight +
        headerEle.clientHeight +
        Number(bannerHeight.current.replace('px', '')) +
        20;

      if (window.pageYOffset < totalHeight - headerEle.clientHeight) {
        rightRef.current.style.top = totalHeight - window.pageYOffset + 'px';
        return;
      }

      rightRef.current.style.top = top + headerEle.clientHeight + 20 + 'px';
    };

    window.addEventListener('scroll', handlePositionRight);

    return () => {
      window.removeEventListener('scroll', handlePositionRight);
    };
  }, []);

  return (
    <div
      className={`main ${className}`}
      style={{
        '--width-left': widthLeft,
        '--min-width-large': minWidthLeftLarge,
        '--min-width-extra-small': minWidthLeftSmall.current,
        '--banner-height': bannerHeight.current,
      }}
    >
      <div className='main__left'>{left}</div>

      {right && (
        <div ref={rightRef} className={`main__right ${isShow ? 'show' : ''}`}>
          {width <= BREAK_POINT_LARGE && (
            <div
              className={`main__arrow ${isShow ? 'show' : ''}`}
              onClick={() => setIsShow(x => !x)}
            >
              <MdIcon.MdKeyboardArrowLeft className='icon' />
            </div>
          )}

          {right}
        </div>
      )}
    </div>
  );
};

export default Main;
