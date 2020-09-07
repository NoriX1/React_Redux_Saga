import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredantials = true;
axios.defaults.baseURL = 'http://rem-rest-api.herokuapp.com/api';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);

//npm i --save reactstrap bootstrap redux-saga
//5. Creating and deleting users sagas