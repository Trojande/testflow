import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';
import createMainStore from './store';
import { getCookie } from './helpers';
import reducers from './reducers';
import Root from './components/Root';
import Home from './components/Home';
import { checkLoginData } from './actions';
import Authorization from './components/Authorization';
const root = document.getElementById('root');
const initialState = window.__INITIAL_STATE__ || {};
const store = createMainStore(initialState, reducers);

const checkAuthorize = dispatch => (nextState, replace, callback) => {
  const token: ?string = getCookie('token');
  dispatch(checkLoginData(token))
    .then((action: {}) => {
      if (action.status !== 'OK') {
        replace('/login');
      }
      callback();
    });
};
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} >
        <IndexRoute component={Home} onEnter={checkAuthorize(store.dispatch)}/>
        <Route path="/login" component={Authorization} />
      </Route>
    </Router>
  </Provider>,
    root,
);
