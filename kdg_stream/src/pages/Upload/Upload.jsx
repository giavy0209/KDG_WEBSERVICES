import React, { useCallback, useEffect, useState } from 'react';
import * as FaIcon from 'react-icons/fa';
import * as GoIcon from 'react-icons/go';
import * as RiIcon from 'react-icons/ri';
import * as TiIcon from 'react-icons/ti';
import { useHistory } from 'react-router';
import '../../assets/css/upload.css';
import callAPI from '../../axios';
import socket from '../../socket'
const Upload = () => {
  const history = useHistory()
  const [Guid, setGuid] = useState(null);
  const [ShortId, setShortId] = useState(null);
  const [IsUploading, setIsUploading] = useState(false);
  const [Status, setStatus] = useState(null);
  const [StatusCode, setStatusCode] = useState(null);
  const [VideoSrc, setVideoSrc] = useState(null)
  const [VideoTitle, setVideoTitle] = useState('')
  const [Progress, setProgress] = useState('0%')
  const readURL = useCallback((input) => {
    input.persist()
    input = input.target
    if (input.files && input.files[0]) {
      setVideoTitle(input.files[0].name)
      var reader = new FileReader();
      reader.onload = function (e) {
        let buffer = e.target.result;
        let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
        let url = window.URL.createObjectURL(videoBlob);
        setVideoSrc(url)
      }
      reader.readAsArrayBuffer(input.files[0]);
    }
  }, [])

  const handleUpload = useCallback(async e => {
    e.preventDefault()
    if(IsUploading) return
    setIsUploading(true)
    const data = new FormData(e.target);

    setStatus('Đang tải lên')
    setStatusCode(null)
    const res = await callAPI.post('/upload_video', data, true, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: e => {
        if (e.lengthComputable) {
          let percent = Math.round(e.loaded / e.total * 100)
          if(percent > 90) percent = 90
          setProgress( percent + '%')
          console.log(e.loaded + ' ' + e.total);
        }
      }
    })
    if(res.status === 1) {
      setStatus('Tải lên thành công, chờ xử lý video')
      setGuid(res.guid)
      setShortId(res.video.short_id)
    }
    if(res.status === 0) {
      setStatus('Có lỗi trong quá trình xử lý video, vui lòng thử lại')
    }
  }, [IsUploading])

  useEffect(() => {
    const handleVideoStatus = ({status , guid}) => {
      if(guid !== Guid) return
      switch (status) {
        case 1:
          setStatus('Đang xử lý video')
          setProgress('91%')
          break
        case 2 :
          setStatus('Đang mã hóa video')
          setProgress('95%')
          break
        case 4 : 
          setStatus('Video có thể phát, xem ngay')
          setProgress('99%')
          setIsUploading(false)
          setStatusCode(4)
          break
        case 3 :
          setStatus('Đã xử lý xong video với chất lượng tốt nhất, xem ngay')
          setProgress('100%')
          break
        case 5 : 
          setStatus('Có lỗi trong quá trình xử lý video, vui lòng thử lại')
          break
      }
    }
    socket.on('video_status' ,handleVideoStatus)

    return () => {
      socket.removeListener('video_status' , handleVideoStatus)
    }
  },[Guid])

  return (
    <div className='setup'>
      <form onSubmit={handleUpload} className='setup__tabSetup'>
        <div className='setup__tabSetup-title'>Upload</div>
        {
          Status && <> 
          <div style={{'--progress' : Progress}} className="setup__progress-bar"><span><span>{Progress}</span></span></div>
          <div onClick={() => {StatusCode === 4 && history.push('/watch?v='+ShortId)}} className="status mt-5">{Status}</div>
          </>
        }
        <div className='setup__tabSetup-inputBox mt-20'>
          <input value={VideoTitle} onChange={e => setVideoTitle(e.target.value)} name="name" type='text' placeholder='Title' />
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
            <div className='dropdown__selected' onClick={() => setIsShowDropdown(!isShowDropdown)}>
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
        {/* <div className='setup__tabSetup-note mt-30'>
          <p>Lưu ý</p>
          <p>
            - Đảm bảo trong quá trình livestream không có hành động, lời nói mang tính chất bạo
            động, phản cách mạng.
          </p>
          <p>- Không sử dụng hình ảnh nghệ sĩ nổi tiếng khi chưa có sự cho phép.</p>
        </div> */}
        <label htmlFor="inputfile" className='setup__tabSetup-thumbnailBox mt-20'>
          <input name="video" onChange={readURL} id="inputfile" type='file' />
          {VideoSrc && <video autoPlay muted src={VideoSrc}></video>}
          <GoIcon.GoCloudUpload className='icon' />
        </label>
        <button style={{pointerEvents : IsUploading ? 'none' : 'all'}} type="submit" className='button-upload mt-20' >Upload</button>
      </form>
    </div>
  );
};

export default Upload;
