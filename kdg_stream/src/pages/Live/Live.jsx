import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as FaIcon from 'react-icons/fa';
import * as RiIcon from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/live.css';
import callAPI from '../../axios';
import { Avatar, Recommend, VideoInfo } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import socket from '../../socket';
import { toast } from 'react-toastify';
import VideoPlayer from './VideoPlayer'
import { actChangeGifts } from '../../store/authAction';
const Live = () => {
  const [{ language, live }] = useLanguageLayerValue();

  const dispatch = useDispatch()

  const user = useSelector(state => state.user);
  const chatRef = useRef();
  const [Stream, setStream] = useState({});
  const [IsCanPlay, setIsCanPlay] = useState(false);
  const [Chat, setChat] = useState([]);
  const [ListGift, setListGift] = useState([]);
  const [IsShowGifts, setIsShowGifts] = useState(false);
  const [isHideChat, setIsHideChat] = useState(false);
  const id = new URLSearchParams(window.location.search).get('s');
  useEffect(() => {
    let streamId;
    callAPI.get('/streamming?id=' + id).then(res => {
      socket.emit('join_stream', res.data._id);
      streamId = res.data._id;
      setStream(res.data);
      if(res.data.connect_status === 1) setIsCanPlay(true);
    });

    const handleReceiveChat = function (chatData) {
      setChat(_chat => {
        return [..._chat, chatData];
      });
    };
    socket.on('chat', handleReceiveChat);

    const handleReceiveGift = gift => {
      setListGift(_listGift => {
        return[..._listGift , gift]
      })
    }

    socket.on('gift' , handleReceiveGift)

    const handleListGift = listGift => {
      console.log(listGift);
      dispatch(actChangeGifts(listGift))
    }

    socket.on('list_gift' , handleListGift)

    const handleStream = stream => {
      if(stream.connect_status === 1) {
        setTimeout(() => {
          setIsCanPlay(true);
        }, 5000);
      }
      else setIsCanPlay(false);
      
    }
    socket.on('stream' , handleStream)

    return () => {
      socket.emit('leave_stream', streamId);
      setChat([]);
      socket.removeEventListener('chat', handleReceiveChat);
      socket.removeEventListener('gift', handleReceiveGift);
      socket.removeEventListener('list_gift' , handleListGift)
      socket.removeEventListener('stream', handleStream);
    };
  }, [id]);

  useEffect(() => {
    document.querySelectorAll('.live__chatBox-top').forEach(el => {
      el.scroll(0, el.scrollHeight + 9999);
    });

    document.querySelectorAll('.live__chatfullscreen-top').forEach(el => {
      el.scroll(0, el.scrollHeight + 9999);
    });
  }, [Chat]);

  const handleChat = useCallback(
    e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const chat = data.get('chat');
      if (!chat) return;
      socket.emit('chat', { room: Stream._id, chat });
      e.target.reset();
    },
    [Stream]
  );

  const Gifts = useSelector(state => state.gifts)

  const handleSendGift = useCallback(async (gift_id) => {
    const res = await callAPI.post('/send_gift', {gift : gift_id , to : Stream.user._id})
    if(res.status === 1) toast('Gửi quà thành công')
    if(res.status === 101) toast('Bạn không đủ tiền')
  },[Stream])

  return (
    <div className='live'>
      <div className='live__left'>
        
          {
            (Stream && IsCanPlay) ? 
            (
              <VideoPlayer
              Chat={Chat}
              Stream={Stream}
              handleChat={handleChat}
              ListGift={ListGift}
              setListGift={setListGift}
              isHideChat={isHideChat}
              setIsHideChat={setIsHideChat}
              chatRef={chatRef}
              />
            ) 
            : 
            (
              <h1>Thằng này đang đi đái, chờ xíu</h1>
            )
          }
        <VideoInfo id={id} type='live' />
      </div>

      <div className='live__right'>
        <div className='live__chat'>
          <div className={`live__chatBox ${isHideChat ? 'd-none' : ''}`}>
            <div className='live__chatBox-top'>
              {Chat.map((o, i) => (
                <div className='live__chatBox-top-ctn' key={i}>
                  <div className='live__chatBox-top-ctn-avatar'>
                    <Avatar
                      src={
                        o.user?.kyc.avatar?.path
                          ? STORAGE_DOMAIN + o.user?.kyc.avatar?.path
                          : undefined
                      }
                      position={o.user?.kyc.avatar_pos}
                    />
                  </div>

                  <div>
                    <div className='live__chatBox-top-ctn-name'>
                      {o.user?.kyc.first_name} {o.user?.kyc.last_name}
                      {':'}
                    </div>
                    <div className='live__chatBox-top-ctn-text'>{o.chat}</div>
                  </div>
                </div>
              ))}
            </div>

            {user && (
              <div className='live__chatBox-bottom'>
                {/* <div className='live__chatBox-bottom-btn'>
                  <div className='live__chatBox-bottom-btn-gift'>
                    <FaIcon.FaGift className='icon' />
                    <span>Gift</span>
                  </div>
                </div> */}

                <div className='live__chatBox-bottom-chat'>
                  <div className='live__chatBox-bottom-chat-avatar'>
                    <Avatar
                      src={
                        user?.kyc.avatar?.path ? STORAGE_DOMAIN + user?.kyc.avatar?.path : undefined
                      }
                      position={user?.kyc.avatar_pos}
                    />
                  </div>

                  <form onSubmit={handleChat} className='live__chatBox-bottom-chat-inputBox'>
                    <input
                      ref={chatRef}
                      name='chat'
                      type='text'
                      placeholder={live[language].chathere}
                    />

                    <button type='submit' className='icon icon-send'>
                      <RiIcon.RiSendPlaneFill />
                    </button>
                    
                    <div className="icon icon-gift">
                      <div className={`popup-gift ${IsShowGifts ? 'show' : ''}`}>
                        {Gifts?.map(o => <div key={o._id} onClick={()=> handleSendGift(o._id)} className="item">
                          <img src={o.img} alt=""/>
                          <span className="price">{Math.ceil(o.price * 100) / 100} KDG</span>
                        </div> )}
                      </div>
                      <div 
                      onClick={()=>setIsShowGifts(!IsShowGifts)}
                      className='icon-gift-button'>
                        <FaIcon.FaGift />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className='live__chatBtn' onClick={() => setIsHideChat(x => !x)}>
            {isHideChat ? live[language].showchat : live[language].hidechat}
          </div>
        </div>

        <Recommend />
      </div>
    </div>
  );
};

export default Live;
