import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import '../../assets/css/crop.css';
import callAPI from '../../axios';

export default function Crop({
  Image,
  currentImage,
  setIsShowCrop,
  setImage,
  ImagePos,
  setImagePos,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1000);

  const onCropComplete = useCallback(
    ({ x, y, width }, croppedAreaPixels) => {
      console.log(x, y);
      setImagePos({ x, y, zoom: 10000 / width });
    },
    [setImagePos]
  );

  const handleUploadAvatar = useCallback(async () => {
    setIsShowCrop(false);
    const data = new FormData(document.getElementById('avatar'));

    await callAPI.post('/avatar', data);
    await callAPI.post('/avatar_pos', ImagePos);
  }, [ImagePos, setIsShowCrop]);

  return (
    <div className='crop-container'>
      <Cropper
        image={Image}
        zoom={zoom / 1000}
        crop={crop}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        showGrid={false}
        zoomWithScroll={false}
      />
      <input
        min='1000'
        max='3000'
        value={zoom}
        onChange={e => setZoom(e.target.value)}
        type='range'
        name=''
        id=''
      />
      <div className='btn-group'>
        <button onClick={handleUploadAvatar} className='buttonSetting'>
          <span>Đổng ý</span>
        </button>

        <button
          onClick={() => {
            setIsShowCrop(false);
            setImage(currentImage);
          }}
          className='buttonSetting'
        >
          <span>Hủy</span>
        </button>
      </div>
    </div>
  );
}
