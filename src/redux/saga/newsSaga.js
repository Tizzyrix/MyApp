import {put, takeEvery, call, select} from 'redux-saga/effects'
import axios from 'axios'
import {NEWS} from '../types'
import {helpers} from '../../js/helpers'

function axiosRequest (url) {
    return axios({
        method: 'GET',
        url: url
    })
}

function* getNewsSaga () {
    const filterOptions = yield select(state => state.newsFilter)
    const currentPage = yield select(state => state.newsFilter.currentPage)
    const news = [];
    const url = helpers.getUrl(filterOptions)

    try {
        const response = yield call(axiosRequest, url)
        const {articles, totalResults, status} = response.data

        for (let i = 0; i < articles.length; i++) {
            news.push({
                id: helpers.idCreator(),
                title: articles[i].title,
                description: articles[i].description,
                publishedAt: articles[i].publishedAt,
                url: articles[i].url,
                urlToImage: articles[i].urlToImage,
                isFavorited: false,
            })
        }
        yield put({type: NEWS.GET_NEWS_SUCCESS, payload: 
            {news, currentPage, metadata: {totalResults, status}
        } })
    } catch (error) {
        yield put({type: NEWS.GET_NEWS_FAIELD, payload: { error }})
    }
}

function* newsFavoriteSaga ({payload: {action, item}}) {  
    switch (action) {
        case 'add': {
            const page = yield select(state=>state.newsFilter.currentPage)
            yield put( {type: NEWS.FAVORITE_ADD, payload: { item, page } } )
            break;
        }

        case 'remove': {
            const page = yield select(state=>state.newsFilter.currentPage)
            yield put( {type: NEWS.FAVORITE_REMOVE, payload: { item, page } } )
            break;
        }
        default:
            console.log('Right case not found')
    }
}
function* isFavoriteShownToggleSaga () {
    yield put({type: NEWS.FAVORITE_TOGGLE})
}
function* favoritesLocalStorageInitSaga () {
    yield put({type: NEWS.FAVORITE_LOCAL_STORAGE_INIT})
}



export function* favoritesLocalStorageInitWatcher () {
    yield takeEvery(NEWS.FAVORITE_LOCAL_STORAGE, favoritesLocalStorageInitSaga)
}
export function* isFavoriteShownToggleWatcher () {
    yield takeEvery(NEWS.FAVORITE_ISSHOW, isFavoriteShownToggleSaga)
}
export function* newsFavoriteWathcer () {
    yield takeEvery(NEWS.FAVORITE, newsFavoriteSaga)
}
export function* getNewsWatcher() {
    yield takeEvery(NEWS.GET_NEWS, getNewsSaga)
}
