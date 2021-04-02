import { useCallback, useMemo, useState } from 'react';
import '../../assets/css/profile.css';
import callAPI from '../../axios';
import { Tab, TabPane } from '../../components';
import ListImages from './ListImages';

export default function ModalBody() {
  const [Avatars, setAvatars] = useState([]);

  const getAvatar = useCallback(async () => {
    const res = await callAPI.get('/avatar');
    setAvatars(res.data);
  }, []);

  useMemo(() => {
    getAvatar();
  }, [getAvatar]);

  return (
    <Tab>
      <TabPane name='Chọn hình'>
        <ListImages />
      </TabPane>
      <TabPane name='Tải hình lên'></TabPane>
    </Tab>
  );
}
