import callAPI from '../axios'

export const INIT_USER = 'INIT_USER'
export function asyncInitUser() {
  return async dispatch => {
    const res = await callAPI.get('/user')
    dispatch({ type: INIT_USER, payload: res.data })
  }
}
