import PropTypes from 'prop-types';
import React from 'react';
import video1 from '../../assets/images/setup/video1.png';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import ReactHlsPlayer from 'react-hls-player';
import { PLAY_STREAM } from '../../constant';
const SetupLeft = props => {
  const { Stream } = props;
  const [{ language, setup }] = useLanguageLayerValue();

  return (
    <>
      <div className='main__title'>
        <p>{setup[language].preview}</p>
      </div>

      <div className='setup__video'>
        {Stream?.connect_status !== 1 ? (
          <>
            <img src={video1} alt='' />
            <div className={`setup__video-blur show`}></div>
          </>
        ) : (
          <ReactHlsPlayer
          src={`${PLAY_STREAM}${Stream.key}/index.m3u8`}
          autoPlay={true}
          controls={true}
          muted
          width="100%"
          height="auto"
        />
        )}
      </div>
    </>
  );
};

SetupLeft.propTypes = {
  Stream: PropTypes.object.isRequired,
};

export default SetupLeft;
