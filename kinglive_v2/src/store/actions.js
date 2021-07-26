import callAPI from '../axios'

export const CHANGE_USER = 'CHANGE_USER'
export function asyncChangeUser() {
  return async (dispatch) => {
    try {
      const res = await callAPI.get('/user')

      if (res.status === 1) {
        dispatch({ type: CHANGE_USER, payload: res.data })
      }

      if (res.status === 401) {
        console.log('get user failed cuz unauthorized')
      }
    } catch (error) {
      console.log('error get user')
      console.log(error)
    }
  }
}

export const CHANGE_ADDRESS = 'CHANGE_ADDRESS'
export function actChangeAddress(address) {
  return { type: CHANGE_ADDRESS, payload: address }
}
