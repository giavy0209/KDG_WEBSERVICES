import '../../assets/css/profile.css'
import { useCallback, useMemo, useState } from 'react';
import callAPI from '../../axios';
import { STORAGE_DOMAIN } from '../../constant';
export default function ModalBody() {
    const [Avatars, setAvatars] = useState([]);
    const getAvatar = useCallback(async () => {
        const res = await callAPI.get('/avatar')
        setAvatars(res.data)
    },[])

    useMemo(() => {
        getAvatar()
    },[])

    return (
        <div className="kdg-row kdg-column-3">
            {
                Avatars.map(o => 
                    <div key={o._id} className="item">
                        <div className="img img-1-1">
                            <img src={STORAGE_DOMAIN + o.path} alt=""/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}