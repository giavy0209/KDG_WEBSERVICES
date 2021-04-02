import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/crop.css';
import callAPI from '../../axios';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { actChangeUploadStatus } from '../../store/action';

export default function Crop({
  onCancel = ()=>{},
  onFinish = ()=>{}
}) {
  const dispatch = useDispatch()
  const uploadStatus = useSelector(state => state.uploadStatus)
  const { image, imagePos ,label , _id} = uploadStatus || {}
  const [{ language, cropLang }] = useLanguageLayerValue();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1000);

  const onCropComplete = useCallback(({ x, y, width }) => {
    dispatch(actChangeUploadStatus({
      ...uploadStatus , 
      imagePos : {
        x,
        y,
        zoom : 10000/width
      }
    }))
  }, [uploadStatus]);

  const handleUploadAvatar = useCallback(async () => {
    if(_id){
      callAPI.post('/avatar?avatar='+_id);
    }else{
      const data = new FormData();
      data.append('file' , document.getElementById(label).files[0])
      callAPI.post('/avatar', data);
    }
    callAPI.post('/avatar_pos', imagePos);
    document.getElementById(label).value = null
    onFinish()
  }, [imagePos ,label, _id , onFinish]);

  return (
    <div className='crop-container'>
      <Cropper
        image={image}
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
        <button onClick={handleUploadAvatar} className='button'>
          <span>{cropLang[language].confirm}</span>
        </button>

        <button
          onClick={onCancel}
          className='button'
        >
          <span>{cropLang[language].cancel}</span>
        </button>
      </div>
    </div>
  );
}
