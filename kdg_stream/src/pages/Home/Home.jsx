import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../../assets/css/home.css';
import callAPI from '../../axios';
import { Main } from '../../layout';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';

const Home = () => {
  const [Videos, setVideos] = useState([]);
  const [Streammings, setStreammings] = useState([]);
  const [Ranking, setRanking] = useState({ follows: [], views: [] });

  const isLoadRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    callAPI.get('/recommend').then(res => {
      setVideos([...res.data]);
    });
    callAPI.get('/ranking').then(res => {
      setRanking(res.data);
    });
    callAPI.get('/streammings').then(res => {
      setStreammings(res.data);
    });
  }, []);

  const getRecommend = useCallback(async () => {
    const ids = Videos.map(o => o._id);
    const res = await callAPI.get(`/recommend?ids=${ids}`);

    if (res.data.length === 0) {
      return (isLoadRef.current = false);
    }

    setVideos([...Videos, ...res.data]);
  }, [Videos]);

  useEffect(() => {
    const handleLoad = async () => {
      const totalHeight = document.getElementById('root').clientHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;
      const restHeight = totalHeight - scrolledHeight;
      const isEnd = restHeight <= 200;

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
    <Main
      className='home'
      left={<HomeLeft Streammings={Streammings} Videos={Videos} isLoading={isLoading} />}
      right={<HomeRight Ranking={Ranking} />}
    />
  );
};

export default Home;
