import React, { useEffect, useMemo, useState } from 'react';
import '../../assets/css/live.css';

import avatar1 from '../../assets/images/live/avatar1.png';
import useNumber from '../../hooks/useNumber';
import { useLocation } from 'react-router';
import callAPI from '../../axios';


const Live = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('v');
    const [isShowMore, setIsShowMore] = useState(false);
    const [Video, setVideo] = useState(null)
    useMemo(() => {
        callAPI.get('/video?sid='+id)
        .then(res => {
            setVideo(res.data)
        })
    },[id])
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
                        Live: Homeworld Mobile – Hậu Bản Di Động Của Thương Hiệu Game Chiến Thuật
                        Khi Xưa
                    </div>
                    <div className='live__info-tag'># Trò Chơi Trí Tuệ</div>
                    <div className='live__info-info'>
                        <div className='live__info-avatar'>
                            <img src={avatar1} alt='' />
                        </div>
                        <div>
                            <div className='live__info-name'>Trà Long</div>
                            <div className='live__info-date'>Today, 29-08-2021</div>
                            <div className='live__info-view'>
                                <span>{useNumber(11000)} view</span>
                                <span>{useNumber(200)} follower</span>
                            </div>
                            <div className={`live__info-desc ${isShowMore ? 'd-block' : ''}`}>
                                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every
                                Friday morning to explore the beauty of digital risk-taking &
                                learning to draw and sketchnote with Adobe Fres
                                <br />
                                <br />
                                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every
                                Friday morning to explore the beauty of digital risk-taking &
                                learning to draw and sketchnote with Adobe Fres
                                <br />
                                <br />
                                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every
                                Friday morning to explore the beauty of digital risk-taking &
                                learning to draw and sketchnote with Adobe Fres
                                <br />
                                <br />
                                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every
                                Friday morning to explore the beauty of digital risk-taking &
                                learning to draw and sketchnote with Adobe Fres
                                <br />
                                <br />
                                Grab your ☕, ☀️ Grab your 🚰!, 🌇 Grab your 🍹, and join me every
                                Friday morning to explore the beauty of digital risk-taking &
                                learning to draw and sketchnote with Adobe Fres
                            </div>
                            <div
                                className='live__info-showMore mt-20'
                                onClick={() => setIsShowMore(!isShowMore)}
                            >
                                {!isShowMore ? 'Show more...' : 'Hide...'}
                            </div>
                        </div>
                        <div>
                            <div className='live__info-btnFollow'>
                                <span>Follow</span>
                            </div>
                        </div>
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
