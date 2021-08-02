import {NEWS} from '../types'

const initialState = {
    metadata: {},
    newsByPage: {},
    favorites: [],
    isFavoriteShown: false,
    isFetching: false,
    error: {},
};

export default function newsReducer (state = initialState, action) {
    switch (action.type) {

        case NEWS.GET_NEWS:{
            return { ...state, isFetching: true}
        }           
        case NEWS.GET_NEWS_FAIELD: {
            const { error } = action.payload
            return {...state, error, isFetching: false}
        } 
        case NEWS.GET_NEWS_SUCCESS: {
            const {metadata, currentPage, news}  = action.payload
            return {...state, newsByPage: {...state.newsByPage, [currentPage] : news}, metadata, isFetching: false}
        }

        case NEWS.FAVORITE_LOCAL_STORAGE_INIT: {
            if (!localStorage.favorites) localStorage.favorites = JSON.stringify([])
            return {...state, favorites: JSON.parse(localStorage.favorites)}
        } 

        case NEWS.FAVORITE_ADD: {
            const { item, page } = action.payload
            const localStorageFavorites = JSON.parse(localStorage.favorites)
            localStorage.favorites = JSON.stringify(localStorageFavorites.concat({...item, isFavorited: !item.isFavorited}))
            return {
                ...state,
                newsByPage: {...state.newsByPage, [page]: state.newsByPage[page].map(el => el.id === item.id ? {...el, isFavorited: !el.isFavorited} : el) } ,
                favorites: JSON.parse(localStorage.favorites)
            }
        }
        case NEWS.FAVORITE_REMOVE: {
            const { item, page } = action.payload
            const localStorageFavorites = JSON.parse(localStorage.favorites)
            localStorage.favorites = JSON.stringify(localStorageFavorites.filter(el=> el.id !== item.id))
            return {
                ...state,
                newsByPage: {...state.newsByPage, [page]: state.newsByPage[page].map(el => el.id === item.id ? {...el, isFavorited: !el.isFavorited} : el) },
                favorites: JSON.parse(localStorage.favorites)
            }
        }

        case NEWS.FAVORITE_TOGGLE: {
            return {...state, isFavoriteShown: !state.isFavoriteShown}
        }
        
        default:
            return state
    }
};