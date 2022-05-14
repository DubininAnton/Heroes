 import { createReducer } from "@reduxjs/toolkit";
 import {
    heroesFetching,
    heroesFetched,
    newheroesFetched,
    heroesFetchingError,
    changedHero
 } from '../actions';


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activeChangedHero: "all",
    filteredHeroes:[]
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) =>{
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(newheroesFetched, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(changedHero, (state, action) => {
            state.activeChangedHero = action.payload;
        })
        .addDefaultCase(()=>{})
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 filteredHeroes: state.activeChangedHero === "all" ?
//                         action.payload :
//                         action.payload.filter(item => item.element === state.activeChangedHero),
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'ADD_NEW_HERO':
//             let newCreatedHeroList = [...state.heroes, action.payload];
//             return {
//                 ...state,
//                 heroes: newCreatedHeroList,
//                 filteredHeroes: state.activeChangedHero === "all" ?
//                                 newCreatedHeroList : 
//                                 newCreatedHeroList.filter(item => item.element === state.activeChangedHero),
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'CHANGED_HERO':
//             return {
//                 ...state,
//                 activeChangedHero: action.payload,
//                 filteredHeroes: action.payload === "all" ?
//                         state.heroes :
//                         state.heroes.filter(item => item.element === action.payload)
//             }
//         default: return state
//     }
// }

export default heroes;