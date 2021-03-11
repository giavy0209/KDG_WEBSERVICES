import axios from 'axios';
import { BASE_URL } from './const';
import { storage } from './helpers';

function create() {
  const jwt = storage.getToken();
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  });
}

const refreshToken = async (method, url, body) => {
  const refreshToken = storage.getRefresh();
  if (!refreshToken) return window.open('/', '_self');

  const res = await api.post('/refresh', { refresh_token: refreshToken });
  if (res.status === 1) {
    storage.setRefresh(res.refreshToken);
    storage.setToken(res.jwt);
    await api[method](url, body);
  } else {
    return window.open('/', '_self');
  }
};

const api = {
  get: async url => {
    var res = (await create().get(url)).data;
    if (res.status === 401) {
      return await refreshToken('get', url);
    }
    return res;
  },

  post: async (url, body) => {
    var res = (await create().post(url, body)).data;
    if (res.status === 401) {
      return await refreshToken('get', url);
    }
    return res;
  },

  put: async (url, body) => {
    var res = (await create().put(url, body)).data;

    if (res.status === 401) {
      return await refreshToken('get', url);
    }

    return res;
  },
};

export default api;
