import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../assets/css/setup.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import useWindowSize from '../../hooks/useWindowSize';
import { Tab, TabPane } from '../../components';
import { RTMP_DOMAIN, PLAY_STREAM } from '../../constant'

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
import callAPI from '../../axios';
import socket from '../../socket';
import { useHistory } from 'react-router';
const _streamKey = 'cb01c5ac-5e79-46cb-b4d6-997f2df662c9';

const Setup = () => {
    const history = useHistory()
    const [width, height] = useWindowSize();
    const [isShowSetupRight, setIsShowSetupRight] = useState(false);
    const [setupRightHeight, setSetupRightHeight] = useState(0);
    const [isHideStreamKey, setIsHideStreamKey] = useState(false);
    const [Stream, setStream] = useState({});

    useEffect(() => {
        let setupLeft = document.querySelector('.setup__left');
        let setupLeftHeight = setupLeft.offsetHeight;
        setSetupRightHeight(setupLeftHeight);
    }, [height]);


    const readURL = useCallback(input => {
        input.persist();
        input = input.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = async function (e) {
                let buffer = e.target.result;
                let videoBlob = new Blob([new Uint8Array(buffer)]);
                let url = window.URL.createObjectURL(videoBlob);
                input.nextElementSibling.setAttribute('src', url);
            };
            reader.readAsArrayBuffer(input.files[0]);
        }
    },[])

    const CopyToClipboard = useCallback(ref => {
        var input = document.createElement('input');
        document.querySelector('body').append(input);
        input.value = ref;
        input.select();
        document.execCommand('copy');
        input.remove();
        NotificationManager.success('Đã copy', null, 500);
    }, []);

    useEffect(() => {
        callAPI.get('/stream')
            .then(res => {
                console.log(res);
                setStream(res.data)
                if (res.data?.connect_status === 1) {
                    var videoElement = document.getElementById('videoElement');
                    var flvPlayer = window.flvjs.createPlayer({
                        type: 'flv',
                        url: `${PLAY_STREAM}${res.data.key}.flv`
                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                }
            })

        const handleStream = function (data) {
            setStream(data)
            if (data.connect_status === 1) {
                var videoElement = document.getElementById('videoElement');
                var flvPlayer = window.flvjs.createPlayer({
                    type: 'flv',
                    url: `${PLAY_STREAM}${data.key}.flv`
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }
        }
        socket.on('stream', handleStream)

        return () => {
            socket.removeEventListener('stream', handleStream)
        }
    }, [])

    const handlePublicStream = useCallback(async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const res = await callAPI.post('/public_stream?sid=' + Stream._id , data)

        
    },[Stream])

    const handleStopStream = useCallback(async () => {
        const res = await callAPI.post('/stop_stream?sid=' + Stream._id)
    },[Stream])

    return (
        <div className='setup'>
            <NotificationContainer />
            <div className='setup__left mt-10 pl-25 pr-25 pt-20 pb-100'>
                <div className='setup__video'>
                    {
                        Stream?.connect_status !== 1 ?
                            <>
                                <img src={video1} alt='' />
                                <div className={`setup__video-blur show`}></div>
                            </>
                            :
                            <video autoPlay muted controls id="videoElement"></video>
                    }
                </div>

                {/* <div className='setup__control mt-10'>
                    <div className='setup__control-ctn1'>
                        <div className='setup__control-btn1' onClick={() => setIsMute(!isMute)}>
                            {isMute ? <FaIcon.FaMicrophone size={30} /> : <FaIcon.FaMicrophoneSlash size={36} />}
                        </div>
                        <div className='setup__control-btn1' onClick={() => setIsBlur(!isBlur)}>
                            {isBlur ? <MdIcon.MdVideocam size={30} /> : <MdIcon.MdVideocamOff size={30} />}
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
            </div>

            <div
                className={`setup__right mt-10 ${isShowSetupRight ? 'show' : ''}`}
                style={{ '--setupRight-height': `${setupRightHeight}px` }}
            >
                <Tab>
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

                            <div className='setup__tabConnect-info mb-40'>
                                <div>
                                    <p>Server URL</p>
                                    <p> {Stream?.key && RTMP_DOMAIN}</p>
                                    <div
                                        className='setup__tabConnect-copyBox-button'
                                        onClick={() => CopyToClipboard(RTMP_DOMAIN)}
                                    >
                                        <MdIcon.MdContentCopy className='icon' />
                                    </div>
                                </div>
                                <div>
                                    <p>Stream Key</p>
                                    <p>{isHideStreamKey ? Stream?.key : '*****'}</p>
                                    <div
                                        className='setup__tabConnect-copyBox-button'
                                        onClick={() => CopyToClipboard(Stream?.key)}
                                    >
                                        <MdIcon.MdContentCopy className='icon' />
                                    </div>
                                </div>
                            </div>

                            <div className='setup__tabConnect-buttonBox mb-40'>
                                {!isHideStreamKey ? (
                                    <div
                                        className='setup__tabConnect-buttonBox-button'
                                        onClick={() => {
                                            setIsHideStreamKey(!isHideStreamKey);
                                        }}
                                    >
                                        Hide
                                    </div>
                                ) : (
                                    <div
                                        className='setup__tabConnect-buttonBox-button'
                                        onClick={() => {
                                            setIsHideStreamKey(!isHideStreamKey);
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
                                    Bất kỳ ai có stream key này đều có thể phát trực tiếp trên nền tảng livestream
                                    Kingdom game 4.0 của bạn. Đảm bảo rang bạn giữ mã key này an toán.
                                </div>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane name='Setup' key='2'>
                        <form onSubmit={handlePublicStream} className='setup__tabSetup'>
                            <div className='setup__tabSetup-inputBox'>
                                <input type='text' name="name" placeholder='Title' />
                            </div>
                            <div className='setup__tabSetup-textareaBox mt-20'>
                                <textarea name="description" placeholder='Something about this livestream'></textarea>
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
                                    - Đảm bảo trong quá trình livestream không có hành động, lời nói mang tính chất
                                    bạo động, phản cách mạng.
                                </p>
                                <p>- Không sử dụng hình ảnh nghệ sĩ nổi tiếng khi chưa có sự cho phép.</p>
                            </div>
                            <div className='setup__tabSetup-thumbnailBox mt-20'>
                                <input type='file' name="thumbnail" onChange={readURL} />
                                <img src="" alt=""/>
                                <GoIcon.GoCloudUpload className='icon' />
                                <p>Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa = 2MB</p>
                                <p>Để đảm bảo hình ảnh thu hút người xem, vui lòng sử dụng hình ảnh sắc nét</p>
                            </div>
                            {Stream.status === 1 && <span onClick={() => history.push('/live?s='+Stream._id)}>Theo dõi stream của bạn tại đây</span>}
                            <button type="submit" className="button-upload mt-10">Bắt đầu</button>
                            <button onClick={handleStopStream} type="button" className="button-upload mt-10">Kết thúc</button>
                        </form>
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


{/* <TabPane name='Chat' key='1'>
                        <div className='setup__tabChat1'>
                            <div className='setup__tabChat1-chatCtn'>
                                <div className='setup__tabChat1-name'>Trà Long{':'}</div>
                                <div className='setup__tabChat1-text'>
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every Friday morning
                                    to explore the beauty of digital risk-taking & learning to draw and sketchnote
                                    with Adobe Fres
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
                                    Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every Friday morning
                                    to explore the beauty of digital risk-taking & learning to draw and sketchnote
                                    with Adobe Fres
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