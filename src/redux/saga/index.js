import {all} from 'redux-saga/effects'

import {isFavoriteShownToggleWatcher ,newsFavoriteWathcer, getNewsWatcher, favoritesLocalStorageInitWatcher} from './newsSaga'
import {filterOptionsWatcher} from './NewsFilterSaga'

export function* rootWathcer () {
    yield all([
        getNewsWatcher(),
        filterOptionsWatcher(),
        newsFavoriteWathcer(),
        isFavoriteShownToggleWatcher(),
        favoritesLocalStorageInitWatcher()
    ])
}