import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

// import { createStore } from "redux";
// import rootReducer from "./redux/index";
// import { composeWithDevTools } from "redux-devtools-extension";
import store from './redux/index';

// const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
