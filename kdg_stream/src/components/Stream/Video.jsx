import React from 'react';
import '../../assets/css/video.css';
import avatar0 from '../../assets/images/header/avatar0.png';
import { STORAGE_DOMAIN } from '../../constant';

const Video = props => {
  const {
    avatar = avatar0,
    title = 'Title',
    description = 'Description',
    onClick = null,
    video,
  } = props;

  const handleClick = () => onClick && onClick();

  return (
    <div className='video' onClick={handleClick}>
      <div className='video__thumb'>
        <img
          src={`${STORAGE_DOMAIN}${video.thumbnail.path}`}
          alt=''
        />
      </div>
      <div className='video__info mt-20'>
        <div className='video__info-ava'>
          <img src={avatar} alt='' />
        </div>
        <div className='video__info-text'>
          <p className='video__info-text1'>{title}</p>
          <p className='video__info-text2'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Video;