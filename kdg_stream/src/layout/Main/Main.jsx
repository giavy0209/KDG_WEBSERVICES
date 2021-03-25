import React, { useEffect, useRef, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/css/main.css';
import { BREAK_POINT_LARGE } from '../../constant';
import useWindowSize from '../../hooks/useWindowSize';

const Main = props => {
  const {
    className = '',
    left = 'left',
    right = 'right',
    widthLeft = '75%',
    minWidthLeftLarge = '400px',
  } = props;

  const minWidthLeftSmall = useRef('327px');

  const [width] = useWindowSize();

  const [isShow, setIsShow] = useState(false);
  const rightRef = useRef();

  useEffect(() => {
    document.body.onscroll = () => {
      const header = document.querySelector('.header');
      const { top } = header.getBoundingClientRect();

      rightRef.current.style.top = top + header.clientHeight + 10 + 'px';
    };

    return () => {
      document.body.onscroll = null;
    };
  }, []);

  return (
    <div
      className={`main ${className}`}
      style={{
        '--width-left': widthLeft,
        '--min-width-large': minWidthLeftLarge,
        '--min-width-extra-small': minWidthLeftSmall.current,
      }}
    >
      <div className='main__left'>{left}</div>

      <div ref={rightRef} className={`main__right ${isShow ? 'show' : ''}`}>
        {width <= BREAK_POINT_LARGE && (
          <div className={`main__arrow ${isShow ? 'show' : ''}`} onClick={() => setIsShow(x => !x)}>
            <MdIcon.MdKeyboardArrowLeft className='icon' />
          </div>
        )}

        {right}
      </div>
    </div>
  );
};

export default Main;
