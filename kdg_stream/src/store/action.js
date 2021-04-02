import callAPI from '../axios';
import { storage } from '../helpers';

export const CHANGE_UPLOAD_STATUS = 'CHANGE_UPLOAD_STATUS';

export function actChangeUploadStatus(uploadStatus) {
  return {
    type: CHANGE_UPLOAD_STATUS,
    payload: { uploadStatus },
  };
}

export const CHANGE_UNREAD_NOTI = 'CHANGE_UNREAD_NOTI';

export function actChangeUnreadNoti(unreadNoti) {
  return {
    type: CHANGE_UNREAD_NOTI,
    payload: { unreadNoti },
  };
}
