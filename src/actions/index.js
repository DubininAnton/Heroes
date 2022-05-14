import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED');

// export const newheroesFetched = (heroes) => {
//     return {
//         type: 'ADD_NEW_HERO',
//         payload: heroes
//     }
// }

export const newheroesFetched = createAction('ADD_NEW_HERO');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

// export const changedHero = (responceHero) => {
//     return {
//         type: 'CHANGED_HERO',
//         payload: responceHero
//     }
// }

export const changedHero =createAction('CHANGED_HERO');