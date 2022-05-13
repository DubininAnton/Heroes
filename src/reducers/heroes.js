const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activeChangedHero: "all",
    filteredHeroes:[]
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeChangedHero === "all" ?
                        action.payload :
                        action.payload.filter(item => item.element === state.activeChangedHero),
                heroesLoadingStatus: 'idle'
            }
        case 'ADD_NEW_HERO':
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList,
                filteredHeroes: state.activeChangedHero === "all" ?
                                newCreatedHeroList : 
                                newCreatedHeroList.filter(item => item.element === state.activeChangedHero),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'CHANGED_HERO':
            return {
                ...state,
                activeChangedHero: action.payload,
                filteredHeroes: action.payload === "all" ?
                        state.heroes :
                        state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default heroes;