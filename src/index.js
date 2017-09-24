import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';

import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));;

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    target
)
console.log();