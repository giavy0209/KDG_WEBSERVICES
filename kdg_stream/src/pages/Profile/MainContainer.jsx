import { Tab, TabPane } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import Asset from './Asset';
import Personal from './Personal';
import TopDonate from './TopDonate';

export default function MainContainer({ uid, user, UserOwner }) {
  const [{ language, profile }] = useLanguageLayerValue();

  return (
    <div className='container'>
      {uid === user?._id && (
        <Tab>
          <TabPane name={profile[language].personal} key='1'>
            <Personal UserOwner={UserOwner} />
          </TabPane>

          <TabPane name={profile[language].manage} key='2'>
            <Asset />
          </TabPane>

          <TabPane name={profile[language].topDonate} key='3'>
            <TopDonate />
          </TabPane>
        </Tab>
      )}

      {uid !== user?._id && <Personal UserOwner={UserOwner} />}
    </div>
  );
}
