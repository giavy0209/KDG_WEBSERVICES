import React, { useCallback, useState } from 'react';
import * as FaIcon from 'react-icons/fa';
import * as GoIcon from 'react-icons/go';
import * as RiIcon from 'react-icons/ri';
import * as TiIcon from 'react-icons/ti';
import '../../assets/css/upload.css';
import callAPI from '../../axios';

const Upload = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(0);
  const [VideoSrc, setVideoSrc] = useState(null)
  const [VideoTitle, setVideoTitle] = useState('')
  const readURL = useCallback((input) => {
    input.persist()
    input = input.target
    console.log(input.files[0]);
    if (input.files && input.files[0]) {
      setVideoTitle(input.files[0].name)
      var reader = new FileReader();
      reader.onload = function (e) {
        var label = input.nextElementSibling
        setVideoSrc(e.target.result)
      }
      reader.readAsDataURL(input.files[0]);
    }
  }, [])

  const handleUpload = useCallback(async e => {
    e.preventDefault()
    const data = new FormData(e.target);
    const submitData = {};
    for (var pair of data.entries()) {
      submitData[pair[0]] = pair[1];
    }
    console.log(submitData);
    const res = await callAPI.post('/upload_video', data, true, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: e => {
        console.log(e);
        if (e.lengthComputable) {
          console.log(e.loaded + ' ' + e.total);
        }
      }
    })
    console.log(res);
  }, [])

  return (
    <div className='setup'>
      <form onSubmit={handleUpload} className='setup__tabSetup'>
        <div className='setup__tabSetup-title'>Upload</div>
        <div className='setup__tabSetup-inputBox'>
          <input value={VideoTitle} onChange={e => setVideoTitle(e.target.value)} name="title" type='text' placeholder='Title' />
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
        <button type="submit" className='button-upload mt-20' >Upload</button>
      </form>
    </div>
  );
};

export default Upload;
