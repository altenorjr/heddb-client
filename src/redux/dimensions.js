import { Map } from 'immutable';

export const UPDATE_DIMENSIONS = '@client/dimensions/UPDATE_DIMENSIONS';

export const updateDimensions = (dimensions) => (dispatch) => dispatch({ type: UPDATE_DIMENSIONS, dimensions });

const dimensionsReducer = (state = new Map(calculate()), { type, dimensions }) => {
    switch (type) {
        case UPDATE_DIMENSIONS:
            return state.merge(dimensions);
        default:
            return state;
    }
}

export default dimensionsReducer;

export const calculate = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    mode: window.innerWidth < 768 ? 0 :
        window.innerWidth < 1024 ? 1 :
            window.innerWidth < 1824 ? 2 : 3,
    portrait: window.innerWidth < window.innerHeight
});
