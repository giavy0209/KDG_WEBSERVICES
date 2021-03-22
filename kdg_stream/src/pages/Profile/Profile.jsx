import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../../assets/css/profile.css';

import { Card, Tab, TabPane, Table, Popper1 } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { useHistory, useLocation } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import useNumber from '../../hooks/useNumber';

import * as MdIcon from 'react-icons/md';
import * as FiIcon from 'react-icons/fi';
import * as FaIcon from 'react-icons/fa';
import * as TiIcon from 'react-icons/ti';
import * as HiIcon from 'react-icons/hi';

import avatar0 from '../../assets/images/header/avatar0.png';
import avatar1 from '../../assets/images/home/avatar1.png';
import avatar2 from '../../assets/images/home/avatar2.png';
import avatar3 from '../../assets/images/home/avatar3.png';
import cover1 from '../../assets/images/profile/cover1.png';
import package1 from '../../assets/images/profile/package1.png';
import package2 from '../../assets/images/profile/package2.png';
import package3 from '../../assets/images/profile/package3.png';
import package4 from '../../assets/images/profile/package4.png';
import package5 from '../../assets/images/profile/package5.png';
import package6 from '../../assets/images/profile/package6.png';
import package7 from '../../assets/images/profile/package7.png';
import package8 from '../../assets/images/profile/package8.png';
import package9 from '../../assets/images/profile/package9.png';
import { useSelector } from 'react-redux';
import callAPI from '../../axios';
import { STORAGE_DOMAIN } from '../../constant';

const dataHead1 = {
    avatar: '',
    name: 'Name',
    date: 'Date',
    amount: 'Amount',
    setting: '',
};

const dataBody1 = [
    {
        avatar: () => <img src={avatar1} alt='' className='table__ava' />,
        name: 'Jackie Phas',
        date: '25-12-2020',
        amount: '200 NB',
        setting: () => <HiIcon.HiDotsVertical className='table__dotIcon' />,
    },
    {
        avatar: () => <img src={avatar1} alt='' className='table__ava' />,
        name: 'Trung Phim',
        date: '05-10-2020',
        amount: '175 NB',
        setting: () => <HiIcon.HiDotsVertical className='table__dotIcon' />,
    },
    {
        avatar: () => <img src={avatar1} alt='' className='table__ava' />,
        name: 'Nguyen Viet',
        date: '14-07-2020',
        amount: '80 NB',
        setting: () => <HiIcon.HiDotsVertical className='table__dotIcon' />,
    },
];

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

const readURL = (input) => {
    input.persist()
    input = input.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = async function (e) {
            let buffer = e.target.result;
            let videoBlob = new Blob([new Uint8Array(buffer)]);
            let url = window.URL.createObjectURL(videoBlob);
            input.parentElement.nextElementSibling.querySelector('img').setAttribute('src', url)

            const data = new FormData(input.parentElement);

            const res = await callAPI.post('/avatar', data)
            if (res.status === 1) {
            }

        }
        reader.readAsArrayBuffer(input.files[0]);
    }
}
const Profile = () => {
    const history = useHistory()

    const uid = new URLSearchParams(useLocation().search).get('uid');
    let user = useSelector(state => state.user)

    const [{ language, profile }] = useLanguageLayerValue();
    const [isShow, setIsShow] = useState(false);
    const [type, setType] = useState('changes');
    const [pack, setPack] = useState(null);
    const [width, height] = useWindowSize();
    const [isShowProfileRight, setIsShowProfileRight] = useState(false);
    const [profileRightHeight, setProfileRightHeight] = useState(0);
    const [isShowHistory, setIsShowHistory] = useState(false);
    const [IsFollowed, setIsFollowed] = useState(false);
    const [Videos, setVideos] = useState([])
    const [UserOwner, setUserOwner] = useState({})
    const isLoadFirst = useRef(true)

    const getVideo = useCallback(async () => {
        const res = await callAPI.get(`/videos?user=${uid ? uid : user._id}&limit=${Videos.length + 10}` )
        setVideos([...res.data])
    }, [Videos, user,uid])

    const handleScroll = useCallback(async e => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            await getVideo();
            e.target.scroll(0, e.target.scrollTop + 100);
        }
    }, [getVideo]);

    useMemo(() => {
        if((user || uid) && isLoadFirst.current) {
            getVideo()
            isLoadFirst.current = false
        }
        if(uid) {
            callAPI.get('/user?uid='+uid)
            .then(res => {
                setUserOwner(res.data)
                setIsFollowed(res.data.isFollowed)
            })

        }
    }, [user ,uid])

    const handleFollow = useCallback(async () => {
        if(uid){
            const res = await callAPI.post('/follow?id='+uid)
            if(res.status === 1) {
                setIsFollowed(!IsFollowed)
            }
        }
    },[uid,IsFollowed])

    useEffect(() => {
        let profileLeft = document.querySelector('.profile__left');
        let profileLeftHeight = profileLeft.offsetHeight;
        setProfileRightHeight(profileLeftHeight);
    }, [height]);


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

    return (
        <div className='profile'>
            {isShow && <Popper1 type={type} pack={pack} />}
            <div onScroll={handleScroll} className='profile__left mt-10 pb-10'>
                <div className='profile__cover'>
                    <div className='profile__cover-img'>
                        <img src={cover1} alt='' />
                    </div>

                    <div className='profile__cover-ctnInfo'>
                        <form id="avatar" >
                            <input onChange={readURL} style={{ display: 'none' }} type="file" name="file" id="avatar-input" />
                        </form>
                        <label htmlFor="avatar-input" className='profile__cover-avatar'>
                            <img src={
                                uid ?  
                                UserOwner?.kyc?.avatar ? STORAGE_DOMAIN + UserOwner?.kyc?.avatar?.path : avatar0
                                :
                                user?.kyc?.avatar ? STORAGE_DOMAIN + user?.kyc?.avatar?.path : avatar0
                            } alt='' />
                            {/* <div className="profile__cover-confirm">
                                
                            </div> */}
                        </label>

                        {
                            uid ? 
                            <p className='profile__cover-name'>
                                {UserOwner?.kyc?.first_name} {UserOwner?.kyc?.last_name}
                            </p>
                            :
                            <p className='profile__cover-name'>
                                {user?.kyc?.first_name} {user?.kyc?.last_name}
                            </p> 
                        }

                        <div className='layoutFlex layout-3' style={{ '--gap-column': '10px' }}>
                            <div className='profile__cover-info layoutFlex-item'>
                                <p>{profile[language].follower}</p>
                                <p>{useNumber(uid ? UserOwner.total_follows : user?.total_follows)}</p>
                            </div>

                            <div className='profile__cover-info layoutFlex-item'>
                                <p>{profile[language].following}</p>
                                <p>{useNumber(uid ? UserOwner.total_followed : user?.total_followed)}</p>
                            </div>

                            <div className='profile__cover-info layoutFlex-item'>
                                <p>{profile[language].balance}</p>
                                <p>{useNumber(0)}</p>
                            </div>
                        </div>
                    </div>

                    {!uid && <div className='profile__cover-ctnBtn'>
                        <button className='buttonSetting'>
                            <FiIcon.FiSettings className='setting-icon' />
                            <span>{profile[language].setting}</span>
                        </button>
                    </div>}
                    {uid && <div className='profile__cover-ctnBtn'>
                        <button
                        onClick={handleFollow}
                        className={`buttonSetting ${IsFollowed ? 'active' : ''}`}>
                            <span>{IsFollowed ? 'Unfollow' : 'Follow'}</span>
                        </button>
                    </div>}
                </div>

                <div className='ctn-tabProfile'>
                    {uid && 
                        <TabPane name='' key='1'>
                            <div className='profile__boxPersonal'>
                                <div className='profile__boxPersonal-title'>Playlist</div>
                                <div className='layoutFlex' style={{ '--gap-row': '20px' }}>
                                    {Videos.map(o => <div key={o._id} 
                                    onClick={() => history.push('/watch?v=' + o.short_id)}
                                    className='layoutFlex-item'>
                                        <div className='profile__video'>
                                            <div className='profile__video-thumbnail'>
                                                <img
                                                onMouseOver={e => {
                                                    var targat = e.target
                                                    targat.setAttribute('src' , `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/preview.webp`)
                                                }} 
                                                onMouseOut={e => {
                                                    var targat = e.target
                                                    targat.setAttribute('src' , `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`)
                                                }} 
                                                src={o.thumbnail ? STORAGE_DOMAIN + o.thumbnail.path : `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`} alt='' />
                                            </div>
                                            <div className='profile__video-info'>
                                                <p className='profile__video-info-title'>
                                                    {o.name}
                                                </p>
                                                <div className='profile__video-info-view'>
                                                    <span className='mr-50'>{o.views} view</span>
                                                    <span>{o.create_date}</span>
                                                </div>
                                                {/* <p className='profile__video-info-tag'>
                                                </p> */}
                                                <p className='profile__video-info-desc'>
                                                    {o.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </TabPane>}
                    {!uid && <Tab classHeader=''>
                        <TabPane name={profile[language].personal} key='1'>
                            <div className='profile__boxPersonal'>
                                <div className='profile__boxPersonal-title'>Playlist</div>
                                <div className='layoutFlex' style={{ '--gap-row': '20px' }}>
                                    {Videos.map(o => <div key={o._id} 
                                    onClick={() => history.push('/watch?v=' + o.short_id)}
                                    className='layoutFlex-item'>
                                        <div className='profile__video'>
                                            <div className='profile__video-thumbnail'>
                                                <img
                                                onMouseOver={e => {
                                                    var targat = e.target
                                                    targat.setAttribute('src' , `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/preview.webp`)
                                                }} 
                                                onMouseOut={e => {
                                                    var targat = e.target
                                                    targat.setAttribute('src' , `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`)
                                                }} 
                                                src={o.thumbnail ? STORAGE_DOMAIN + o.thumbnail.path : `https://vz-3f44931c-ed0.b-cdn.net/${o.guid}/thumbnail.jpg`} alt='' />
                                            </div>
                                            <div className='profile__video-info'>
                                                <p className='profile__video-info-title'>
                                                    {o.name}
                                                </p>
                                                <div className='profile__video-info-view'>
                                                    <span className='mr-50'>{o.views} view</span>
                                                    <span>{o.create_date}</span>
                                                </div>
                                                {/* <p className='profile__video-info-tag'>
                                                </p> */}
                                                <p className='profile__video-info-desc'>
                                                    {o.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>

                            {/* <div className='profile__boxPersonal'>
                                <div className='profile__boxPersonal-title'>
                                    Tra Long's recently streamed Categories
                                </div>
                                <div
                                    className={`layoutFlex ${width > 1330
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
                                            <FaIcon.FaExchangeAlt className='icon' />
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
                                    <TiIcon.TiArrowSortedDown
                                        className={`icon ${isShowHistory ? 'rotate' : ''}`}
                                    />
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
                                    className={`layoutFlex ${width > 1700
                                        ? 'layout-6'
                                        : width > 1520
                                            ? 'layout-8'
                                            : width > 1360
                                                ? 'layout-7'
                                                : width > 1200
                                                    ? 'layout-6'
                                                    : width > 1040
                                                        ? 'layout-5'
                                                        : width > 720
                                                            ? 'layout-4'
                                                            : width > 560
                                                                ? 'layout-3'
                                                                : 'layout-2'
                                        }`}
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
                                            <img
                                                src={item}
                                                alt=''
                                                className='profile__package-img'
                                            />
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

                            <div className='profile__boxManage'>
                                <div className='profile__boxManage-title'>Donate</div>
                                <div style={{ overflowX: 'auto' }}>
                                    {/* <Table dataHead={dataHead1} dataBody={dataBody1} /> */}
                                </div>
                            </div>
                        </TabPane>
                    </Tab>}
                </div>
            </div>

            {/* <div
                className={`profile__right mt-10 ${isShowProfileRight ? 'show' : ''}`}
                style={{ '--profileRight-height': `${profileRightHeight}px` }}
            >
                <div className='profile__title'>
                    <p>{profile[language].topDonate}</p>
                </div>

                <div className='profile__cardCtn'>
                    <Card index={0} numb={100000} avatar={avatar1} name='Trà Long' />
                    <Card index={1} numb={10000} avatar={avatar2} name='Hà Lan' />
                    <Card index={2} numb={5000} avatar={avatar3} name='Thầy Giáo Ba' />
                    <Card index={3} numb={2000} />
                    <Card index={4} numb={1000} />
                    <Card index={5} numb={1000} />
                    <Card index={6} numb={1000} />
                    <Card index={7} numb={1000} />
                    <Card index={8} numb={1000} />
                    <Card index={9} numb={1000} />
                </div>
            </div> */}

            {/* {width <= 1700 && (
                <div
                    className={`profile__showRight ${isShowProfileRight ? 'show' : ''}`}
                    onClick={() => setIsShowProfileRight(!isShowProfileRight)}
                >
                    <MdIcon.MdKeyboardArrowLeft className='icon' />
                </div>
            )} */}
        </div>
    );
};

export default Profile;
