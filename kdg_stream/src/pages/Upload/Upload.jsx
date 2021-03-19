import React, { useState } from 'react';
import * as FaIcon from 'react-icons/fa';
import * as GoIcon from 'react-icons/go';
import * as RiIcon from 'react-icons/ri';
import * as TiIcon from 'react-icons/ti';
import '../../assets/css/setup.css';

const Upload = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(0);

  return (
    <div className='setup'>
      <div className='setup__tabSetup'>
        <div className='setup__tabSetup-title'>Setup</div>
        <div className='setup__tabSetup-inputBox'>
          <input type='text' placeholder='Title' />
        </div>
        <div className='setup__tabSetup-textareaBox mt-20'>
          <textarea placeholder='Something about this livestream'></textarea>
        </div>
        <div className='setup__tabSetup-radioBox mt-20'>
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
        </div>
        <div className='setup__tabSetup-type mt-20'>
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
        </div>
        {/* <div className='setup__tabSetup-note mt-30'>
          <p>Lưu ý</p>
          <p>
            - Đảm bảo trong quá trình livestream không có hành động, lời nói mang tính chất bạo
            động, phản cách mạng.
          </p>
          <p>- Không sử dụng hình ảnh nghệ sĩ nổi tiếng khi chưa có sự cho phép.</p>
        </div> */}
        <div className='setup__tabSetup-thumbnailBox mt-20'>
          <input type='file' />
          <GoIcon.GoCloudUpload className='icon' />
          <p>Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa = 2MB</p>
          <p>Để đảm bảo hình ảnh thu hút người xem, vui lòng sử dụng hình ảnh sắc nét</p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
