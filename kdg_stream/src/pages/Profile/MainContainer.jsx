import { CircularProgress } from "@material-ui/core";
import * as IoIcon from 'react-icons/io';
import * as FaIcon from 'react-icons/fa';
import * as TiIcon from 'react-icons/ti';
import * as HiIcon from 'react-icons/hi';
import { Crop, Popper1, Tab, Table, TabPane } from '../../components';
import package1 from '../../assets/images/profile/package1.png';
import package2 from '../../assets/images/profile/package2.png';
import package3 from '../../assets/images/profile/package3.png';
import package4 from '../../assets/images/profile/package4.png';
import package5 from '../../assets/images/profile/package5.png';
import package6 from '../../assets/images/profile/package6.png';
import package7 from '../../assets/images/profile/package7.png';
import package8 from '../../assets/images/profile/package8.png';
import package9 from '../../assets/images/profile/package9.png';
import { convertDate, convertDateAgo } from '../../helpers';
import { BREAK_POINT_MEDIUM, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from "../../context/LanguageLayer";
import useWindowSize from "../../hooks/useWindowSize";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import callAPI from "../../axios";

const dataHead = {
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    note: 'Note',
    setting: '',
};

const dataBody = [
    {
        status: 'Convert',
        date: '01-12-2020',
        amount: '200 NB',
        note: 'from NB to KDG',
        setting: () => <HiIcon.HiDotsVertical className='table__dotIcon' />,
    },
    {
        status: 'Donate',
        date: '02-09-2020',
        amount: '500 NB',
        note: 'to Ha Lan',
        setting: () => <HiIcon.HiDotsVertical className='table__dotIcon' />,
    },
    {
        status: 'Donate',
        date: '13-01-2020',
        amount: '135 NB',
        note: 'to Thay Giao Ba',
        setting: () => <HiIcon.HiDotsVertical className='table__dotIcon' />,
    },
];

const dataPackage = [
    package1,
    package2,
    package3,
    package4,
    package5,
    package6,
    package7,
    package8,
    package9,
];
export default function MainContainer({
    uid,
    user,}) {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false);
    const [Videos, setVideos] = useState([]);

    const [width] = useWindowSize();
    const [{ language, profile }] = useLanguageLayerValue();

    const [isShowHistory, setIsShowHistory] = useState(false);
    const [convert, setConvert] = useState(true);
    const [isShow, setIsShow] = useState(false);
    const [type, setType] = useState('changes');
    const [pack, setPack] = useState(null);
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
        function removePopper1ByClick() {
            setIsShow(false);
        }

        function removePopper1ByEsc(e) {
            if (e.keyCode === 27) setIsShow(false);
        }

        window.addEventListener('click', removePopper1ByClick);
        window.addEventListener('keyup', removePopper1ByEsc);

        return () => {
            window.removeEventListener('click', removePopper1ByClick);
            window.removeEventListener('keyup', removePopper1ByEsc);
        };
    }, []);
    useEffect(() => {
        const handleLoad = async () => {
            const totalHeight = document.getElementById('root').clientHeight;
            const scrolledHeight = window.scrollY + window.innerHeight;
            const restHeight = totalHeight - scrolledHeight;
            const isEnd = restHeight <= 200;

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
    }, [getVideo]);
    return (
        <div className='container'>
            {isShow && <Popper1 type={type} pack={pack} />}
            {uid !== user?._id && (
                <div className='profile__boxPersonal'>
                    <div className='profile__boxPersonal-title'>{profile[language].playlist}</div>

                    <div
                        className={`layoutFlex pl-10 pr-10 ${width > BREAK_POINT_MEDIUM ? 'layout-2' : 'layout-1'
                            }`}
                        style={{
                            '--gap-row': '40px',
                            '--gap-column': '40px',
                        }}
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
                                            <span>
                                                {o.views} {profile[language].views}
                                            </span>
                                            <span>{o.create_date}</span>
                                        </div>
                                        {/* <p className='profile__video-info-tag'></p> */}
                                        <p className='profile__video-info-desc'>{o.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isLoading && (
                        <CircularProgress
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                margin: '20px',
                                color: '#e41a7f',
                            }}
                            color='inherit'
                        />
                    )}
                </div>
            )}

            {uid === user?._id && (
                <Tab>
                    <TabPane name={profile[language].personal} key='1'>
                        <div className='profile__boxPersonal'>
                            <div className='profile__boxPersonal-title'>{profile[language].playlist}</div>

                            <div
                                className={`layoutFlex pl-10 pr-10 ${width > BREAK_POINT_MEDIUM ? 'layout-2' : 'layout-1'
                                    }`}
                                style={{
                                    '--gap-row': '40px',
                                    '--gap-column': '40px',
                                }}
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
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        setConvert(x => !x);
                                                    }}
                                                >
                                                    {convert ? convertDateAgo(o.create_date) : convertDate(o.create_date)}
                                                </div>
                                                {/* <p className='profile__video-info-tag'></p> */}
                                                <p className='profile__video-info-desc'>{o.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isLoading && (
                            <CircularProgress
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    margin: '20px',
                                    color: '#e41a7f',
                                }}
                                color='inherit'
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
                    style={{
                      '--gap-column': width > 992 ? '50px' : '25px',
                      '--gap-row': '40px',
                    }}
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
                    </TabPane>

                    <TabPane name={profile[language].manage} key='2'>
                        <div className='profile__boxManage'>
                            <div className='profile__boxManage-title'>Convert</div>
                            <div className='profile__convert'>
                                <div className='profile__convert-date'>Today, 02-01-2021</div>
                                <div className='profile__convert-exchange'>
                                    <div>
                                        <p>From</p>
                                        <p>KDG</p>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>NB</p>
                                    </div>
                                </div>
                                <div className='profile__convert-rate'>
                                    <div>
                                        <p>100</p>
                                        <p>KDG</p>
                                    </div>
                                    <div>
                                        <p>500</p>
                                        <p>NB</p>
                                    </div>
                                </div>
                                <div className='profile__convert-asset'>
                                    <div>
                                        <p>500 KDG</p>
                                    </div>
                                    <div>
                                        <p>1000 NB</p>
                                    </div>
                                </div>
                                <div className='profile__convert-btnCtn'>
                                    <div className='profile__convert-btn'>Change</div>
                                </div>
                                <div
                                    className='profile__link'
                                    onClick={() => window.open('https://www.youtube.com/')}
                                >
                                    Learn more
                    </div>
                            </div>
                        </div>

                        <div className='profile__boxManage'>
                            <div
                                className={`profile__boxManage-title profile__historyTitle ${!isShowHistory ? 'mb-0' : ''
                                    }`}
                                onClick={() => setIsShowHistory(!isShowHistory)}
                            >
                                <span>History</span>
                                <TiIcon.TiArrowSortedDown className={`icon ${isShowHistory ? 'rotate' : ''}`} />
                            </div>

                            <div className={`profile__history ${isShowHistory ? 'show' : ''}`}>
                                <div style={{ overflowX: 'auto' }}>
                                    <Table dataHead={dataHead} dataBody={dataBody} />
                                </div>
                                <div
                                    className='profile__link'
                                    onClick={() => window.open('https://www.youtube.com/')}
                                >
                                    View All
                    </div>
                            </div>
                        </div>

                        <div className='profile__boxManage'>
                            <div className='profile__boxManage-title'>Manage Donate</div>
                            <div
                                className={`layoutFlex layout-8`}
                                style={{ '--gap-column': '60px', '--gap-row': '30px' }}
                            >
                                {dataPackage.map((item, i) => (
                                    <div
                                        key={i}
                                        className='layoutFlex-item profile__package'
                                        onClick={e => {
                                            e.stopPropagation();
                                            setType('changes');
                                            setPack(item);
                                            setIsShow(true);
                                        }}
                                    >
                                        <img src={item} alt='' className='profile__package-img' />
                                    </div>
                                ))}

                                <div
                                    className='layoutFlex-item profile__packageAdd'
                                    onClick={e => {
                                        e.stopPropagation();
                                        setType('add');
                                        setPack(null);
                                        setIsShow(true);
                                    }}
                                >
                                    <HiIcon.HiPlus className='icon' />
                                </div>
                            </div>
                        </div>

                        {/* <div className='profile__boxManage'>
                  <div className='profile__boxManage-title'>Donate</div>
                  <div style={{ overflowX: 'auto' }}>
                    <Table dataHead={dataHead1} dataBody={dataBody1} />
                  </div>
                </div> */}
                    </TabPane>
                </Tab>
            )}
        </div>
    )
}