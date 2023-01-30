import { SET_USER_NAME } from '../constants';
const initialState = {
    name: "John Mike"
};
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                count: action.payload
            };
        default:
            return state;
    }
}
export default countReducer;
