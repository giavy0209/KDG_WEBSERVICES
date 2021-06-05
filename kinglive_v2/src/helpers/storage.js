const keyJwt = 'jwt'
const keyRefresh = 'refresh'

const storage = {
  getToken() {
    return localStorage.getItem(keyJwt)
  },

  setToken(jwtToken) {
    localStorage.setItem(keyJwt, jwtToken)
  },

  clearToken() {
    localStorage.clear(keyJwt)
  },

  getRefresh() {
    return localStorage.getItem(keyRefresh)
  },

  setRefresh(refreshToken) {
    localStorage.setItem(keyRefresh, refreshToken)
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
