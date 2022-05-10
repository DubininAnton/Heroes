// Первй вариант создания стора с одним файлом reducer

// import { createStore } from 'redux';
// import reducer from '../reducers';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export default store;

// Второй вариант создания стора из двух файлов reducer (heroes, filters)

import { createStore, combineReducers } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const store = createStore( combineReducers ({heroes, filters}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
