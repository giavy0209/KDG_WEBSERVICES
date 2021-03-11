import { GET_USER, CLEAR_USER, GET_DONATE_PACKAGE } from './actionType';

const initialState = {};

const reducers = function (state = initialState, action) {
    console.log(action);

    switch (action.type) {
        case GET_USER:
            return { user: action.payload };
        case CLEAR_USER:
            return {};
        case GET_DONATE_PACKAGE:
            return {};
        default:
            return state;
    }
};

export default reducers;
