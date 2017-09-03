import React from 'react';
import { renderToString } from 'react-dom/server';
import jss from 'jss';
import preset from 'jss-preset-default';
import reducers from '../react-app/reducers';
import createMainStore from '../react-app/store';
import { SheetsRegistryProvider, SheetsRegistry } from 'react-jss';
import { Provider } from 'react-redux';
import {
    Router,
    Route,
    IndexRoute,
    createMemoryHistory,
} from 'react-router';
import Root from '../react-app/components/Root';
import Home from '../react-app/components/Home';
import { checkLoginData } from '../react-app/actions';
import Authorization from '../react-app/components/Authorization';

export default function ({ buildID, Root, req, res }) {
  const isNotFoundError = false;
  let isSSRError = false;

  // Setup initial state params
  const initialState = {
    isSSR: true,
  };
  const store = createMainStore(initialState, reducers);

  // Render react app
  let rootHTML = '';
  let criticalCSS = '';
  try {
    const sheets = new SheetsRegistry();
    rootHTML = renderToString(
      <SheetsRegistryProvider registry={sheets}>
        <Provider store={store}>
        <Router history={createMemoryHistory()}>
          <Route path="/" component={Root} >
            <IndexRoute component={Home} />
            <Route path="/login" component={Authorization} />
          </Route>
        </Router>
        </Provider>
      </SheetsRegistryProvider>,
    );
    criticalCSS = sheets.toString();
  } catch (error) {
    console.error(error);
    isSSRError = true;
  }

  // Calculate bundle script
  const bundle1 =
    (buildID !== undefined) ?
      `default-${buildID}.js` :
      'default.js';

  const renderParams = {
    rootCSSClasses: '',
    language: 'en-US',
    criticalCSS,
    rootHTML,
    bundle1,
  };

  if (isNotFoundError) {
    res.status(404);
  } else if (isSSRError) {
    res.status(500);
  } else {
    res.render('react-app', renderParams);
  }
}
