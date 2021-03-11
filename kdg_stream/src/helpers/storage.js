const keyToken = 'jwt';
const keyRefresh = 'refresh';

const storage = {
  setToken(token) {
    localStorage.setItem(keyToken, JSON.stringify(token));
  },
  getToken() {
    return JSON.parse(localStorage.getItem(keyToken));
  },

  setRefresh(token) {
    localStorage.setItem(keyRefresh, JSON.stringify(token));
  },
  getRefresh() {
    return JSON.parse(localStorage.getItem(keyRefresh));
  },

  setItem(key, item) {
    localStorage.setItem(key, JSON.parse(item));
  },
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  },

	clear() {
		localStorage.clear();
	}
};

export default storage;
