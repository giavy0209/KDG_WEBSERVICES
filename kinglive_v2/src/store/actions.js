import callAPI from '../axios'

export const INIT_USER = 'INIT_USER'
export function asyncInitUser() {
  return async dispatch => {
    const res = await callAPI.get('/user')
    dispatch({ type: INIT_USER, payload: res.data })
  }
}

export const CHANGE_ADDRESS = 'CHANGE_ADDRESS'
export function actChangeAddress(address) {
  return { type: CHANGE_ADDRESS, payload: address }
}
