// Первй вариант создания стора с одним файлом reducer

// import { createStore } from 'redux';
// import reducer from '../reducers';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export default store;

// Второй вариант создания стора из двух файлов reducer (heroes, filters)

// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import heroes from '../reducers/heroes'; 
import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters';
// import ReduxFunk from "redux-thunk";

// const store = createStore( combineReducers ({heroes, filters}), 
//                             compose(applyMiddleware(ReduxFunk),
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


//  Третий вариант создания storeри помощи ToolKit. В тглкит уже вкдючены миддлвэар в том числе и ReduxFunk 
//  и достаются они командой getDefaultMiddleware.
const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    
})


export default store;
