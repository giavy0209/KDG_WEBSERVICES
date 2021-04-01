import {  Tab, TabPane } from '../../components';
import '../../assets/css/profile.css'
import { useCallback, useMemo, useState } from 'react';
import callAPI from '../../axios';
import { STORAGE_DOMAIN } from '../../constant';
export default function Modal({
    onCancle,
    title,
    visible,
    content
}) {
    const [Avatars, setAvatars] = useState([]);
    const getAvatar = useCallback(async () => {
        const res = await callAPI.get('/avatar')
        
        setAvatars(res.data)
    },[])

    useMemo(() => {
        getAvatar()
    },[])

    if(visible){
        return (
            <>
                <div className="modal">
                    <div onClick={onCancle} className="mask"></div>
                    <div className="body">
                        <p className="title">{title}</p>
                        <div className="content">
                            {content}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else{
        return null
    }
}