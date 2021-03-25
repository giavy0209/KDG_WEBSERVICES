import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as GoIcon from 'react-icons/go';
import * as MdIcon from 'react-icons/md';
import * as RiIcon from 'react-icons/ri';
import { useHistory } from 'react-router';
import { Tab, TabPane } from '../../components';
import { RTMP_DOMAIN } from '../../constant';

const SetupRight = props => {
  const { Stream, readURL, handlePublicStream, handleStopStream, CopyToClipboard } = props;

  const history = useHistory();
  const [isHideStreamKey, setIsHideStreamKey] = useState(false);

  return (
    <>
      <Tab>
        <TabPane name='Connect' key='1'>
          <div className='setup__tabConnect'>
            <div className='setup__tabConnect-title'>Connect Your Live Streams To The Live API</div>
            <div className='setup__tabConnect-desc'>User live streaming software or a hardware</div>
            <div className='setup__tabConnect-desc'>
              Enter the information below into your software's setting:
            </div>

            <div className='setup__tabConnect-info mb-40'>
              <div>
                <p>Server URL</p>
                {Stream?.key && <p>{isHideStreamKey ? '*****' : RTMP_DOMAIN}</p>}
                <div
                  className='setup__tabConnect-info-button'
                  onClick={() => CopyToClipboard(RTMP_DOMAIN)}
                >
                  <MdIcon.MdContentCopy className='icon' />
                </div>
              </div>
              <div>
                <p>Stream Key</p>
                {Stream?.key && <p>{isHideStreamKey ? '*****' : Stream?.key}</p>}
                <div
                  className='setup__tabConnect-info-button'
                  onClick={() => CopyToClipboard(Stream?.key)}
                >
                  <MdIcon.MdContentCopy className='icon' />
                </div>
              </div>
            </div>

            <div className='setup__tabConnect-buttonBox mb-40'>
              <div
                className='setup__tabConnect-buttonBox-button'
                onClick={() => setIsHideStreamKey(x => !x)}
              >
                {isHideStreamKey ? 'Show' : 'Hide'}
              </div>

              <div className='setup__tabConnect-buttonBox-button'>Reset</div>
            </div>
            <div className='setup__tabConnect-warning'>
              <div className='setup__tabConnect-warning-iconBox'>
                <RiIcon.RiErrorWarningLine className='icon' />
              </div>
              <div className='setup__tabConnect-warning-text'>
                Bất kỳ ai có Stream Key này đều có thể phát trực tiếp trên nền tảng Livestream
                Kingdomgame 4.0 của bạn. Đảm bảo rằng bạn giữ mã Key này an toàn.
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane name='Setup' key='2'>
          <form onSubmit={handlePublicStream} className='setup__tabSetup'>
            <div className='setup__tabSetup-inputBox'>
              <input type='text' name='name' placeholder='Title' />
            </div>

            <div className='setup__tabSetup-textareaBox mt-20'>
              <textarea name='description' placeholder='Something about this livestream'></textarea>
            </div>

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

            {/* <div className='setup__tabSetup-type mt-20'>
              <p className='mb-20'>Thể loại (Tối đa 3 thể loại)</p>
              <div className='dropdown'>
                <div
                  className='dropdown__selected'
                  onClick={() => setIsShowDropdown(!isShowDropdown)}
                >
                  <TiIcon.TiArrowSortedDown
                    className={`dropdown__selected-arrowIcon ${isShowDropdown ? 'rotate' : ''}`}
                  />
                  <div className='dropdown__selected-item' onClick={e => e.stopPropagation()}>
                    <span>Trò chơi trí tuệ</span>
                    <RiIcon.RiCloseFill />
                  </div>
                  <div className='dropdown__selected-item' onClick={e => e.stopPropagation()}>
                    <span>Thể thao</span>
                    <RiIcon.RiCloseFill />
                  </div>
                  <div className='dropdown__selected-item' onClick={e => e.stopPropagation()}>
                    <span>Du lịch</span>
                    <RiIcon.RiCloseFill />
                  </div>
                </div>
                <div className={`dropdown__list ${isShowDropdown ? 'd-block' : ''}`}>
                  <div className='dropdown__list-item'>
                    <span>Trò chơi trí tuệ</span>
                    <FaIcon.FaCheck className='d-block' />
                  </div>
                  <div className='dropdown__list-item'>
                    <span>Thể thao</span>
                    <FaIcon.FaCheck className='d-block' />
                  </div>
                  <div className='dropdown__list-item'>
                    <span>Du lịch</span>
                    <FaIcon.FaCheck className='d-block' />
                  </div>
                </div>
              </div>
            </div> */}

            <div className='setup__tabSetup-note mt-30'>
              <p>Lưu ý</p>
              <p>
                - Đảm bảo trong quá trình livestream không có hành động, lời nói mang tính chất bạo
                động, phản cách mạng.
              </p>
              <p>- Không sử dụng hình ảnh nghệ sĩ nổi tiếng khi chưa có sự cho phép.</p>
            </div>
            <div className='setup__tabSetup-thumbnailBox mt-20'>
              <input type='file' name='thumbnail' onChange={readURL} />
              <img src='' alt='' style={{ display: 'none' }} />
              <GoIcon.GoCloudUpload className='icon' />
              <p>Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa = 2MB</p>
              <p>Để đảm bảo hình ảnh thu hút người xem, vui lòng sử dụng hình ảnh sắc nét</p>
            </div>

            {Stream.status === 1 && (
              <div
                style={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'underline' }}
                className='mt-20'
                onClick={() => history.push('/live?s=' + Stream._id)}
              >
                Theo dõi stream của bạn tại đây
              </div>
            )}

            <div style={{ display: 'flex' }} className='mt-20 mb-30'>
              <button type='submit' className='button-upload'>
                Bắt đầu
              </button>
              <button type='button' className='button-upload ml-20' onClick={handleStopStream}>
                Kết thúc
              </button>
            </div>
          </form>
        </TabPane>

        {/* <TabPane name='Chat' key='3'>
          <div className='setup__tabChat1'>
            <div className='setup__tabChat1-chatCtn'>
              <div className='setup__tabChat1-name'>Trà Long{':'}</div>
              <div className='setup__tabChat1-text'>
                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every Friday morning to
                explore the beauty of digital risk-taking & learning to draw and sketchnote with Adobe
                Fres
              </div>
              <div className='setup__tabChat1-menu'>
                <HiIcon.HiDotsVertical className='icon' />
              </div>
            </div>

            <div className='setup__tabChat1-chatCtn'>
              <div className='setup__tabChat1-name'>dinhgiavu@kingdomgame.co{':'}</div>
              <div className='setup__tabChat1-text'>
                Grab your ☕, ☀️ Grab your
                🚰!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </div>
              <div className='setup__tabChat1-menu'>
                <HiIcon.HiDotsVertical className='icon' />
              </div>
            </div>

            <div className='setup__tabChat1-chatCtn'>
              <div className='setup__tabChat1-name'>Trà Long{':'}</div>
              <div className='setup__tabChat1-text'>
                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every Friday morning to
                explore the beauty of digital risk-taking & learning to draw and sketchnote with Adobe
                Fres
              </div>
              <div className='setup__tabChat1-menu'>
                <HiIcon.HiDotsVertical className='icon' />
              </div>
            </div>
          </div>
          <div className='setup__tabChat2'>
            <div className='setup__tabChat2-avatar'>
              <img src={avatar1} alt='' />
            </div>
            <div className='setup__tabChat2-chatBox'>
              <input type='text' placeholder='Say something' />
              <RiIcon.RiSendPlaneFill className='icon icon-send' />
              <RiIcon.RiEmotionLaughLine className='icon icon-emo' />
            </div>
          </div>
        </TabPane> */}
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
