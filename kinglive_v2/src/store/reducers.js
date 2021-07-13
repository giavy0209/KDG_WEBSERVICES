import { INIT_USER, CHANGE_ADDRESS } from './actions'

const initialState = {}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case INIT_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }

    case CHANGE_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
