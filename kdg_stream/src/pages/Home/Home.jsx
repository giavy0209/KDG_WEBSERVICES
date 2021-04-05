import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../../assets/css/home.css';
import callAPI from '../../axios';
import { Main } from '../../layout';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';

const Home = () => {
  const isLoadRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const [recommendList, setRecommendList] = useState([]);
  const [streammingsList, setStreammingsList] = useState([]);
  const [Ranking, setRanking] = useState({ follows: [], views: [] });

  useMemo(() => {
    callAPI.get('/recommend').then(res => {
      setRecommendList([...res.data]);
    });

    callAPI.get('/streammings').then(res => {
      setStreammingsList(res.data);
    });

    callAPI.get('/ranking').then(res => {
      setRanking(res.data);
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
    <Main
      className='home'
      left={
        <HomeLeft
          recommendList={recommendList}
          streammingsList={streammingsList}
          isLoading={isLoading}
        />
      }
      right={<HomeRight Ranking={Ranking} />}
    />
  );
};

export default Home;
