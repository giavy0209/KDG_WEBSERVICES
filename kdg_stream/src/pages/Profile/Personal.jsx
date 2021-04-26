import { CircularProgress } from '@material-ui/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as BiIcon from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import callAPI from '../../axios';
import { BREAK_POINT_MEDIUM, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertDate, convertDateAgo } from '../../helpers';
import useWindowSize from '../../hooks/useWindowSize';

export default function Personal() {
  const uid = new URLSearchParams(useLocation().search).get('uid');
  const user = useSelector(state => state.user);

  const history = useHistory();
  const [{ language, profile }] = useLanguageLayerValue();
  const [width] = useWindowSize();

  const [Videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ShowEdit, setShowEdit] = useState(null);

  const isLoadRef = useRef(true);
  const isLoadingAPI = useRef(false);

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
    const closeAll = () => {
      document.querySelectorAll('.profile__video-more').forEach(el => el.classList.remove('show'));
    };
    window.addEventListener('click', closeAll);
    return () => {
      window.removeEventListener('click', closeAll);
    };
  }, []);

  useEffect(() => {
    const handleLoad = async () => {
      const totalHeight = document.getElementById('root').clientHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;
      const restHeight = totalHeight - scrolledHeight;
      const isEnd = restHeight <= 500;

      if (isEnd && isLoadRef.current && !isLoadingAPI.current) {
        isLoadingAPI.current = true;
        setIsLoading(true);
        await getVideo();
        setIsLoading(false);
        isLoadingAPI.current = false;
        console.log('call1');
      }
    };

    if (uid && !isLoadingAPI.current && isLoadFirst.current) {
      isLoadFirst.current = false;
      getVideo();
    }

    window.addEventListener('scroll', handleLoad);

    return () => {
      window.removeEventListener('scroll', handleLoad);
    };
  }, [getVideo, uid]);

  const handleDeleteVideo = useCallback(
    async e => {
      const id = e.target.getAttribute('data-id');
      const c = window.confirm('Xác nhận xóa video này');
      if (c) {
        await callAPI.delete(`/video?id=${id}`);
        toast('Đã xóa video');
        const index = Videos.findIndex(o => o._id === id);
        Videos.splice(index, 1);
        setVideos([...Videos]);
      }
    },
    [Videos]
  );

  const handleEdit = useCallback(
    async e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const submitData = {};
      for (const iterator of data.entries()) {
        submitData[iterator[0]] = iterator[1];
      }
      const res = await callAPI.put(`/video?id=${ShowEdit._id}`, submitData);
      toast('Chỉnh sửa thành công');

      const videoIndex = Videos.findIndex(o => o._id === ShowEdit._id);
      Videos[videoIndex] = res.data;
      setVideos([...Videos]);
      ShowEdit(null);
    },
    [ShowEdit, Videos]
  );

  const handleSetIntroduce = useCallback(async(id) => {
    await callAPI.post('/set_introduce' , {video : id})
  },[])
  return (
    <>
      {ShowEdit && (
        <div className='popupBox' onClick={e => e.stopPropagation()}>
          <div className='mask' onClick={() => setShowEdit(null)}></div>

          <form className='content' onSubmit={handleEdit}>
            <div className='label'>{profile[language].title}</div>
            <input type='text' name='name' defaultValue={ShowEdit?.name} />

            <div className='label'>{profile[language].desc}</div>
            <textarea name='description' defaultValue={ShowEdit?.description}></textarea>

            <div className='label'>{profile[language].tags}</div>
            <input type='text' name='tags' defaultValue={ShowEdit?.tags} />

            <button style={{ width: '100%' }} className='button'>
              {profile[language].edit}
            </button>
          </form>
        </div>
      )}

      {Videos.length > 0 && (
        <div className='profile__boxPersonal'>
          <div className='profile__boxPersonal-title'>{profile[language].playlist}</div>

          <div
            className={`layoutFlex pl-10 pr-10 ${
              width > BREAK_POINT_MEDIUM ? 'layout-2' : 'layout-1'
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
                  {uid === user?._id && (
                    <span
                      className='profile__video-more'
                      onClick={e => {
                        e.stopPropagation();
                        if (Array.from(e.target.classList).includes('show')) {
                          e.target.classList.remove('show');
                        } else {
                          e.target.classList.add('show');
                        }
                      }}
                    >
                      <BiIcon.BiDotsVerticalRounded className='menu-icon' />
                      <div className='menu'>
                        <div onClick={() => handleSetIntroduce(o._id)} className='menu-item'>
                          <BiIcon.BiEditAlt className='icon' />
                          Đặt làm video giới thiệu
                        </div>
                        <div onClick={() => setShowEdit(o)} className='menu-item'>
                          <BiIcon.BiEditAlt className='icon' />
                          Sửa
                        </div>
                        <div data-id={o._id} onClick={handleDeleteVideo} className='menu-item'>
                          <BiIcon.BiEditAlt className='icon' />
                          Xóa
                        </div>
                      </div>
                    </span>
                  )}
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
                      <span>
                        {o.views} {profile[language].views}
                      </span>
                      <span> • </span>
                      <span
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
                      </span>
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

      {/* <div className='profile__boxPersonal'>
        <div className='profile__boxPersonal-title'>Tra Long's recently streamed Categories</div>
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
  );
}
