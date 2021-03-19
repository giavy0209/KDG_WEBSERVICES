import { GET_USER, CLEAR_USER, GET_DONATE_PACKAGE } from './actionType';

const initialState = {};

const reducers = (state = initialState, action) => ({ ...state, ...action.payload });

export default reducers;
