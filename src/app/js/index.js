import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Customrouter from "./router.jsx";
import reducer from './reducers/app';
import appSaga from './sagas/app';
import "../styles/app.scss";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(appSaga);

ReactDOM.render(<Provider store={store}><Customrouter /></Provider>, document.getElementById("app"));