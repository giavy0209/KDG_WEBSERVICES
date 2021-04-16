import { useEffect, useState } from 'react';
import { Popper1, Tab, TabPane } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import Asset from './Asset';
import Personal from './Personal';

export default function MainContainer({ uid, user }) {
  const [{ language, profile }] = useLanguageLayerValue();

  // const [isShow, setIsShow] = useState(false);
  // const [type, setType] = useState('changes');
  // const [pack, setPack] = useState(null);

  return (
    <div className='container'>
      {/* {isShow && <Popper1 type={type} pack={pack} />} */}

      {uid === user?._id && (
        <Tab>
          <TabPane name={profile[language].personal} key='1'>
            <Personal />
          </TabPane>

          <TabPane name={profile[language].manage} key='2'>
            <Asset />
          </TabPane>
        </Tab>
      )}
    </div>
  );
}
