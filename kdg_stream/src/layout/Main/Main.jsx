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
  const rightRef = useRef();

  const [isShow, setIsShow] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const bannerEle = document.querySelector('.banner');
    if (!bannerEle) return;

    setBannerHeight(bannerEle.clientHeight);
  }, []);

  useEffect(() => {
    const handlePositionRight = () => {
      const footerEle = document.querySelector('.footer');
      const headerEle = document.querySelector('.header');
      const { top } = headerEle.getBoundingClientRect();

      const totalHeight = footerEle.clientHeight + headerEle.clientHeight + bannerHeight + 20;

      if (!rightRef.current) return;

      if (window.pageYOffset < totalHeight - headerEle.clientHeight) {
        rightRef.current.style.top = totalHeight - window.pageYOffset + 'px';
        return;
      }

      rightRef.current.style.top = top + headerEle.clientHeight + 20 + 'px';
    };
    handlePositionRight();

    window.addEventListener('scroll', handlePositionRight);

    return () => {
      window.removeEventListener('scroll', handlePositionRight);
    };
  }, [bannerHeight]);

  return (
    <div
      className={`main ${className}`}
      style={{
        '--width-left': widthLeft,
        '--min-width-large': minWidthLeftLarge,
        '--min-width-extra-small': minWidthLeftSmall.current,
        '--banner-height': `${bannerHeight}px`,
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
