import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../reducers/countReducer';
// const rootReducer = combineReducers(
//     { count: countReducer }
// );
const rootReducer = combineReducers(
    { countReducer }
);

// const configureStore = () => {
//     return createStore(rootReducer);
// }
// export default configureStore;

export const Store = createStore(rootReducer, applyMiddleware(thunk));