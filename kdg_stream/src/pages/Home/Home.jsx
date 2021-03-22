import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../../assets/css/home.css';
import avatar1 from '../../assets/images/home/avatar1.png';
import callAPI from '../../axios';
import { Video } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useWindowSize from '../../hooks/useWindowSize';

const useStyles = makeStyles(theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#e41a7f',
  },
}));

const Home = () => {
  const [{ language, home }] = useLanguageLayerValue();
  const [width, height] = useWindowSize();
  const history = useHistory();

  const [isShowHomeRight, setIsShowHomeRight] = useState(false);
  const [homeRightHeight, setHomeRightHeight] = useState(0);
  const [Videos, setVideos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const isLoadRef = useRef(true);

  useEffect(() => {
    let homeLeft = document.querySelector('.home__left');
    let homeLeftHeight = homeLeft.offsetHeight;
    setHomeRightHeight(homeLeftHeight);
  }, [height]);

  const getRecommend = useCallback(async () => {
    const ids = Videos.map(o => o._id);
    const res = await callAPI.get(`/recommend?ids=${ids}`);

    if (res.data.length === 0) {
      return (isLoadRef.current = false);
    }

    setVideos([...Videos, ...res.data]);
  }, [Videos]);

  const handleScroll = useCallback(async e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && isLoadRef.current) {
      setIsLoading(true);
      await getRecommend();
      e.target.scroll(0, e.target.scrollTop + 100);
      setIsLoading(false);
    }
  },[getRecommend]);

  useMemo(() => {
    callAPI.get('/recommend').then(res => {
      setVideos([...res.data]);
    });
  }, []);

  return (
    <div className='home'>
      <div onScroll={handleScroll} className='home__left mt-10'>
        {/* <div>
                    <div className='home__title'>
                        <p>{home[language].following}</p>
                    </div>
                    <Following />
                </div> */}

        {/* <div>
                    <div className='home__title'>
                        <p>{home[language].watchLive}</p>
                    </div>
                    <Cover />
                </div> */}

        <div>
          <div className='home__title'>
            <p>{home[language].recommend}</p>
          </div>
          <div
            className={`layoutFlex ${
              width > 1280
                ? 'layout-4'
                : width > 860
                ? 'layout-3'
                : width > 500
                ? 'layout-2'
                : 'layout-1'
            }`}
            style={{
              '--gap-column': '20px',
              '--gap-row': '40px',
            }}
          >
            {Videos.map(el => (
              <div key={el._id} className='layoutFlex-item'>
                <Video
                  onClick={() => history.push('/watch?v=' + el.short_id)}
                  avatar={el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path  : undefined}
                  title={el.name}
                  description={el.description}
                  video={el}
                />
              </div>
            ))}
          </div>
          {isLoading && (
            <Box className={classes.loading} p={3}>
              <CircularProgress color='inherit' />
            </Box>
          )}
        </div>
      </div>

      {/* <div
                className={`home__right mt-10 ${isShowHomeRight ? 'show' : ''}`}
                style={{ '--homeRight-height': `${homeRightHeight}px` }}
            >
                <div className='pr-25 pl-25'>
                    <div className='home__title m-0'>
                        <p>{home[language].ranking}</p>
                    </div>
                </div>
                <div className='ctn-tabHome'>
                    <Tab>
                        <TabPane name={home[language].donate} key='1'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => (
                                <Card
                                    key={el}
                                    index={el}
                                    type='donate'
                                    numb={12345}
                                    name='Trà Long'
                                    avatar={avatar1}
                                    onClick={() => history.push('/profile')}
                                />
                            ))}
                        </TabPane>
                        <TabPane name={home[language].follow} key='2'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => (
                                <Card
                                    key={el}
                                    index={el}
                                    type='follow'
                                    numb={12345}
                                    name='Trà Long'
                                    avatar={avatar2}
                                    onClick={() => history.push('/profile')}
                                />
                            ))}
                        </TabPane>
                        <TabPane name={home[language].view} key='3'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => (
                                <Card
                                    key={el}
                                    index={el}
                                    type='view'
                                    numb={12345}
                                    name='Trà Long'
                                    avatar={avatar3}
                                    onClick={() => history.push('/profile')}
                                />
                            ))}
                        </TabPane>
                    </Tab>
                </div>
            </div> */}

      {/* {width <= 1700 && (
                <div
                    className={`home__showRight ${isShowHomeRight ? 'show' : ''}`}
                    onClick={() => setIsShowHomeRight(!isShowHomeRight)}
                >
                    <MdIcon.MdKeyboardArrowLeft className='icon' />
                </div>
            )} */}
    </div>
  );
};

export default Home;
