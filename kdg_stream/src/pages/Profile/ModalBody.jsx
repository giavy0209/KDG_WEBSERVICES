import {  Tab, TabPane } from '../../components';
import ListImages from './ListImages'
import '../../assets/css/profile.css'
import { useCallback, useMemo, useState } from 'react';
import callAPI from '../../axios';
import * as GoIcon from 'react-icons/go';
import { useSelector } from 'react-redux';
export default function ModalBody() {
    const uploadStatus = useSelector(state => state.uploadStatus)
    console.log(uploadStatus);
    const [Avatars, setAvatars] = useState([]);
    const getAvatar = useCallback(async () => {
        const res = await callAPI.get('/avatar')
        setAvatars(res.data)
    },[])

    useMemo(() => {
        getAvatar()
    },[])

    return (
        <Tab> 
            <TabPane name="Chọn hình">
                <ListImages />
            </TabPane>
            <TabPane name="Tải hình lên">
                <label htmlFor={uploadStatus?.label} className="upload-avatar">
                    <GoIcon.GoCloudUpload className='icon' />
                </label>
            </TabPane>
        </Tab>
    )
}