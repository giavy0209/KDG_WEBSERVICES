import io from 'socket.io-client';
import { storage } from './helpers';
import { refreshToken } from './axios';
import { WS_DOMAIN } from './constant';

const token = storage.getToken();
const socket = io(WS_DOMAIN, {
  auth: {
    token: token,
    type: 2,
  },
});
socket.on('connect', async () => {
  console.log('socket connected');
});
socket.on('connect_error', (r) => { console.log(r);});
socket.on('test' , () => {
  console.log(123);
})
socket.on('disconnect', r => {
  console.log(r);
  if (r === 'io server disconnect') {
    setTimeout(async () => {
      await refreshToken();
      const token = await storage.getToken();
      if(token){
        socket.auth.token = token;
        socket.connect();
      }
    }, 1000);
  }
});

export default socket;
