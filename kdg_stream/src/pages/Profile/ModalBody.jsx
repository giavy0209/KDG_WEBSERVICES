import * as GoIcon from 'react-icons/go';
import { useSelector } from 'react-redux';
import '../../assets/css/profile.css';
import { Tab, TabPane } from '../../components';
import ListImages from './ListImages';
export default function ModalBody() {
  const uploadStatus = useSelector(state => state.uploadStatus);

  return (
    <Tab>
      <TabPane name='Chọn hình'>
        <ListImages />
      </TabPane>
      <TabPane name='Tải hình lên'>
        <label htmlFor={uploadStatus?.label} className='upload-avatar'>
          <GoIcon.GoCloudUpload className='icon' />
        </label>
      </TabPane>
    </Tab>
  );
}
