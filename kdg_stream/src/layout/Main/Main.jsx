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
  const [bannerHeight, setbannerHeight] = useState('0px');

  // const [Count,setCount] = useState(0)
  // useEffect(() => {
  //   if(window.scrollY === 1) {
  //     return
  //   }
  //   window.scrollTo(0,1)
  //   setCount(Count + 1)
  // }, [Count]);

  useEffect(() => {
    const bannerEle = document.querySelector('.banner');
      if (!bannerEle) return setbannerHeight(0 + 'px')

      setbannerHeight(bannerEle.clientHeight + 'px');
  },[]);

  useEffect(() => {
    const handlePositionRight = () => {
      console.log(rightRef.current);
      // if (!rightRef.current) return;

      const footerEle = document.querySelector('.footer');
      const headerEle = document.querySelector('.header');
      const { top } = headerEle.getBoundingClientRect();

      const totalHeight =
        footerEle.clientHeight +
        headerEle.clientHeight +
        Number(bannerHeight.replace('px', '')) +
        20;
      console.log(totalHeight , 'height');
      console.log(footerEle.clientHeight , 'footerEle');
      console.log(headerEle.clientHeight , 'headerEle');
      if (window.pageYOffset < totalHeight - headerEle.clientHeight) {
      console.log(rightRef.current , 123);
      rightRef.current.style.top = totalHeight - window.pageYOffset + 'px';
        return;
      }

      rightRef.current.style.top = top + headerEle.clientHeight + 20 + 'px';
    };
    handlePositionRight()

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
        '--banner-height': bannerHeight
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
