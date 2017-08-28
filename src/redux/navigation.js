import { combineReducers } from 'redux-immutable'
import { calculate, UPDATE_DIMENSIONS } from './dimensions';

export const SET_CURRENT_PATH = '@client/navigation/SET_CURRENT_PATH';
export const TOGGLE_DRAWER_OPENED = '@client/navigation/TOGGLE_DRAWER_OPENED';
export const TOGGLE_DRAWER_DOCKED = '@client/navigation/TOGGLE_DRAWER_DOCKED';

export const setCurrentPath = () => (dispatch) => dispatch({ type: SET_CURRENT_PATH });

const getDefaultValue = () => calculate().width >= 1024;

const isOpen = (state = getDefaultValue(), { type }) => {
    switch (type) {
        case TOGGLE_DRAWER_OPENED:
            return !state;
        case UPDATE_DIMENSIONS:
            return getDefaultValue();
        default:
            return state;
    }
}

const isDocked = (state = getDefaultValue(), { type }) => {
    switch (type) {
        case TOGGLE_DRAWER_DOCKED:
            return !state;
        case UPDATE_DIMENSIONS:
            return getDefaultValue();
        default:
            return state;
    }
}

const drawerReducer = combineReducers({
    isOpen,
    isDocked
});

export default drawerReducer;