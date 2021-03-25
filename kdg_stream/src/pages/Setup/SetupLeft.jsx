import PropTypes from 'prop-types';
import React from 'react';
import video1 from '../../assets/images/setup/video1.png';
import { useLanguageLayerValue } from '../../context/LanguageLayer';

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
          <video autoPlay muted controls id='videoElement'></video>
        )}
      </div>
    </>
  );
};

SetupLeft.propTypes = {
  Stream: PropTypes.object.isRequired,
};

export default SetupLeft;
