import React, { useEffect, useState } from 'react';
import '../../assets/css/home.css';

import { TabPane, Tab, Card, Following, Cover, Video } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { useHistory } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import * as MdIcon from 'react-icons/md';

import avatar1 from '../../assets/images/home/avatar1.png';
import avatar2 from '../../assets/images/home/avatar2.png';
import avatar3 from '../../assets/images/home/avatar3.png';
import video1 from '../../assets/images/home/video1.png';

const Home = () => {
  const [{ language, home }] = useLanguageLayerValue();
  const [width, height] = useWindowSize();
  const history = useHistory();

  const [isShowHomeRight, setIsShowHomeRight] = useState(false);
  const [homeRightHeight, setHomeRightHeight] = useState(0);

  useEffect(() => {
    let homeLeft = document.querySelector('.home__left');
    let homeLeftHeight = homeLeft.offsetHeight;
    setHomeRightHeight(homeLeftHeight);
  }, [height]);

  return (
    <div className='home'>
      <div className='home__left mt-10'>
        <div>
          <div className='home__title'>
            <p>{home[language].following}</p>
          </div>
          <Following />
        </div>

        <div>
          <div className='home__title'>
            <p>{home[language].watchLive}</p>
          </div>
          <Cover />
        </div>

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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(el => (
              <div key={el} className='layoutFlex-item'>
                <Video
                  onClick={() => history.push('/live')}
                  thumbnail={video1}
                  avatar={avatar1}
                  title='Neumorphism To Glassmorphism | Javascript Working Analog Clock UI Design'
                  description='Web'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
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
      </div>

      {width <= 1700 && (
        <div
          className={`home__showRight ${isShowHomeRight ? 'show' : ''}`}
          onClick={() => setIsShowHomeRight(!isShowHomeRight)}
        >
          <MdIcon.MdKeyboardArrowLeft className='icon' />
        </div>
      )}
    </div>
  );
};

export default Home;
