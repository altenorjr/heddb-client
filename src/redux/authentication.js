import Parse from 'parse';
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

export const LOGIN_START = '@client/authentication/LOGIN_START';
export const LOGIN_SUCCESS = '@client/authentication/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@client/authentication/LOGIN_FAILURE';
export const RESET = '@client/authentication/RESET_ERROR_MESSAGE';
export const LOGOUT = '@client/authentication/LOGOUT';


export const login = ({ username, password }) => (dispatch) => {
    dispatch({ type: LOGIN_START });

    Parse.User.logIn(username, password)
        .then((user) => {
            dispatch({ type: LOGIN_SUCCESS, ...user.toJSON() });
        })
        .catch((error) => {
            dispatch({ type: LOGIN_FAILURE, error });

            setTimeout(() => dispatch({ type: RESET }), 5000)
        })
};


export const logout = () => (dispatch) => Parse.User.logOut().then(() => dispatch({ type: LOGOUT }));

const error = (state = null, { type, error }) => {
    switch (type) {
        case LOGIN_FAILURE:
            return error;
        default:
            return null;
    }
}

const user = (state = Parse.User.current(), { type, ...userData }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return new Map(userData);
        case LOGOUT:
            return null;
        default:
            return state;
    }
};

const authenticating = (state = false, { type }) => {
    switch (type) {
        case LOGIN_START:
            return true;
        case LOGIN_SUCCESS:
        case LOGIN_FAILURE:
        case LOGOUT:
            return false;
        default:
            return state;
    }
}

const authenticated = (state = !!Parse.User.current(), { type }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return true;
        case LOGOUT:
            return false;
        default:
            return state;
    }
};

const authenticationReducer = combineReducers({
    user,
    authenticated,
    authenticating,
    error
});

export default authenticationReducer;