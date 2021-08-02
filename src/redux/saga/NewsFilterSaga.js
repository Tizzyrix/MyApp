import {put, takeEvery} from 'redux-saga/effects'
import {FILTER} from '../types'



function* filterOptionsSaga ( { payload : {key, value} } ) {
    switch (key) {
        case 'endpoint':
            yield put({type: FILTER.CHANGE_OPTIONS_ENDPOINT, payload: value})
            break;
        case 'category':
            yield put({type: FILTER.CHANGE_OPTIONS_CATEGORY, payload: value})
            break;
        case 'sortBy':
            yield put({type: FILTER.CHANGE_OPTIONS_SORTBY, payload: value})
            break;
        case 'search':
            yield put({type: FILTER.CHANGE_OPTIONS_SEARCH, payload: value})
            break;
        case 'currentPage':
            yield put({type: FILTER.CHANGE_OPTIONS_CURRENTPAGE, payload: value})
            break;
        case 'pageSize':
            yield put({type: FILTER.CHANGE_OPTIONS_PAGESIZE, payload: value})
            break;
        default:
            yield put({type: FILTER.CHANGE_OPTIONS_ERROR, payload: 'error'})
    }
}

export function* filterOptionsWatcher () {
    yield takeEvery(FILTER.CHANGE_OPTION, filterOptionsSaga)
}
