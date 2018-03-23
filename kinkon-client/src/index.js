import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import setAuthToken from "./utils/setAuthToken";

setAuthToken(localStorage.jwtToken);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
