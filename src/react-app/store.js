/**
 * Created by trojande on 9/3/17.
 */
import {
    applyMiddleware,
    createStore,
    combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

const createMainStore = (initialState, reducers) => {
  const mainReducers = combineReducers(reducers);
  return createStore(mainReducers, initialState, applyMiddleware(thunk));
};
export default createMainStore;
