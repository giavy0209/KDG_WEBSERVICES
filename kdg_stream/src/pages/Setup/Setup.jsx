import React, { useCallback, useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../../assets/css/setup.css';
import callAPI from '../../axios';
import { PLAY_STREAM } from '../../constant';
import { Main } from '../../layout';
import socket from '../../socket';
import SetupLeft from './SetupLeft';
import SetupRight from './SetupRight';

const Setup = () => {
  const [Stream, setStream] = useState({});

  const CopyToClipboard = useCallback(ref => {
    var input = document.createElement('input');
    document.querySelector('body').append(input);
    input.value = ref;
    input.select();
    document.execCommand('copy');
    input.remove();
    NotificationManager.success('Đã copy', null, 1000);
  }, []);

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
        input.nextElementSibling.style.display = 'inline';
        input.nextElementSibling.style.borderRadius = '10px';
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  }, []);

  useEffect(() => {
    callAPI.get('/stream').then(res => {
      console.log(res);
      setStream(res.data);
      if (res.data?.connect_status === 1) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = window.flvjs.createPlayer({
          type: 'flv',
          url: `${PLAY_STREAM}${res.data.key}.flv`,
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    });

    const handleStream = function (data) {
      setStream(data);
      if (data.connect_status === 1) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = window.flvjs.createPlayer({
          type: 'flv',
          url: `${PLAY_STREAM}${data.key}.flv`,
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    };
    socket.on('stream', handleStream);

    return () => {
      socket.removeEventListener('stream', handleStream);
    };
  }, []);

  const handlePublicStream = useCallback(
    async e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const res = await callAPI.post('/public_stream?sid=' + Stream._id, data);
      console.log('handlePublicStream', res);
    },
    [Stream]
  );

  const handleStopStream = useCallback(async () => {
    const res = await callAPI.post('/stop_stream?sid=' + Stream._id);
    console.log('handleStopStream', res);
  }, [Stream]);

  return (
    <>
      <NotificationContainer />

      <Main
        className='setup'
        left={<SetupLeft Stream={Stream} />}
        right={
          <SetupRight
            Stream={Stream}
            readURL={readURL}
            handlePublicStream={handlePublicStream}
            handleStopStream={handleStopStream}
            CopyToClipboard={CopyToClipboard}
          />
        }
        widthLeft='68%'
        minWidthLeftLarge='450px'
      />
    </>
  );
};

export default Setup;
