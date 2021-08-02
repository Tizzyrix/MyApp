import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNews} from '../../redux/actions'

import Newsletter from './Newsletter'
import Loader from '../Loader'
import Error from '../Error'

import '../../styles/news/newslist.scss'

const NewsList = () => {
    const dispatch = useDispatch()

    const isFavoriteShown = useSelector(state => state.news.isFavoriteShown)
    const favorites = useSelector( state => state.news.favorites )
    const isFetching = useSelector( state => state.news.isFetching) 
    const error = useSelector(state => state.news.error)

    const endpoint = useSelector(state => state.newsFilter.endpoint)
    const category = useSelector(state => state.newsFilter.category)
    const sortBy = useSelector(state => state.newsFilter.sortBy)
    const search = useSelector(state => state.newsFilter.search)
    const pageSize = useSelector(state => state.newsFilter.pageSize)
    const currentPage = useSelector(state => state.newsFilter.currentPage)
    const newsByPage = useSelector(state => state.news.newsByPage)

    const isEmpty = (obj) => {
        for (let key in obj ) {
            return false
        }
        return true
    }

    useEffect(() => {
        if (!newsByPage[currentPage]) dispatch(getNews())
        if (endpoint || category || sortBy || search || pageSize) dispatch(getNews())
    }, [currentPage, endpoint, category, sortBy, search, pageSize]);

    const showNews = () => {
        if (isFetching) {
            return <Loader/>
        } else {
            if (!isEmpty(error)) {
                return <Error />
            } else {
                if (isFavoriteShown) {
                    if (favorites.length !== 0) {
                        return favorites.map( item => <Newsletter item={item} key={item.id}/>)
                    } else {
                        return <span className='message'>You didnt add anything in favorites yet...</span>
                    }
                } else {
                    if (newsByPage[currentPage]?.length !== 0) {
                        return newsByPage[currentPage]?.map( item => <Newsletter item={item} key={item.id}/>)
                    } else {
                        return <span className='message'>Nothing found...</span>
                    }
                }
            }
        }
    }
    return (    
        <div className='news'>
            <div className="news__list">
                    {
                        showNews()
                    }
            </div>
        </div>
        
    )
};

export default NewsList
