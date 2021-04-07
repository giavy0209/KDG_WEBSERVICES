import { CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Video } from '..';
import '../../assets/css/recommend.css';
import callAPI from '../../axios';
import { BREAK_POINT_MEDIUM, STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useWindowSize from '../../hooks/useWindowSize';

const Recommend = () => {
  const history = useHistory();

  const [width] = useWindowSize();
  const [{ recommend, language }] = useLanguageLayerValue();

  const isLoadRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const [recommendList, setRecommendList] = useState([]);
  const [streammingsList, setStreammingsList] = useState([]);

  const [showStream, setShowStream] = useState(true);
  const [showRecommend, setShowRecommend] = useState(true);

  useMemo(() => {
    callAPI.get('/recommend').then(res => {
      setRecommendList([...res.data]);
    });

    callAPI.get('/streammings').then(res => {
      setStreammingsList(res.data);
    });
  }, []);

  const getRecommend = useCallback(async () => {
    const ids = recommendList.map(o => o._id);
    const res = await callAPI.get(`/recommend?ids=${ids}`);

    if (res.data.length === 0) {
      return (isLoadRef.current = false);
    }

    setRecommendList([...recommendList, ...res.data]);
  }, [recommendList]);

  useEffect(() => {
    const handleLoad = async () => {
      const totalHeight = document.getElementById('root').clientHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;
      const restHeight = totalHeight - scrolledHeight;
      const isEnd = restHeight <= 500;

      if (isEnd && isLoadRef.current) {
        setIsLoading(true);
        await getRecommend();
        setIsLoading(false);
      }
    };

    window.addEventListener('scroll', handleLoad);

    return () => {
      window.removeEventListener('scroll', handleLoad);
    };
  }, [getRecommend]);

  return (
    <>
      {streammingsList.length > 0 && (
        <div className='recommend__titleList' onClick={() => setShowStream(x => !x)}>
          <span>{recommend[language].watchlive}</span>
          <MdIcon.MdArrowDropDown className={showStream ? 'down' : 'up'} />
        </div>
      )}

      {showStream && (
        <div
          className={`layoutFlex ${
            width > BREAK_POINT_MEDIUM
              ? 'layout-1'
              : width > 1187
              ? 'layout-4'
              : width > 897
              ? 'layout-3'
              : width > 577
              ? 'layout-2'
              : 'layout-1'
          }`}
          style={{ '--gap-row': '40px', '--gap-column': '40px' }}
        >
          {streammingsList.map(el => (
            <div key={el._id} className='layoutFlex-item'>
              <Video
                video={el}
                type='stream'
                title={el.name}
                description={el.description}
                avataPos={el.user?.kyc.avatar_pos}
                onClick={() => {
                  history.push('/live?s=' + el._id);
                  window.scrollTo(0, 0);
                }}
                avatar={
                  el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path : undefined
                }
              />
            </div>
          ))}
        </div>
      )}

      {recommendList.length > 0 && (
        <div className='recommend__titleList' onClick={() => setShowRecommend(x => !x)}>
          <span>{recommend[language].recommend}</span>
          <MdIcon.MdArrowDropDown className={showRecommend ? 'down' : 'up'} />
        </div>
      )}

      {showRecommend && (
        <div
          className={`layoutFlex ${
            width > BREAK_POINT_MEDIUM
              ? 'layout-1'
              : width > 1187
              ? 'layout-4'
              : width > 897
              ? 'layout-3'
              : width > 577
              ? 'layout-2'
              : 'layout-1'
          }`}
          style={{ '--gap-row': '40px', '--gap-column': '40px' }}
        >
          {recommendList.map(el => (
            <div key={el._id} className='layoutFlex-item'>
              <Video
                video={el}
                type='video'
                title={el.name}
                description={el.description}
                avataPos={el.user?.kyc.avatar_pos}
                onClick={() => {
                  history.push('/watch?v=' + el.short_id);
                  window.scrollTo(0, 0);
                }}
                avatar={
                  el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path : undefined
                }
              />
            </div>
          ))}
        </div>
      )}

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
    </>
  );
};

export default Recommend;