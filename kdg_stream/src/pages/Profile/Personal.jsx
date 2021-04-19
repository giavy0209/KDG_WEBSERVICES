import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BREAK_POINT_MEDIUM, STORAGE_DOMAIN } from '../../constant';

import { useLanguageLayerValue } from "../../context/LanguageLayer";
import { convertDate, convertDateAgo } from "../../helpers";
import useWindowSize from "../../hooks/useWindowSize";

import { CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";
import callAPI from "../../axios";


export default function App() {
    const uid = new URLSearchParams(useLocation().search).get('uid');
    const user = useSelector(state => state.user);

    const history = useHistory()
    const [{ language, profile }] = useLanguageLayerValue();
    const [width] = useWindowSize();

    const [Videos, setVideos] = useState([]);
    const [convert, setConvert] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const isLoadRef = useRef(true);

    const isLoadFirst = useRef(true);

    const getVideo = useCallback(async () => {
        const res = await callAPI.get(
            `/videos?user=${uid}&limit=10&last=${Videos[Videos.length - 1]?._id}`
        );

        if (res.data?.length === 0) {
            return (isLoadRef.current = false);
        }

        setVideos([...Videos, ...res.data]);
    }, [Videos, uid]);

    useEffect(() => {
        const handleLoad = async () => {
            const totalHeight = document.getElementById('root').clientHeight;
            const scrolledHeight = window.scrollY + window.innerHeight;
            const restHeight = totalHeight - scrolledHeight;
            const isEnd = restHeight <= 500;

            if (isEnd && isLoadRef.current) {
                setIsLoading(true);
                await getVideo();
                setIsLoading(false);
            }
        };

        if (uid && isLoadFirst.current) {
            getVideo();
            isLoadFirst.current = false;
        }

        window.addEventListener('scroll', handleLoad);

        return () => {
            window.removeEventListener('scroll', handleLoad);
        };
    }, [getVideo, uid]);

    return (
        <>
            {uid !== user?._id && (
                <div className='profile__boxPersonal'>
                    <div className='profile__boxPersonal-title'>{profile[language].playlist}</div>

                    <div
                        className={`layoutFlex pl-10 pr-10 ${width > BREAK_POINT_MEDIUM ? 'layout-2' : 'layout-1'
                            }`}
                        style={{ '--gap-row': '40px', '--gap-column': '40px' }}
                    >
                        {Videos.map(o => (
                            <div
                                key={o._id}
                                className='layoutFlex-item'
                                onClick={() => history.push('/watch?v=' + o.short_id)}
                            >
                                <div className='profile__video'>
                                    <div className='profile__video-thumbnail'>
                                        <img
                                            alt=''
                                            onMouseOver={e => {
                                                var targat = e.target;
                                                targat.setAttribute(
                                                    'src',
                                                    `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/preview.webp`
                                                );
                                            }}
                                            onMouseOut={e => {
                                                var targat = e.target;
                                                targat.setAttribute(
                                                    'src',
                                                    `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`
                                                );
                                            }}
                                            src={
                                                o.thumbnail
                                                    ? STORAGE_DOMAIN + o.thumbnail.path
                                                    : `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`
                                            }
                                        />
                                    </div>
                                    <div className='profile__video-info'>
                                        <p className='profile__video-info-title'>{o.name}</p>
                                        <div className='profile__video-info-view'>
                                            {o.views} {profile[language].views}
                                        </div>
                                        <div
                                            className='profile__video-info-date'
                                            data-date={convertDate(o.create_date)}
                                            data-ago={convertDateAgo(o.create_date)}
                                            data-current='ago'
                                            onClick={e => {
                                                e.stopPropagation();
                                                const el = e.target;
                                                const current = el.getAttribute('data-current');
                                                if (current === 'ago') {
                                                    el.setAttribute('data-current', 'date');
                                                    el.innerText = el.getAttribute('data-date');
                                                } else {
                                                    el.setAttribute('data-current', 'ago');
                                                    el.innerText = el.getAttribute('data-ago');
                                                }
                                            }}
                                        >
                                            {convertDateAgo(o.create_date)}
                                        </div>
                                        {/* <p className='profile__video-info-tag'></p> */}
                                        <p className='profile__video-info-desc'>{o.description}</p>
                                    </div>
                                </div>
                            </div>
                            // <div key={o._id} className='layoutFlex-item'>
                            //   <RecommendVideo video={o} onClick={() => history.push('/watch?v=' + o.short_id)} />
                            // </div>
                        ))}
                    </div>

                    {isLoading && (
                        <CircularProgress
                            color='inherit'
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                margin: '20px',
                                color: '#e41a7f',
                            }}
                        />
                    )}
                </div>
            )}
            <div className='profile__boxPersonal'>
                <div className='profile__boxPersonal-title'>{profile[language].playlist}</div>

                <div
                    className={`layoutFlex pl-10 pr-10 ${width > BREAK_POINT_MEDIUM ? 'layout-2' : 'layout-1'
                        }`}
                    style={{ '--gap-row': '40px', '--gap-column': '40px' }}
                >
                    {Videos.map(o => (
                        <div
                            key={o._id}
                            className='layoutFlex-item'
                            onClick={() => history.push('/watch?v=' + o.short_id)}
                        >
                            <div className='profile__video'>
                                <div className='profile__video-thumbnail'>
                                    <img
                                        onMouseOver={e => {
                                            var targat = e.target;
                                            targat.setAttribute(
                                                'src',
                                                `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/preview.webp`
                                            );
                                        }}
                                        onMouseOut={e => {
                                            var targat = e.target;
                                            targat.setAttribute(
                                                'src',
                                                `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`
                                            );
                                        }}
                                        src={
                                            o.thumbnail
                                                ? STORAGE_DOMAIN + o.thumbnail.path
                                                : `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`
                                        }
                                        alt=''
                                    />
                                </div>

                                <div className='profile__video-info'>
                                    <p className='profile__video-info-title'>{o.name}</p>
                                    <div className='profile__video-info-view'>
                                        {o.views} {profile[language].views}
                                    </div>
                                    <div
                                        className='profile__video-info-date'
                                        data-date={convertDate(o.create_date)}
                                        data-ago={convertDateAgo(o.create_date)}
                                        data-current='ago'
                                        onClick={e => {
                                            e.stopPropagation();
                                            const el = e.target;
                                            const current = el.getAttribute('data-current');
                                            if (current === 'ago') {
                                                el.setAttribute('data-current', 'date');
                                                el.innerText = el.getAttribute('data-date');
                                            } else {
                                                el.setAttribute('data-current', 'ago');
                                                el.innerText = el.getAttribute('data-ago');
                                            }
                                        }}
                                    >
                                        {convertDateAgo(o.create_date)}
                                    </div>
                                    {/* <p className='profile__video-info-tag'></p> */}
                                    <p className='profile__video-info-desc'>{o.description}</p>
                                </div>
                            </div>
                        </div>
                        // <div key={o._id} className='layoutFlex-item'>
                        //   <RecommendVideo
                        //     type='me'
                        //     video={o}
                        //     onClick={() => history.push('/watch?v=' + o.short_id)}
                        //   />
                        // </div>
                    ))}
                </div>
            </div>

            {isLoading && (
                <CircularProgress
                    color='inherit'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: '20px',
                        color: '#e41a7f',
                    }}
                />
            )}

            {/* <div className='profile__boxPersonal'>
              <div className='profile__boxPersonal-title'>
                Tra Long's recently streamed Categories
              </div>
              <div
                className={`layoutFlex ${
                  width > 1330
                    ? 'layout-4'
                    : width > 1030
                    ? 'layout-3'
                    : width > 570
                    ? 'layout-2'
                    : 'layout-1'
                }`}
                style={{ '--gap-row': '40px', '--gap-column': '40px' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => (
                  <div
                    key={el}
                    className='layoutFlex-item profile__video2'
                    onClick={() => history.push('/live')}
                  >
                    <div className='profile__video2-thumbnail'>
                      <img src={video4} alt='' />
                    </div>
                    <p className='profile__video2-title'>Play game</p>
                  </div>
                ))}
              </div>
            </div> */}
        </>
    )
}