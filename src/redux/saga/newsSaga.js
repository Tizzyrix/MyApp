import {put, takeEvery, call, select} from 'redux-saga/effects'
import axios from 'axios'
import {NEWS} from '../types'
import {idCreator} from '../../js/idCreator'


function axiosRequest (url) {
    return axios({
        method: 'GET',
        url: url
    })
}

function getUrl (filterOptions) {
    switch (filterOptions.endpoint) {
        case 'top-headlines':
            return `https://newsapi.org/v2/${filterOptions.endpoint}?category=${filterOptions.category}&pageSize=${filterOptions.pageSize}&page=${filterOptions.currentPage}&q=${filterOptions.search}&apiKey=c1010a9323d14d7682e439622f13c03d`
            break;
        case 'everything':
            return  `https://newsapi.org/v2/${filterOptions.endpoint}?from=${filterOptions.from}&pageSize=${filterOptions.pageSize}&page=${filterOptions.currentPage}&q=${filterOptions.search}&domains=${filterOptions.domains}&apiKey=c1010a9323d14d7682e439622f13c03d`
            break;
        default:
            return 
    }   
}

function* getNewsSaga () {
    // const getCurrentPage = () => (filterOptions.currentPage)
    // const getStateNewsFilter = state => state.newsFilter

    // const filterOptions = yield select(getStateNewsFilter)
    // const currentPage = getCurrentPage()

    const filterOptions = yield select(state => state.newsFilter)
    const currentPage = yield select(state => state.newsFilter.currentPage)
    const news = [];
    const url = getUrl(filterOptions)

    try {
        const response = yield call(axiosRequest, url)
        const {articles, totalResults, status} = response.data

        for (let i = 0; i < articles.length; i++) {
            news.push({
                id: idCreator(),
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
