import React from 'react';
import { Avatar } from '..';
import '../../assets/css/video.css';
import avatar0 from '../../assets/images/header/avatar0.png';

const Video = props => {
  const {
    avatar = avatar0,
    avataPos,
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
          onMouseOver={e => {
            var targat = e.target;
            targat.setAttribute(
              'src',
              `https://vz-3f44931c-ed0.b-cdn.net/${video.guid}/preview.webp`
            );
          }}
          onMouseOut={e => {
            var targat = e.target;
            targat.setAttribute(
              'src',
              `https://vz-3f44931c-ed0.b-cdn.net/${video.guid}/thumbnail.jpg`
            );
          }}
          src={`https://vz-3f44931c-ed0.b-cdn.net/${video.guid}/thumbnail.jpg`}
          alt=''
        />
      </div>

      <div className='video__info mt-20'>
        <div className='video__info-ava'>
          <Avatar src={avatar} position={avataPos}/>
        </div>
        <div className='video__info-text'>
          <p className='video__info-text-title'>{title}</p>
          <p className='video__info-text-desc'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Video;
