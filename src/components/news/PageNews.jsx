import React from 'react'; 
import { useDispatch } from 'react-redux';
import {favoritesLocalStorageInit} from '../../redux/actions'

import Filter from './Filter';
import NewsList from './NewsList'
import PaginationBS from './PaginationBS';

import newsPage from '../../styles/news/newsPage.scss'

const PageNews = () => {
    const dispatch = useDispatch()
    dispatch(favoritesLocalStorageInit())
    return (
        <div className='page newsp'>
            <Filter />
            <NewsList />
            <div className="paginationbs">
                <PaginationBS />
            </div>
        </div>

    )
};

export default PageNews;