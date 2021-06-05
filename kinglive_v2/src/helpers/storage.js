const keyJwt = 'jwt'
const keyRefresh = 'refresh'

const storage = {
  getToken() {
    return JSON.parse(localStorage.getItem(keyJwt))
  },

  setToken(jwtToken) {
    localStorage.setItem(keyJwt, JSON.stringify(jwtToken))
  },

  clearToken() {
    localStorage.clear(keyJwt)
  },

  getRefresh() {
    return JSON.parse(localStorage.getItem(keyRefresh))
  },

  setRefresh(refreshToken) {
    localStorage.setItem(keyRefresh, JSON.stringify(refreshToken))
  },

  clearRefresh() {
    localStorage.clear(keyRefresh)
  },

  getItem(key) {
    return JSON.parse(localStorage.getItem(key))
  },

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

export default storage
