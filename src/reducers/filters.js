const initialState = {
    filters: [],
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
            }
        default: return state
    }
}

export default filters;