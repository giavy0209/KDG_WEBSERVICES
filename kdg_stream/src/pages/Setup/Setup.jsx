import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../assets/css/setup.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import useWindowSize from '../../hooks/useWindowSize';
import { Tab, TabPane } from '../../components';
import * as MdIcon from 'react-icons/md';
import * as GoIcon from 'react-icons/go';
// import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import * as FiIcon from 'react-icons/fi';
import * as FaIcon from 'react-icons/fa';
import * as RiIcon from 'react-icons/ri';
import * as TiIcon from 'react-icons/ti';

import video1 from '../../assets/images/setup/video1.png';
import avatar1 from '../../assets/images/setup/avatar1.png';
const _streamKey = 'cb01c5ac-5e79-46cb-b4d6-997f2df662c9';

const Setup = () => {
    const [isShowDropdown, setIsShowDropdown] = useState(false);

    const [width, height] = useWindowSize();
    const [isShowSetupRight, setIsShowSetupRight] = useState(false);
    const [setupRightHeight, setSetupRightHeight] = useState(0);

    useEffect(() => {
        let setupLeft = document.querySelector('.setup__left');
        let setupLeftHeight = setupLeft.offsetHeight;
        setSetupRightHeight(setupLeftHeight);
    }, [height]);

    const [currentRadio, setCurrentRadio] = useState(0);

    const [isMute, setIsMute] = useState(false);
    const [isBlur, setIsBlur] = useState(true);

    const serverRef = useRef();
    const streamRef = useRef();

    const [streamKey, setStreamKey] = useState(_streamKey);
    const [isHideStreamKey, setIsHideStreamKey] = useState(false);

    const CopyToClipboard = useCallback(ref => {
        var r = document.createRange();
        r.selectNode(ref.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        NotificationManager.success('Đã copy', null, 500);
    }, []);

    return (
        <div className='setup'>
            <NotificationContainer />
            <div className='setup__left mt-10 pl-25 pr-25 pt-20 pb-100'>
                <div className='setup__video'>
                    <img src={video1} alt='' />
                    <div className='label-container'>
                        <div className='label'>
                            <p>Preview</p>
                        </div>
                        {/* <div className='label'>
                            <p>Live</p>
                        </div>
                        <div className='label'>
                            <IoIcon.IoIosEye className='icon' />
                            <p>324 K</p>
                        </div> */}
                    </div>
                    <div className={`setup__video-blur ${isBlur ? 'show' : ''}`}></div>
                </div>

                <div className='setup__control mt-10'>
                    <div className='setup__control-ctn1'>
                        <div className='setup__control-btn1' onClick={() => setIsMute(!isMute)}>
                            {isMute ? (
                                <FaIcon.FaMicrophone size={30} />
                            ) : (
                                <FaIcon.FaMicrophoneSlash size={36} />
                            )}
                        </div>
                        <div className='setup__control-btn1' onClick={() => setIsBlur(!isBlur)}>
                            {isBlur ? (
                                <MdIcon.MdVideocam size={30} />
                            ) : (
                                <MdIcon.MdVideocamOff size={30} />
                            )}
                        </div>
                        <div className='setup__control-btn1'>
                            <MdIcon.MdScreenShare size={30} />
                        </div>
                    </div>
                    <div className='setup__control-ctn2'>
                        <div className='setup__control-btn2'>
                            <FiIcon.FiSettings className='icon' />
                            <span>Setting</span>
                        </div>
                    </div>
                </div>

                <div className='setup__info mt-10'>
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
                </div>
            </div>

            <div
                className={`setup__right mt-10 ${isShowSetupRight ? 'show' : ''}`}
                style={{ '--setupRight-height': `${setupRightHeight}px` }}
            >
                <Tab>
                    <TabPane name='Chat' key='1'>
                        <div className='setup__tabChat1'>
                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>Trà Long{':'}</div>
                                <div className='setup__tabChat1-text'>
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me
                                    every Friday morning to explore the beauty of digital
                                    risk-taking & learning to draw and sketchnote with Adobe Fres
                                </div>
                                <div className='setup__tabChat1-menu'>
                                    <HiIcon.HiDotsVertical className='icon' />
                                </div>
                            </div>

                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>
                                    dinhgiavu@kingdomgame.co{':'}
                                </div>
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
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me
                                    every Friday morning to explore the beauty of digital
                                    risk-taking & learning to draw and sketchnote with Adobe Fres
                                </div>
                                <div className='setup__tabChat1-menu'>
                                    <HiIcon.HiDotsVertical className='icon' />
                                </div>
                            </div>

                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>Trà Long{':'}</div>
                                <div className='setup__tabChat1-text'>
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me
                                    every Friday morning to explore the beauty of digital
                                    risk-taking & learning to draw and sketchnote with Adobe Fres
                                </div>
                                <div className='setup__tabChat1-menu'>
                                    <HiIcon.HiDotsVertical className='icon' />
                                </div>
                            </div>

                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>Trà Long{':'}</div>
                                <div className='setup__tabChat1-text'>
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me
                                    every Friday morning to explore the beauty of digital
                                    risk-taking & learning to draw and sketchnote with Adobe Fres
                                </div>
                                <div className='setup__tabChat1-menu'>
                                    <HiIcon.HiDotsVertical className='icon' />
                                </div>
                            </div>

                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>Trà Long{':'}</div>
                                <div className='setup__tabChat1-text'>
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me
                                    every Friday morning to explore the beauty of digital
                                    risk-taking & learning to draw and sketchnote with Adobe Fres
                                </div>
                                <div className='setup__tabChat1-menu'>
                                    <HiIcon.HiDotsVertical className='icon' />
                                </div>
                            </div>

                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>Trà Long{':'}</div>
                                <div className='setup__tabChat1-text'>
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me
                                    every Friday morning to explore the beauty of digital
                                    risk-taking & learning to draw and sketchnote with Adobe Fres
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
                    </TabPane>
                    <TabPane name='Setup' key='2'>
                        <div className='setup__tabSetup'>
                            <div className='setup__tabSetup-inputBox'>
                                <input type='text' placeholder='Title' />
                            </div>
                            <div className='setup__tabSetup-textareaBox mt-20'>
                                <textarea placeholder='Something about this livestream'></textarea>
                            </div>
                            <div className='setup__tabSetup-radioBox mt-20'>
                                <div
                                    className={`inputRadio mr-100 ${
                                        currentRadio === 0 ? 'active' : ''
                                    }`}
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
                            </div>
                            <div className='setup__tabSetup-type mt-20'>
                                <p className='mb-20'>Thể loại (Tối đa 3 thể loại)</p>
                                <div className='dropdown'>
                                    <div
                                        className='dropdown__selected'
                                        onClick={() => setIsShowDropdown(!isShowDropdown)}
                                    >
                                        <TiIcon.TiArrowSortedDown
                                            className={`dropdown__selected-arrowIcon ${
                                                isShowDropdown ? 'rotate' : ''
                                            }`}
                                        />
                                        <div
                                            className='dropdown__selected-item'
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <span>Trò chơi trí tuệ</span>
                                            <RiIcon.RiCloseFill />
                                        </div>
                                        <div
                                            className='dropdown__selected-item'
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <span>Thể thao</span>
                                            <RiIcon.RiCloseFill />
                                        </div>
                                        <div
                                            className='dropdown__selected-item'
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <span>Du lịch</span>
                                            <RiIcon.RiCloseFill />
                                        </div>
                                    </div>
                                    <div
                                        className={`dropdown__list ${
                                            isShowDropdown ? 'd-block' : ''
                                        }`}
                                    >
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
                            </div>
                            <div className='setup__tabSetup-note mt-30'>
                                <p>Lưu ý</p>
                                <p>
                                    - Đảm bảo trong quá trình livestream không có hành động, lời nói
                                    mang tính chất bạo động, phản cách mạng.
                                </p>
                                <p>
                                    - Không sử dụng hình ảnh nghệ sĩ nổi tiếng khi chưa có sự cho
                                    phép.
                                </p>
                            </div>
                            <div className='setup__tabSetup-thumbnailBox mt-20'>
                                <input type='file' />
                                <GoIcon.GoCloudUpload className='icon' />
                                <p>
                                    Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa
                                    = 2MB
                                </p>
                                <p>
                                    Để đảm bảo hình ảnh thu hút người xem, vui lòng sử dụng hình ảnh
                                    sắc nét
                                </p>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane name='Connect' key='3'>
                        <div className='setup__tabConnect'>
                            <div className='setup__tabConnect-title'>
                                Connect Your Live Streams To The Live API
                            </div>
                            <div className='setup__tabConnect-desc mb-20'>
                                User live streaming software or a hardware
                            </div>
                            <div className='setup__tabConnect-desc mb-20'>
                                Enter the information below into your software's setting:
                            </div>
                            <div className='setup__tabConnect-copyBox mb-40'>
                                <div className='setup__tabConnect-copyBox-text1'>Server URL</div>
                                <div className='setup__tabConnect-copyBox-text2' ref={serverRef}>
                                    https://www.abc.com/search?word=close
                                </div>
                                <div
                                    className='setup__tabConnect-copyBox-button'
                                    onClick={() => CopyToClipboard(serverRef)}
                                >
                                    <MdIcon.MdContentCopy className='icon' />
                                </div>
                            </div>
                            <div className='setup__tabConnect-info mb-40'>
                                <div>
                                    <p>Host</p>
                                    <p>live.kingdomgame4.0.com</p>
                                </div>
                                <div>
                                    <p>Port</p>
                                    <p>1935</p>
                                </div>
                                <div>
                                    <p>Application</p>
                                    <p>live2</p>
                                </div>
                            </div>
                            <div className='setup__tabConnect-copyBox mb-10'>
                                <div className='setup__tabConnect-copyBox-text1'>Stream Key</div>
                                <div className='setup__tabConnect-copyBox-text2' ref={streamRef}>
                                    {streamKey}
                                </div>
                                <div
                                    className='setup__tabConnect-copyBox-button'
                                    onClick={() => CopyToClipboard(streamRef)}
                                >
                                    <MdIcon.MdContentCopy className='icon' />
                                </div>
                            </div>
                            <div className='setup__tabConnect-buttonBox mb-40'>
                                {!isHideStreamKey ? (
                                    <div
                                        className='setup__tabConnect-buttonBox-button'
                                        onClick={() => {
                                            setIsHideStreamKey(!isHideStreamKey);
                                            setStreamKey('**********');
                                        }}
                                    >
                                        Hide
                                    </div>
                                ) : (
                                    <div
                                        className='setup__tabConnect-buttonBox-button'
                                        onClick={() => {
                                            setIsHideStreamKey(!isHideStreamKey);
                                            setStreamKey(_streamKey);
                                        }}
                                    >
                                        Show
                                    </div>
                                )}
                                <div className='setup__tabConnect-buttonBox-button'>Reset</div>
                            </div>
                            <div className='setup__tabConnect-warning'>
                                <div className='setup__tabConnect-warning-iconBox'>
                                    <RiIcon.RiErrorWarningLine className='icon' />
                                </div>
                                <div className='setup__tabConnect-warning-text'>
                                    Bất kỳ ai có stream key này đều có thể phát trực tiếp trên nền
                                    tảng livestream Kingdom game 4.0 của bạn. Đảm bảo rang bạn giữ
                                    mã key này an toán.
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tab>
            </div>

            {width <= 1400 && (
                <div
                    className={`setup__showRight ${isShowSetupRight ? 'show' : ''}`}
                    onClick={() => setIsShowSetupRight(!isShowSetupRight)}
                >
                    <MdIcon.MdKeyboardArrowLeft className='icon' />
                </div>
            )}
        </div>
    );
};

export default Setup;
