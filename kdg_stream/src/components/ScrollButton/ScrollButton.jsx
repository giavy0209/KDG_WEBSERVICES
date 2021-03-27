import React, { useEffect, useRef } from 'react';
import '../../assets/css/scroll-button.css';
import * as IoIcon from 'react-icons/io';

const ScrollButton = () => {
  const buttonRef = useRef();

  useEffect(() => {
    const handleScrollTop = () => {
      console.log(window.scrollY);

      if (!buttonRef.current) return;

      if (window.scrollY === 0) {
        buttonRef.current.classList.remove('show');
      } else {
        buttonRef.current.classList.add('show');
      }
    };

    window.addEventListener('scroll', handleScrollTop);

    return () => {
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div ref={buttonRef} className='scroll-button' onClick={handleClick}>
      <IoIcon.IoIosArrowUp className='icon' />
    </div>
  );
};

export default ScrollButton;
