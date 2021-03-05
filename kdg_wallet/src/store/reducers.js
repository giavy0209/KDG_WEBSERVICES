const initialState = {};

const reducers = (state = initialState, action) => ({ ...state, ...action.payload });

export default reducers;
