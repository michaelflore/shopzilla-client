import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './reducers/cartReducer';

import App from "./App";
import ScrollToTop from './ScrollToTop';

import './styles/styles.scss';

const store = createStore(cartReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root")
);