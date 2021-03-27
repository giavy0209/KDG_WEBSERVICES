import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Tab, TabPane } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';

const HomeRight = props => {
  const { Ranking } = props;

  const history = useHistory();

  const [{ language, home }] = useLanguageLayerValue();

  return (
    <>
      <div className='main__title mb-0 ml-25 mr-25'>
        <p>{home[language].ranking}</p>
      </div>

      <div className='tab-home'>
        <Tab>
          {/* <TabPane name={home[language].donate} key='1'>
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
          </TabPane> */}

          <TabPane name={home[language].follow} key='2'>
            {Ranking?.follows?.map((o, index) => (
              <Card
                key={o._id}
                index={index}
                type='follow'
                numb={o.total}
                name={o.kyc ? `${o.kyc.first_name} ${o.kyc.last_name}` : ''}
                avatar={
                  o.kyc.avatar?.path ? STORAGE_DOMAIN + o.kyc.avatar?.path : undefined
                }
                onClick={() => history.push('/profile?uid=' + o._id)}
              />
            ))}
          </TabPane>

          <TabPane name={home[language].view} key='3'>
            {Ranking?.views?.map((o, index) => (
              <Card
                key={o._id}
                index={index}
                type='view'
                numb={o.total}
                name={o.kyc ? `${o.kyc.first_name} ${o.kyc.last_name}` : ''}
                avatar={
                  o.kyc.avatar?.path ? STORAGE_DOMAIN + o.kyc.avatar?.path : undefined
                }
                onClick={() => history.push('/profile?uid=' + o._id)}
              />
            ))}
          </TabPane>
        </Tab>
      </div>
    </>
  );
};

HomeRight.propTypes = {
  Ranking: PropTypes.object.isRequired,
};

export default HomeRight;
