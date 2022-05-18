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

export default heroes;