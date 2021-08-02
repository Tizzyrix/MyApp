import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import newsReducer from './reducers/newsReducer';
import newsFilterReducer from './reducers/newsFilterReducer'

import { rootWathcer } from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    news: newsReducer,
    newsFilter: newsFilterReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootWathcer)