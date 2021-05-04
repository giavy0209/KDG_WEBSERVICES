import React, { useCallback, useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import '../../assets/css/setup.css';
import callAPI from '../../axios';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { Main } from '../../layout';
import socket from '../../socket';
import SetupLeft from './SetupLeft';
import SetupRight from './SetupRight';

const Setup = () => {
  const history = useHistory();
  const [Stream, setStream] = useState({});
  const [{ language, setup }] = useLanguageLayerValue();

  const CopyToClipboard = useCallback(
    ref => {
      var input = document.createElement('input');
      document.querySelector('body').append(input);
      input.value = ref;
      input.select();
      document.execCommand('copy');
      input.remove();
      NotificationManager.success(setup[language].copied, null, 1000);
    },
    [setup, language]
  );

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
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  }, []);

  useEffect(() => {
    document.title = 'Kinglive TV'
    callAPI.get('/stream').then(res => {
      setStream(res.data);
    });

    const handleStream = function (data) {
      setStream(data);
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
      await callAPI.post('/public_stream?sid=' + Stream._id, data);
    },
    [Stream]
  );

  const handleStopStream = useCallback(async () => {
    await callAPI.post('/stop_stream?sid=' + Stream._id);
    toast(
      'Bạn vừa kết thúc buổi streaming, video của bạn sẽ được xử lý và đăng công khai. Bạn sẽ nhận được thông báo khi video sẵn sàng'
    );
    history.push('/');
  }, [history, Stream]);

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
