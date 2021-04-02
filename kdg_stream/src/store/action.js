import callAPI from '../axios';
import { storage } from '../helpers';

export const CHANGE_UPLOAD_STATUS = 'CHANGE_UPLOAD_STATUS';

export function actChangeUploadStatus(uploadStatus) {
  return {
    type: CHANGE_UPLOAD_STATUS,
    payload: { uploadStatus },
  };
}