import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
}

export const fetchedFilters = createAsyncThunk (
    'filters/fetchedFilters',
    ()=> {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }   
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetched: (state, actions) => {
            state.filters = actions.payload
        }
    },
    extraReducers: (builder) => [
        builder 
            .addCase(fetchedFilters.fulfilled, (state, actions) => {
                state.filters = actions.payload})
            .addDefaultCase(() => {})
    ]
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {filtersFetched} = actions;