import PropTypes from 'prop-types';
import React from 'react';
import video1 from '../../assets/images/setup/video1.png';

const SetupLeft = props => {
  const { Stream } = props;

  return (
    <>
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

      {/* <div className='setup__control mt-10'>
        <div className='setup__control-ctn1'>
          <div className='setup__control-btn1'>
            <FaIcon.FaMicrophone />
          </div>
          <div className='setup__control-btn1'>
            <MdIcon.MdVideocam />
          </div>
          <div className='setup__control-btn1'>
            <MdIcon.MdScreenShare />
          </div>
        </div>
        <div className='setup__control-ctn2'>
          <div className='setup__control-btn2'>
            <IoIcon.IoMdSettings className='icon' />
            <span>Setting</span>
          </div>
        </div>
      </div> */}

      {/* <div className='setup__info mt-10'>
        <div className='setup__info-item'>
          <p>00:00:00</p>
          <p>Time sketch</p>
        </div>
        <div className='setup__info-item'>
          <p>0</p>
          <p>Viewers</p>
        </div>
        <div className='setup__info-item'>
          <p>0</p>
          <p>View</p>
        </div>
      </div> */}
    </>
  );
};

SetupLeft.propTypes = {
  Stream: PropTypes.object.isRequired,
};

export default SetupLeft;
