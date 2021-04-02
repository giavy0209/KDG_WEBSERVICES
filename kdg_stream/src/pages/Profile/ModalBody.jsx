import * as GoIcon from 'react-icons/go';
import { useSelector } from 'react-redux';
import '../../assets/css/profile.css';

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
