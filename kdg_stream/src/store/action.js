// import { Store } from "redux";
import api from '../axios';
import { GET_USER, CLEAR_USER, GET_DONATE_PACKAGE } from './actionType';

export const actionGetUser = () => async dispatch => {
    try {
        const response = await api.get('/user/me');
        dispatch({ type: GET_USER, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_USER,
            payload: {},
            // payload: { _id: 'asdf', first_name: 'Trà', last_name: 'Long' },
        });
    }
};

export const actionClearUser = () => async dispatch => {
    dispatch({ type: CLEAR_USER });
};

export const actionGetDonatePackage = () => async dispatch => {
    try {
        const response = await api.get('/donate_package');
        dispatch({ type: GET_DONATE_PACKAGE, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};
