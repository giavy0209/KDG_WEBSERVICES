import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as AiIcon from 'react-icons/ai';
import * as BsIcon from 'react-icons/bs';
import * as CgIcon from 'react-icons/cg';
import * as FaIcon from 'react-icons/fa';
import * as HiIcon from 'react-icons/hi';
import * as ImIcon from 'react-icons/im';
import * as MdIcon from 'react-icons/md';
import * as RiIcon from 'react-icons/ri';
import { useSelector } from 'react-redux';
import '../../assets/css/live.css';
import avatar0 from '../../assets/images/header/avatar0.png';
import callAPI from '../../axios';
import { PLAY_STREAM, STORAGE_DOMAIN } from '../../constant';
import { convertDate } from '../../helpers';
import useNumber from '../../hooks/useNumber';
import socket from '../../socket'
let temp = 1;

const Live = () => {
  const user = useSelector(state => state.user)
  const [Stream, setStream] = useState({});
  const [IsFollowed, setIsFollowed] = useState(false);
  const [Chat, setChat] = useState([])

  const [isExpand, setIsExpand] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHideChat, setIsHideChat] = useState(false);
  const [isHideFullscreenChat, setIsHideFullscreenChat] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowPlayButton, setIsShowPlayButton] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(temp);
  const [isMouseDownVolume, setIsMouseDownVolume] = useState(false);
  const [isMouseDownPlayback, setIsMouseDownPlayback] = useState(false);
  const [playbackPercent, setPlaybackPercent] = useState(0);
  const [duration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');
  const videoRef = useRef();
  const animationRef = useRef();
  const controlsRef = useRef();
  const chatRef = useRef();
  const chatFullscreenRef = useRef();
  const prevExpandRef = useRef(false);
  const prevFullscreenRef = useRef(false);
  const flvPlayer = useRef(null);

  const convertTime = useCallback(timeSecond => {
    let duration, second, minute, hour, temp, result;

    timeSecond = Number(timeSecond);
    if (isNaN(timeSecond)) timeSecond = 0;
    duration = Math.round(timeSecond);
    second = duration % 60;
    temp = (duration - second) / 60;
    if (temp > 59) {
      minute = temp % 60;
      hour = (temp - minute) / 60;
      minute = (minute + '').length === 1 ? '0' + minute : minute + '';
      hour = hour + '';
    } else {
      minute = temp + '';
    }
    second = (second + '').length === 1 ? '0' + second : second + '';

    if (hour) result = `${hour}:${minute}:${second}`;
    else result = `${minute}:${second}`;
    return result;
  }, []);

  const handleAdjustPlaybackMouseUp = useCallback(() => {
    const video = videoRef.current;
    video.paused && isPlay && video.play();
    console.log(video.paused);
    setIsMouseDownPlayback(false);
  }, [isPlay]);

  const handleAdjustPlaybackMouseMove = useCallback(
    e => {
      const video = videoRef.current;
      !video.paused && video.pause();

      const { width, left } = document
        .querySelector('.live__videoCtn-controls-bottom-playbackBar')
        .getBoundingClientRect();
      let playback_percent = (e.clientX - left) / width;
      if (playback_percent <= 0) playback_percent = 0;
      if (playback_percent >= 1) playback_percent = 1;
      setPlaybackPercent(playback_percent);

      let timeSecond = video.duration * playback_percent;
      setCurrentTime(convertTime(timeSecond));
      video.currentTime = timeSecond;
    },
    [convertTime]
  );

  const handleAdjustPlaybackMouseDown = useCallback(
    e => {
      const video = videoRef.current;

      const { width, left } = document
        .querySelector('.live__videoCtn-controls-bottom-playbackBar')
        .getBoundingClientRect();
      let playback_percent = (e.clientX - left) / width;
      if (playback_percent <= 0) playback_percent = 0;
      if (playback_percent >= 1) playback_percent = 1;
      setPlaybackPercent(playback_percent);

      const duration = video.duration;
      let time = duration * playback_percent;
      setCurrentTime(convertTime(time));
      video.currentTime = time;
    },
    [convertTime]
  );

  const handleAdjustVolume = useCallback(e => {
    const { width, left } = document
      .querySelector('.live__videoCtn-controls-bottom-volumeBar')
      .getBoundingClientRect();
    let volume = (e.clientX - left) / width;
    if (volume <= 0) volume = 0;
    if (volume >= 1) volume = 1;
    if (volume === 0) setIsMute(true);
    else setIsMute(false);
    setCurrentVolume(volume);
  }, []);

  const handleMuteVideo = useCallback(() => {
    if (isMute) {
      videoRef.current.muted = true;
      setIsMute(!isMute);
      animationRef.current && animationRef.current.classList.add('volume');
      setTimeout(() => {
        animationRef.current && animationRef.current.classList.remove('volume');
      }, 600);
    } else {
      temp = currentVolume;
      videoRef.current.muted = false;

      setIsMute(!isMute);
      animationRef.current && animationRef.current.classList.add('mute');
      setTimeout(() => {
        animationRef.current && animationRef.current.classList.remove('mute');
      }, 600);
    }
  }, [isMute, currentVolume]);

  const toggleFullScreen = useCallback(() => {
    async function asyncToggleFullScreen() {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (error) {
          console.error(error);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
    asyncToggleFullScreen();
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
    toggleFullScreen();
  }, [isFullScreen, toggleFullScreen]);

  useEffect(() => {
    async function playVideo() {
      try {
      } catch (error) {
        console.error(error);
        setIsShowPlayButton(true);
        setIsPlay(false);
      }
    }
    playVideo();
  }, []);

  useEffect(() => {
    window.onmouseup = () => {
      isMouseDownVolume && setIsMouseDownVolume(false);
      isMouseDownPlayback && handleAdjustPlaybackMouseUp();
    };
    return () => (window.onmouseup = null);
  }, [isMouseDownVolume, isMouseDownPlayback, handleAdjustPlaybackMouseUp]);

  useEffect(() => {
    let id;
    window.onmousemove = e => {
      isMouseDownVolume && handleAdjustVolume(e);
      isMouseDownPlayback && handleAdjustPlaybackMouseMove(e);
      if (id) clearTimeout(id);
      controlsRef.current && controlsRef.current.classList.remove('notshow');
      id = setTimeout(() => {
        controlsRef.current && controlsRef.current.classList.add('notshow');
      }, 3000);
    };
    return () => {
      if (id) clearTimeout(id);
      window.onmousemove = null;
    };
  }, [isMouseDownVolume, handleAdjustVolume, isMouseDownPlayback, handleAdjustPlaybackMouseMove]);

  //   useEffect(() => {
  //     const video = videoRef.current;
  //     video.ondurationchange = () => {
  //       setDuration(convertTime(video.duration));
  //     };
  //     const id = setInterval(() => {
  //       let playback_percent = video.currentTime / video.duration;
  //       if (playback_percent <= 0) playback_percent = 0;
  //       if (playback_percent >= 1) playback_percent = 1;
  //       if (playback_percent === 1) video.paused && setIsPlay(false);
  //       setPlaybackPercent(playback_percent);
  //       setCurrentTime(convertTime(video.currentTime));
  //     }, 100);
  //     return () => clearInterval(id);
  //   }, [convertTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlay) {
      //   video.play();
      animationRef.current && animationRef.current.classList.add('play');
      setTimeout(() => {
        animationRef.current && animationRef.current.classList.remove('play');
      }, 600);
    } else {
      video.pause();
      animationRef.current && animationRef.current.classList.add('pause');
      setTimeout(() => {
        animationRef.current && animationRef.current.classList.remove('pause');
      }, 600);
    }
  }, [isPlay]);

  useEffect(() => {
    const video = videoRef.current;
    video.volume = currentVolume;
  }, [currentVolume]);

  useEffect(() => {
    if (!isFullScreen) prevFullscreenRef.current = false;
    if (!isExpand) prevExpandRef.current = false;

    if (isFullScreen && isExpand) {
      if (prevFullscreenRef.current) {
        setIsFullScreen(false);
        toggleFullScreen();
        prevFullscreenRef.current = false;
      }

      if (prevExpandRef.current) {
        setIsExpand(false);
        prevExpandRef.current = false;
      }
    }

    if (isFullScreen) prevFullscreenRef.current = true;
    if (isExpand) prevExpandRef.current = true;
  }, [isExpand, isFullScreen, toggleFullScreen]);

  useEffect(() => {
    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    return () => (document.onfullscreenchange = null);
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('s');
    callAPI.get('/streamming?id=' + id).then(res => {
      socket.emit('join_stream' , res.data._id)
      setStream(res.data)
      var videoElement = document.getElementById('videoElement');
      flvPlayer.current = window.flvjs.createPlayer({
        type: 'flv',
        url: `${PLAY_STREAM}${res.data.key}.flv`,
      });
      flvPlayer.current.attachMediaElement(videoElement);
      flvPlayer.current.load();
      flvPlayer.current.play();
    });

    const handleReceiveChat = function(chatData) {
      
      setChat(_chat => [..._chat, chatData])
    }
    socket.on('chat' , handleReceiveChat)

    return () => {
      socket.removeEventListener('chat' , handleReceiveChat)
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.live__chatBox-top').forEach(el => {
      el.scroll(0 , el.scrollHeight + 9999)
    })
  },[Chat])

  useEffect(() => {
    const playVideoByKeyboard = e => {
      // console.log(e);

      if (document.activeElement !== document.body) {
        // Blur When Not Focus Body
        if (e.code === 'Escape') {
          document.activeElement.blur();
        }
        // Blur When Not Focus Body

        // Blur When Focus Input Chat Fullscreen
        if (e.code === 'KeyB' && !isShowPlayButton && e.ctrlKey && !e.altKey) {
          document.activeElement.blur();
        }
        // Blur When Focus Input Chat Fullscreen
      }

      if (document.activeElement === document.body) {
        // Focus Input Chat When Fullscreen
        if (e.code === 'KeyC' && !isShowPlayButton && isFullScreen && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          chatFullscreenRef.current.focus();
          isHideFullscreenChat && setIsHideFullscreenChat(false);
        }
        // Focus Input Chat When Fullscreen

        // Focus Input Chat When Not Fullscreen
        if (e.code === 'KeyC' && !isShowPlayButton && !isFullScreen && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          chatRef.current.focus();
        }
        // Focus Input Chat When Not Fullscreen

        // Hide Chat When Fullscreen
        if (e.code === 'KeyH' && !isShowPlayButton && isFullScreen && !e.ctrlKey && !e.altKey) {
          setIsHideFullscreenChat(!isHideFullscreenChat);
        }
        // Hide Chat When Fullscreen

        // Hide Chat When Not Fullscreen
        if (e.code === 'KeyH' && !isShowPlayButton && !isFullScreen && !e.ctrlKey && !e.altKey) {
          setIsHideChat(!isHideChat);
        }
        // Hide Chat When Not Fullscreen

        // Play/Pause Video
        if (e.code === 'Space' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setIsPlay(!isPlay);
          if (window.pageYOffset !== 0) {
            window.scroll({ top: 0 });
          }
        }

        if (e.code === 'KeyK' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          setIsPlay(!isPlay);
          if (window.pageYOffset !== 0) {
            window.scroll({ top: 0 });
          }
        }
        // Play/Pause Video

        // Toggle Mute Video
        if (e.code === 'KeyM' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          handleMuteVideo();
        }
        // Toggle Mute Video

        // Toggle Fullscreen Video
        if (e.code === 'KeyF' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          handleToggleFullscreen();
        }
        // Toggle Fullscreen Video

        // Toggle Expand Video
        if (e.code === 'KeyT' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          setIsExpand(!isExpand);
        }
        // Toggle Expand Video

        // Forward 5s Video
        if (e.code === 'ArrowRight' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          const video = videoRef.current;
          if (video.currentTime / video.duration === 1) return;
          video.currentTime = video.currentTime + 5;
          animationRef.current && animationRef.current.classList.add('forward5');
          setTimeout(() => {
            animationRef.current && animationRef.current.classList.remove('forward5');
          }, 600);
        }
        // Forward 5s Video

        // Previous 5s Video
        if (e.code === 'ArrowLeft' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          const video = videoRef.current;
          if (video.currentTime / video.duration === 0) return;
          video.currentTime = video.currentTime - 5;
          animationRef.current && animationRef.current.classList.add('replay5');
          setTimeout(() => {
            animationRef.current && animationRef.current.classList.remove('replay5');
          }, 600);
        }
        // Previous 5s Video

        // Forward 10s Video
        if (e.code === 'KeyL' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          const video = videoRef.current;
          if (video.currentTime / video.duration === 1) return;
          video.currentTime = video.currentTime + 10;
          animationRef.current && animationRef.current.classList.add('forward10');
          setTimeout(() => {
            animationRef.current && animationRef.current.classList.remove('forward10');
          }, 600);
        }
        // Forward 10s Video

        // Previous 10s Video
        if (e.code === 'KeyJ' && !isShowPlayButton && !e.ctrlKey && !e.altKey) {
          const video = videoRef.current;
          if (video.currentTime / video.duration === 0) return;
          video.currentTime = video.currentTime - 10;
          animationRef.current && animationRef.current.classList.add('replay10');
          setTimeout(() => {
            animationRef.current && animationRef.current.classList.remove('replay10');
          }, 600);
        }
        // Previous 10s Video

        // Skip to 0% Video
        if (
          (e.code === 'Numpad0' || e.code === 'Digit0') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0;
        }
        // Skip to 0% Video

        // Skip to 10% Video
        if (
          (e.code === 'Numpad1' || e.code === 'Digit1') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.1 * video.duration;
        }
        // Skip to 10% Video

        // Skip to 20% Video
        if (
          (e.code === 'Numpad2' || e.code === 'Digit2') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.2 * video.duration;
        }
        // Skip to 20% Video

        // Skip to 30% Video
        if (
          (e.code === 'Numpad3' || e.code === 'Digit3') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.3 * video.duration;
        }
        // Skip to 30% Video

        // Skip to 40% Video
        if (
          (e.code === 'Numpad4' || e.code === 'Digit4') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.4 * video.duration;
        }
        // Skip to 40% Video

        // Skip to 50% Video
        if (
          (e.code === 'Numpad5' || e.code === 'Digit5') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.5 * video.duration;
        }
        // Skip to 50% Video

        // Skip to 60% Video
        if (
          (e.code === 'Numpad6' || e.code === 'Digit6') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.6 * video.duration;
        }
        // Skip to 60% Video

        // Skip to 70% Video
        if (
          (e.code === 'Numpad7' || e.code === 'Digit7') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.7 * video.duration;
        }
        // Skip to 70% Video

        // Skip to 80% Video
        if (
          (e.code === 'Numpad8' || e.code === 'Digit8') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.8 * video.duration;
        }
        // Skip to 80% Video

        // Skip to 90% Video
        if (
          (e.code === 'Numpad9' || e.code === 'Digit9') &&
          !isShowPlayButton &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          const video = videoRef.current;
          video.currentTime = 0.9 * video.duration;
        }
        // Skip to 90% Video
      }
    };

    window.addEventListener('keydown', playVideoByKeyboard);
    return () => window.removeEventListener('keydown', playVideoByKeyboard);
  }, [
    isPlay,
    isShowPlayButton,
    isFullScreen,
    isExpand,
    isHideChat,
    isHideFullscreenChat,
    handleMuteVideo,
    handleToggleFullscreen,
  ]);

  const handleFollow = useCallback(async () => {
    const res = await callAPI.post('follow?id=' + Stream?.user._id);
    if (res.status === 1) {
      setIsFollowed(!IsFollowed);
    }
  }, [Stream, IsFollowed]);

  const handleChat = useCallback((e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const chat = data.get('chat') 
    if(!chat) return
    socket.emit('chat', {room : Stream._id , chat : data.get('chat')} )
    e.target.reset()
  },[Stream]) 

  return (
    <div className={`live ${isExpand ? 'expand' : ''}`}>
      <div className='live__left'>
        <div className={`live__videoCtn ${isFullScreen ? 'fullscreen' : ''}`}>
          {isFullScreen && (
            <div className={`live__chatfullscreen ${isHideFullscreenChat ? 'hide' : ''}`}>
              <div
                className='live__chatfullscreen-arrowBtn'
                onClick={() => setIsHideFullscreenChat(!isHideFullscreenChat)}
              >
                <MdIcon.MdKeyboardArrowRight className='icon' />
              </div>
              <div className='live__chatfullscreen-top'>
                {Chat.map(o => 
                  <div className='live__chatfullscreen-top-ctn'>
                    <div className='live__chatfullscreen-top-ctn-avatar'>
                      <img src={o.user?.kyc.avatar?.path ? STORAGE_DOMAIN + o.user?.kyc.avatar?.path : avatar0} alt='' />
                    </div>
                    <div>
                      <div className='live__chatfullscreen-top-ctn-name'>{o.user?.kyc.first_name} {o.user?.kyc.last_name}{':'}</div>
                      <div className='live__chatfullscreen-top-ctn-text'>{o.chat}</div>
                    </div>
                  </div>
                    
                )}
              </div>

              <div className='live__chatfullscreen-bottom'>
                {/* <div className='live__chatfullscreen-bottom-btn'>
                  <div className='live__chatfullscreen-bottom-btn-gift'>
                    <FaIcon.FaGift className='icon' />
                    <span>Gift</span>
                  </div>
                </div> */}
                <div className='live__chatfullscreen-bottom-chat'>
                  <div className='live__chatfullscreen-bottom-chat-avatar'>
                    <img src={user?.kyc.avatar?.path ? STORAGE_DOMAIN + user?.kyc.avatar?.path : avatar0} alt='' />
                  </div>
                  <form onSubmit={handleChat} className='live__chatfullscreen-bottom-chat-inputBox'>
                    <input ref={chatFullscreenRef} name="chat" type='text' placeholder='Say something' />
                    <button type="submit" className='icon icon-send'>
                      {/* <RiIcon.RiEmotionLaughLine  /> */}
                      <RiIcon.RiSendPlaneFill className='icon icon-send' />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          <video muted ref={videoRef} id='videoElement'></video>

          <div ref={animationRef} className='live__videoCtn-animation'>
            <div className='live__videoCtn-animation-iconCircle play-icon'>
              <AiIcon.AiFillPlayCircle />
            </div>
            <div className='live__videoCtn-animation-iconCircle pause-icon'>
              <AiIcon.AiFillPauseCircle />
            </div>
            <div className='live__videoCtn-animation-icon mute-icon'>
              <HiIcon.HiVolumeOff />
            </div>
            <div className='live__videoCtn-animation-icon volume-icon'>
              <HiIcon.HiVolumeUp />
            </div>
            <div className='live__videoCtn-animation-icon forward10-icon'>
              <MdIcon.MdForward10 />
            </div>
            <div className='live__videoCtn-animation-icon forward5-icon'>
              <MdIcon.MdForward5 />
            </div>
            <div className='live__videoCtn-animation-icon replay10-icon'>
              <MdIcon.MdReplay10 />
            </div>
            <div className='live__videoCtn-animation-icon replay5-icon'>
              <MdIcon.MdReplay5 />
            </div>
          </div>

          <div
            className={`live__videoCtn-playButton ${isShowPlayButton ? 'd-flex' : ''}`}
            onClick={() => {
              videoRef.current.play();
              setIsShowPlayButton(false);
              setIsPlay(true);
            }}
          >
            <ImIcon.ImPlay />
          </div>
          <div
            ref={controlsRef}
            className={`live__videoCtn-controls ${
              isMouseDownVolume || isMouseDownPlayback ? 'show' : ''
            }`}
          >
            <div className='live__videoCtn-controls-top' onClick={() => setIsPlay(!isPlay)}></div>
            <div className='live__videoCtn-controls-bottom'>
              <div
                className={`live__videoCtn-controls-bottom-playbackBar ${
                  isMouseDownPlayback ? 'show' : ''
                }`}
                style={{ '--playback-percent': playbackPercent }}
                onMouseDown={e => {
                  handleAdjustPlaybackMouseDown(e);
                  setIsMouseDownPlayback(true);
                }}
              >
                <div className='live__videoCtn-controls-bottom-playbackBar-1'></div>
              </div>
              <div>
                <div
                  className='live__videoCtn-controls-bottom-icon play-icon'
                  onClick={() => videoRef.current.play()}
                >
                  {playbackPercent === 1 && !isPlay ? (
                    <MdIcon.MdReplay />
                  ) : !isPlay ? (
                    <BsIcon.BsFillPlayFill />
                  ) : (
                    <BsIcon.BsFillPauseFill />
                  )}
                </div>
                <div
                  className='live__videoCtn-controls-bottom-icon volume-icon'
                  onClick={handleMuteVideo}
                >
                  {currentVolume === 0 ? (
                    <BsIcon.BsFillVolumeMuteFill />
                  ) : currentVolume < 0.5 ? (
                    <BsIcon.BsFillVolumeDownFill />
                  ) : (
                    <BsIcon.BsFillVolumeUpFill />
                  )}
                </div>
                <div
                  className={`live__videoCtn-controls-bottom-volumeBar ${
                    isMouseDownVolume ? 'show' : ''
                  }`}
                  style={{ '--volume-percent': currentVolume }}
                  onMouseDown={e => {
                    handleAdjustVolume(e);
                    setIsMouseDownVolume(true);
                  }}
                >
                  <div className='live__videoCtn-controls-bottom-volumeBar-1'></div>
                  <div className='live__videoCtn-controls-bottom-volumeBar-2'></div>
                  <div className='live__videoCtn-controls-bottom-volumeBar-3'></div>
                </div>
                <div className='live__videoCtn-controls-bottom-playbackTime'>
                  {currentTime} / {duration}
                </div>
              </div>
              <div>
                <div
                  className='live__videoCtn-controls-bottom-icon expand-icon'
                  onClick={() => setIsExpand(!isExpand)}
                >
                  {!isExpand ? <CgIcon.CgArrowsShrinkH /> : <CgIcon.CgArrowsMergeAltH />}
                </div>
                <div
                  onClick={handleToggleFullscreen}
                  className='live__videoCtn-controls-bottom-icon fullscreen-icon'
                >
                  {!isFullScreen ? <RiIcon.RiFullscreenLine /> : <RiIcon.RiFullscreenExitLine />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='live__info'>
          <div className='live__info-menu'>
            <HiIcon.HiDotsVertical className='icon' />
          </div>
          <div className='live__info-title'>
            {Stream.name}
          </div>
          {/* <div className='live__info-tag'># Trò Chơi Trí Tuệ</div> */}
          <div className='live__info-info'>
            <div className='live__info-avatar'>
              <img src={Stream?.user?.kyc.avatar?.path ? STORAGE_DOMAIN + Stream.user.kyc.avatar.path : avatar0} alt='' />
            </div>
            <div>
              <div className='live__info-name'>{Stream?.user?.kyc.first_name} {Stream?.user?.kyc.last_name}</div>
              <div className='live__info-date'>{convertDate(Stream.create_date)}</div>
              <div className='live__info-view'>
                <span>{useNumber(Stream?.viewers)} view</span>
                <span>{useNumber(Stream?.user?.followers)} follower</span>
              </div>
              <div className={`live__info-desc ${isShowMore ? 'd-block' : ''}`}>
                {Stream?.description}
              </div>
              <div className='live__info-showMore mt-20' onClick={() => setIsShowMore(!isShowMore)}>
                {!isShowMore ? 'Show more...' : 'Hide...'}
              </div>
            </div>
            { Stream?.user?._id !== user?._id &&  <div>
              <div onClick={handleFollow} className='live__info-btnFollow'>
                <HiIcon.HiPlus className='icon' />
                <span>{IsFollowed ? 'Unfollow' : 'Follow'}</span>
              </div>
            </div>}
          </div>
        </div>

        <div className='live__expand'>
          <div className='live__chat'>
            <div className={`live__chatBox ${isHideChat ? 'd-none' : ''}`}>
              <div className='live__chatBox-top'>

              <div className='live__chatBox-top'>
                {Chat.map(o => 
                  <div className='live__chatBox-top-ctn'>
                    <div className='live__chatBox-top-ctn-avatar'>
                      <img src={o.user?.kyc.avatar?.path ? STORAGE_DOMAIN + o.user?.kyc.avatar?.path : avatar0} alt='' />
                    </div>
                    <div>
                      <div className='live__chatBox-top-ctn-name'>{o.user?.kyc.first_name} {o.user?.kyc.last_name}{':'}</div>
                      <div className='live__chatBox-top-ctn-text'>{o.chat}</div>
                    </div>
                  </div>
                )}
              </div>

              </div>

              <div className='live__chatBox-bottom'>
                {/* <div className='live__chatBox-bottom-btn'>
                  <div className='live__chatBox-bottom-btn-gift'>
                    <FaIcon.FaGift className='icon' />
                    <span>Gift</span>
                  </div>
                </div> */}
                <div className='live__chatBox-bottom-chat'>
                  <div className='live__chatBox-bottom-chat-avatar'>
                    <img src={user?.kyc.avatar?.path ? STORAGE_DOMAIN + user?.kyc.avatar?.path : avatar0} alt='' />
                  </div>
                  <form className='live__chatBox-bottom-chat-inputBox'>
                    <input ref={chatRef} type='text' placeholder='Say something' />
                    <button type="submit" className='icon icon-send' ><RiIcon.RiSendPlaneFill /></button>
                    <RiIcon.RiEmotionLaughLine className='icon icon-emo' />
                  </form>
                </div>
              </div>
            </div>
            <div className='live__chatBtn' onClick={() => setIsHideChat(!isHideChat)}>
              {!isHideChat ? 'Hide Chat' : 'Show Chat'}
            </div>
          </div>

          <div className='live__recommend'>
            <div className='live__recommend-title'>Recommend</div>

            <div className='live__recommend-ctn'>
              <div className='live__recommend-ctn-avatar'>
                <img  alt='' />
              </div>
              <div>
                <div className='live__recommend-ctn-name'>Trà Long</div>
                <div className='live__recommend-ctn-title'>Live: Homeworld Mobile</div>
              </div>
              <div className='live__recommend-ctn-watching'>{useNumber(3000)} watching</div>
            </div>

            <div className='live__recommend-ctn'>
              <div className='live__recommend-ctn-avatar'>
                <img  alt='' />
              </div>
              <div>
                <div className='live__recommend-ctn-name'>Trà Long</div>
                <div className='live__recommend-ctn-title'>
                  Live: Homeworld Mobile – Hậu Bản Di Động Của Thương Hiệu Game Chiến Thuật Khi Xưa
                </div>
              </div>
              <div className='live__recommend-ctn-watching'>{useNumber(30000000)} đang xem</div>
            </div>
          </div>
        </div>
      </div>

      <div className='live__right'>
        <div className='live__chat'>
          <div className={`live__chatBox ${isHideChat ? 'd-none' : ''}`}>
            <div className='live__chatBox-top'>
              
              {Chat.map(o => 
                <div className='live__chatBox-top-ctn'>
                  <div className='live__chatBox-top-ctn-avatar'>
                    <img src={o.user?.kyc.avatar?.path ? STORAGE_DOMAIN + o.user?.kyc.avatar?.path : avatar0} alt='' />
                  </div>
                  <div>
                    <div className='live__chatBox-top-ctn-name'>{o.user?.kyc.first_name} {o.user?.kyc.last_name}{':'}</div>
                    <div className='live__chatBox-top-ctn-text'>{o.chat}</div>
                  </div>
                </div>
              )}
            </div>

            <div className='live__chatBox-bottom'>
              {/* <div className='live__chatBox-bottom-btn'>
                <div className='live__chatBox-bottom-btn-gift'>
                  <FaIcon.FaGift className='icon' />
                  <span>Gift</span>
                </div>
              </div> */}
              <div className='live__chatBox-bottom-chat'>
                <div className='live__chatBox-bottom-chat-avatar'>
                  <img src={user?.kyc.avatar?.path ? STORAGE_DOMAIN + user?.kyc.avatar?.path : avatar0} alt='' />
                </div>
                <form onSubmit={handleChat} className='live__chatBox-bottom-chat-inputBox'>
                  <input ref={chatRef} name="chat" type='text' placeholder='Say something' />
                  <button type="submit" className='icon icon-send'><RiIcon.RiSendPlaneFill/></button>
                  {/* <RiIcon.RiEmotionLaughLine className='icon icon-emo' /> */}
                </form>
              </div>
            </div>
          </div>
          <div className='live__chatBtn' onClick={() => setIsHideChat(!isHideChat)}>
            {!isHideChat ? 'Hide Chat' : 'Show Chat'}
          </div>
        </div>

        <div className='live__recommend'>
          <div className='live__recommend-title'>Recommend</div>

          <div className='live__recommend-ctn'>
            <div className='live__recommend-ctn-avatar'>
              <img  alt='' />
            </div>
            <div>
              <div className='live__recommend-ctn-name'>Trà Long</div>
              <div className='live__recommend-ctn-title'>Live: Homeworld Mobile</div>
            </div>
            <div className='live__recommend-ctn-watching'>{useNumber(3000)} watching</div>
          </div>

          <div className='live__recommend-ctn'>
            <div className='live__recommend-ctn-avatar'>
              <img  alt='' />
            </div>
            <div>
              <div className='live__recommend-ctn-name'>Trà Long</div>
              <div className='live__recommend-ctn-title'>
                Live: Homeworld Mobile – Hậu Bản Di Động Của Thương Hiệu Game Chiến Thuật Khi Xưa
              </div>
            </div>
            <div className='live__recommend-ctn-watching'>{useNumber(30000000)} đang xem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
