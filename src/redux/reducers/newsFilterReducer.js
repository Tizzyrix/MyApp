import {FILTER} from '../types'


const initialState = {
    endpoint: 'top-headlines',
    category: 'technology',
    sortBy: 'publishedAt',
    from: '2021-07-10',
    domains: ['eg bbc.co.uk', 'techcrunch.com', 'engadget.com'],
    search: '',
    currentPage: 1,
    pageSize: '50',
    error: ''
}

export default function newsFilterReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER.CHANGE_OPTIONS_ENDPOINT:
            return {...state, endpoint: action.payload}
        case FILTER.CHANGE_OPTIONS_CATEGORY:
            return {...state, category: action.payload}
        case FILTER.CHANGE_OPTIONS_SORTBY:
            return {...state, sortBy: action.payload}
        case FILTER.CHANGE_OPTIONS_SEARCH:
            return {...state, search: action.payload}
        case FILTER.CHANGE_OPTIONS_CURRENTPAGE:
            return {...state, currentPage: action.payload}                            
        case FILTER.CHANGE_OPTIONS_PAGESIZE:
            return {...state, pageSize: action.payload}
        case FILTER.CHANGE_OPTIONS_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}