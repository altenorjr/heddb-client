import { combineReducers } from 'redux-immutable';
import { calculate, UPDATE_DIMENSIONS } from './dimensions';

export const TOGGLE_DRAWER_OPENED = '@client/drawer/TOGGLE_DRAWER_OPENED';
export const TOGGLE_DRAWER_DOCKED = '@client/drawer/TOGGLE_DRAWER_DOCKED';

export const toggleDrawerOpened = (willBeOpen) => (dispatch) => dispatch({ type: TOGGLE_DRAWER_OPENED, willBeOpen });

export const toggleDrawerDocked = () => (dispatch) => dispatch({ type: TOGGLE_DRAWER_DOCKED });

const getDefaultValueForCurrentViewport = () => calculate().width >= 1024;

const isOpen = (state = getDefaultValueForCurrentViewport(), { type, willBeOpen }) => {
    switch (type) {
        case TOGGLE_DRAWER_OPENED:
            return willBeOpen;
        case UPDATE_DIMENSIONS:
            return getDefaultValueForCurrentViewport();
        default:
            return state;
    }
}

const isDocked = (state = getDefaultValueForCurrentViewport(), { type }) => {
    switch (type) {
        case TOGGLE_DRAWER_DOCKED:
            return !state;
        case UPDATE_DIMENSIONS:
            return getDefaultValueForCurrentViewport();
        default:
            return state;
    }
}

const drawerReducer = combineReducers({
    isOpen,
    isDocked
});

export default drawerReducer;