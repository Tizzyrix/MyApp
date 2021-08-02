import {NEWS ,FILTER} from './types'

export function getNews () {
    return ({type: NEWS.GET_NEWS})
}

export function favoritesLocalStorageInit () {
    return {type: NEWS.FAVORITE_LOCAL_STORAGE}
}

export function newsFavoriteHandler (action, item) {
    return {type: NEWS.FAVORITE, payload: {action, item} }
}

export function changeFilterOptions (key, value)  {
    return {type: FILTER.CHANGE_OPTION, payload: {key, value} }
}

export function isFavoriteShownToggle () {
    return {type: NEWS.FAVORITE_ISSHOW}
}