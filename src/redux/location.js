export const UPDATE_LOCATION = '@client/location/UPDATE_LOCATION';

export const updateLocation = (location) => ({ type: UPDATE_LOCATION, location })

const locationReducer = (state = null, { type, location }) => {
    switch (type) {
        case UPDATE_LOCATION:
            return { ...location };
        default:
            return state;
    }
};

export default locationReducer;