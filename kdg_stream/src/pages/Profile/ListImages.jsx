import { useCallback, useMemo, useState } from 'react';
import '../../assets/css/profile.css';
import callAPI from '../../axios';
import { STORAGE_DOMAIN } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { actChangeUploadStatus } from '../../store/action';

export default function ModalBody() {
    const dispatch = useDispatch()
    const uploadStatus = useSelector(state => state.uploadStatus)
    const [Avatars, setAvatars] = useState([]);
    const getAvatar = useCallback(async () => {
        const res = await callAPI.get('/avatar')
        setAvatars(res.data)
    },[])

    const handleOpenCrop = useCallback((image , _id) => {
        dispatch(actChangeUploadStatus({
            ...uploadStatus,
            isShowCrop : true,
            image,
            _id
        }))
    },[uploadStatus])

    useMemo(() => {
        getAvatar()
    },[getAvatar])

    return (
        <div className="kdg-row kdg-column-3">
            {
                Avatars.map(o => 
                    <div 
                    onClick={() => handleOpenCrop(STORAGE_DOMAIN + o.path , o._id)}
                    key={o._id} className="item">
                        <div className="img img-1-1">
                            <img src={STORAGE_DOMAIN + o.path} alt=""/>
                        </div>
                    </div>
                )
            }
        </div>
  );
}
