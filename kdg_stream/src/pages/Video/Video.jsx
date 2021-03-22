import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../../assets/css/live.css';

import avatar0 from '../../assets/images/header/avatar0.png';
import avatar1 from '../../assets/images/live/avatar1.png';
import useNumber from '../../hooks/useNumber';
import { useLocation } from 'react-router';
import callAPI from '../../axios';
import { STORAGE_DOMAIN } from '../../constant';
import { useSelector } from 'react-redux';


const Live = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('v');
    const user = useSelector(state => state.user)
    const [isShowMore, setIsShowMore] = useState(false);
    const [Video, setVideo] = useState(null)
    const [IsFollowed, setIsFollowed] = useState(false)
    useMemo(() => {
        callAPI.get('/video?sid='+id)
        .then(res => {
            setVideo(res.data)
            setIsFollowed(res.is_followed ? true : false)
        })
    },[id])

    const handleFollow = useCallback(async () => {
        const res = await callAPI.post('follow?id='+Video.user._id)
        if(res.status === 1) {
            setIsFollowed(!IsFollowed)
        }
    },[Video,IsFollowed])
    return (
        <div className={`live`}>
            <div className='live__left'>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    {Video && <iframe src={`https://iframe.mediadelivery.net/embed/1536/${Video.guid}?autoplay=true`} loading="lazy" style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%', }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen="true"></iframe>}
                </div>

                <div className='live__info'>
                    <div className='live__info-menu'>
                    </div>
                    <div className='live__info-title'>
                        {Video?.name}
                    </div>
                    <div className='live__info-info'>
                        <div className='live__info-avatar'>
                            <img src={Video?.user.kyc.avatar ? STORAGE_DOMAIN + Video?.user?.kyc.avatar.path : avatar0} alt='' />
                        </div>
                        <div>
                            <div className='live__info-name'>{Video?.user.kyc.first_name} {Video?.user.kyc.last_name}</div>
                            <div className='live__info-date'>{Video?.create_date}</div>
                            <div className='live__info-view'>
                                <span>{useNumber(Video?.views)} view</span>
                                <span>{useNumber(Video?.user.total_follow)} follower</span>
                            </div>
                            <div className={`live__info-desc ${isShowMore ? 'd-block' : ''}`}>
                                {Video?.description}
                            </div>
                            <div
                                className='live__info-showMore mt-20'
                                onClick={() => setIsShowMore(!isShowMore)}
                            >
                                {!isShowMore ? 'Show more...' : 'Hide...'}
                            </div>
                        </div>
                        {(user && user._id !== Video.user._id) && <div>
                            <div
                            onClick={handleFollow}
                            className={`live__info-btnFollow ${IsFollowed ? 'active' : ''}`}>
                                <span>{IsFollowed ? 'Unfollow' : 'Follow'}</span>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className='live__expand'>
                    <div className='live__recommend'>
                        <div className='live__recommend-title'>Recommend</div>

                        <div className='live__recommend-ctn'>
                            <div className='live__recommend-ctn-avatar'>
                                <img src={avatar1} alt='' />
                            </div>
                            <div>
                                <div className='live__recommend-ctn-name'>Trà Long</div>
                                <div className='live__recommend-ctn-title'>
                                    Live: Homeworld Mobile
                                </div>
                            </div>
                            <div className='live__recommend-ctn-watching'>
                                {useNumber(3000)} watching
                            </div>
                        </div>

                        <div className='live__recommend-ctn'>
                            <div className='live__recommend-ctn-avatar'>
                                <img src={avatar1} alt='' />
                            </div>
                            <div>
                                <div className='live__recommend-ctn-name'>Trà Long</div>
                                <div className='live__recommend-ctn-title'>
                                    Live: Homeworld Mobile – Hậu Bản Di Động Của Thương Hiệu Game
                                    Chiến Thuật Khi Xưa
                                </div>
                            </div>
                            <div className='live__recommend-ctn-watching'>
                                {useNumber(30000000)} đang xem
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='live__right'>
                <div className='live__recommend'>
                    <div className='live__recommend-title'>Recommend</div>

                    <div className='live__recommend-ctn'>
                        <div className='live__recommend-ctn-avatar'>
                            <img src={avatar1} alt='' />
                        </div>
                        <div>
                            <div className='live__recommend-ctn-name'>Trà Long</div>
                            <div className='live__recommend-ctn-title'>Live: Homeworld Mobile</div>
                        </div>
                        <div className='live__recommend-ctn-watching'>
                            {useNumber(3000)} watching
                        </div>
                    </div>

                    <div className='live__recommend-ctn'>
                        <div className='live__recommend-ctn-avatar'>
                            <img src={avatar1} alt='' />
                        </div>
                        <div>
                            <div className='live__recommend-ctn-name'>Trà Long</div>
                            <div className='live__recommend-ctn-title'>
                                Live: Homeworld Mobile – Hậu Bản Di Động Của Thương Hiệu Game Chiến
                                Thuật Khi Xưa
                            </div>
                        </div>
                        <div className='live__recommend-ctn-watching'>
                            {useNumber(30000000)} đang xem
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Live;
