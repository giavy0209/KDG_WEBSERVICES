import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as GoIcon from 'react-icons/go';
import * as MdIcon from 'react-icons/md';
import * as RiIcon from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { Tab, TabPane } from '../../components';
import { RTMP_DOMAIN, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';

const SetupRight = props => {
  const { Stream, readURL, handlePublicStream, handleStopStream, CopyToClipboard } = props;

  console.log(Stream);

  const history = useHistory();
  const [{ language, setup }] = useLanguageLayerValue();
  const [isHideStreamKey, setIsHideStreamKey] = useState(false);

  return (
    <>
      <Tab>
        <TabPane name={setup[language].connect} key='1'>
          <div className='setup__tabConnect'>
            <div className='setup__tabConnect-title'>{setup[language].connect_title}</div>
            <div className='setup__tabConnect-desc'>{setup[language].connect_desc1}</div>
            <div className='setup__tabConnect-desc mb-20'>{setup[language].connect_desc2}</div>

            <div className='setup__tabConnect-info mb-40'>
              <div>
                <p>Server URL</p>
                {Stream?.key && <p>{isHideStreamKey ? '*****' : RTMP_DOMAIN}</p>}
                {Stream?.key && (
                  <div
                    className='setup__tabConnect-info-button'
                    onClick={() => CopyToClipboard(RTMP_DOMAIN)}
                  >
                    <MdIcon.MdContentCopy className='icon' />
                  </div>
                )}
              </div>

              <div>
                <p>Stream Key</p>
                {Stream?.key && <p>{isHideStreamKey ? '*****' : Stream?.key}</p>}
                {Stream?.key && (
                  <div
                    className='setup__tabConnect-info-button'
                    onClick={() => CopyToClipboard(Stream?.key)}
                  >
                    <MdIcon.MdContentCopy className='icon' />
                  </div>
                )}
              </div>
            </div>

            <div className='setup__tabConnect-buttonBox mb-40'>
              <div
                className='setup__tabConnect-buttonBox-button'
                onClick={() => setIsHideStreamKey(x => !x)}
              >
                {isHideStreamKey ? setup[language].show : setup[language].hide}
              </div>
            </div>

            <div className='setup__tabConnect-warning'>
              <div className='setup__tabConnect-warning-iconBox'>
                <RiIcon.RiErrorWarningLine className='icon' />
              </div>
              <div className='setup__tabConnect-warning-text'>{setup[language].warning}</div>
            </div>
          </div>
        </TabPane>

        <TabPane name={setup[language].setup} key='2'>
          <form onSubmit={handlePublicStream} className='setup__tabSetup'>
            {Stream.status === 0 && (
              <>
                <div className='setup__tabSetup-inputBox'>
                  <input
                    type='text'
                    name='name'
                    defaultValue={Stream.name}
                    placeholder={setup[language].setup_title}
                  />
                </div>

                <div className='setup__tabSetup-textareaBox mt-20'>
                  <textarea
                    defaultValue={Stream.description}
                    name='description'
                    placeholder={setup[language].setup_desc}
                  ></textarea>
                </div>

                <div className='setup__tabSetup-inputBox mt-20'>
                  <input
                    type='text'
                    name='tags'
                    // defaultValue={Stream.name}
                    placeholder={setup[language].setup_tag}
                  />
                </div>

                <div className='setup__tabSetup-note mt-30'>
                  <p>{setup[language].note}</p>
                  <p>{setup[language].note1}</p>
                  <p>{setup[language].note2}</p>
                </div>

                <div className='setup__tabSetup-thumbnailBox mt-20'>
                  <input type='file' name='thumbnail' onChange={readURL} />
                  <img
                    src={STORAGE_DOMAIN + Stream?.thumbnail?.path}
                    className={`${Stream?.thumbnail?.path ? 'show' : ''}`}
                    alt=''
                  />
                  <GoIcon.GoCloudUpload className='icon' />
                  <p>{setup[language].thumb1}</p>
                  <p>{setup[language].thumb2}</p>
                </div>
              </>
            )}

            {/* <div className='setup__tabSetup-radioBox mt-20'>
              <div
                className={`inputRadio mr-100 ${currentRadio === 0 ? 'active' : ''}`}
                onClick={() => setCurrentRadio(0)}
              >
                <div className='circle mr-10'></div>
                <div className='text'>Public</div>
              </div>
              <div
                className={`inputRadio ${currentRadio === 1 ? 'active' : ''}`}
                onClick={() => setCurrentRadio(1)}
              >
                <div className='circle mr-10'></div>
                <div className='text'>Only me</div>
              </div>
            </div> */}

            {Stream.status === 1 && (
              <div
                style={{
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'underline',
                }}
                className='mt-20'
                onClick={() => history.push('/live?s=' + Stream._id)}
              >
                {setup[language].watch}
              </div>
            )}

            <div className='setup__tabSetup-action mt-20 mb-30'>
              {Stream.status === 0 && Stream.connect_status === 1 && (
                <button type='submit' className='button'>
                  {setup[language].start}
                </button>
              )}
              {Stream.status === 1 && Stream.connect_status === 0 && (
                <>
                  <p className='setup__tabSetup-noti mb-20'>{setup[language].noti3}</p>
                  <button type='button' className='button' onClick={handleStopStream}>
                    {setup[language].end}
                  </button>
                </>
              )}
              {Stream.status === 1 && Stream.connect_status === 1 && (
                <p className='setup__tabSetup-noti'>{setup[language].noti2}</p>
              )}
              {Stream.status === 0 && Stream.connect_status === 0 && (
                <p className='setup__tabSetup-noti'>{setup[language].noti1}</p>
              )}
            </div>
          </form>
        </TabPane>
      </Tab>
    </>
  );
};

SetupRight.propTypes = {
  Stream: PropTypes.object.isRequired,
  readURL: PropTypes.func.isRequired,
  handlePublicStream: PropTypes.func.isRequired,
  handleStopStream: PropTypes.func.isRequired,
  CopyToClipboard: PropTypes.func.isRequired,
};

export default SetupRight;
