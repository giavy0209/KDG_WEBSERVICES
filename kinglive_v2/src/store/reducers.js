import { INIT_USER } from './actions'

const initialState = {}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case INIT_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
