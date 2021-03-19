import React from 'react';
import '../../assets/css/video.css';

import avatar0 from '../../assets/images/header/avatar0.png';

const Video = props => {
    const {
        avatar = avatar0,
        title = 'Title',
        description = 'Description',
        onClick,
        video
    } = props;
    return (
        <div className='video' onClick={onClick}>
            <div className='video__thumb'>
                <img 
                onMouseOver={e => {
                    var targat = e.target
                    targat.setAttribute('src' , `https://vz-3f44931c-ed0.b-cdn.net/${video.guid}/preview.webp`)
                }} 
                onMouseOut={e => {
                    var targat = e.target
                    targat.setAttribute('src' , `https://vz-3f44931c-ed0.b-cdn.net/${video.guid}/thumbnail.jpg`)
                }} 
                
                src={`https://vz-3f44931c-ed0.b-cdn.net/${video.guid}/thumbnail.jpg`} alt='' />
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
