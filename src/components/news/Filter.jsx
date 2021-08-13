import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {changeFilterOptions, getNews, isFavoriteShownToggle} from '../../redux/actions'

import '../../styles/news/filter.scss'

import favorite from '../../img/icons/filter/favorite.png'
import hot from '../../img/icons/filter/hot.png'
import infinity from '../../img/icons/filter/infinity.png'
import refresh from '../../img/icons/filter/refresh.png'
import search from '../../img/icons/filter/search.png'
import back from '../../img/icons/general/back.png'

const Filter = () => {
    const dispatch = useDispatch();

    const filterOptions = useSelector(state => state.newsFilter);
    const isFavoriteShown = useSelector(state => state.news.isFavoriteShown)

    const [inputVal, setInputVal] = useState('')
    const [isActiveSearch, setIsActiveSearch] = useState(false)

    return (    
    <div className="filter">
        <div className="endpoint">

            <div 
            className="endpoint__item favorite"
            onMouseEnter={e=>e.target.classList.add('hover')}
            onMouseLeave={e=>e.target.classList.remove('hover')}
            onClick={()=>{dispatch(isFavoriteShownToggle())}}
            >
                <div className="endpoint__btn-text">
                    <span>
                        {
                        isFavoriteShown?
                        'Back'
                        :
                        'Favorite'
                        }
                        </span>
                </div>
                <div className="endpoint__btn-icon">
                    <img src = {
                        isFavoriteShown?
                        back
                        :
                        favorite

                    } 
                    alt="#" 
                    />
                </div>
            </div>

            <div 
            className="endpoint__item hot"
            onMouseEnter={e=>e.target.classList.add('hover')}
            onMouseLeave={e=>e.target.classList.remove('hover')}
            onClick={()=>dispatch(changeFilterOptions('endpoint', 'top-headlines'))}
            >
                <div className="endpoint__btn-text">
                    <span>Hot</span>
                </div>
                <div className="endpoint__btn-icon">
                    <img src={hot} alt="#" />
                </div>
            </div>

            <div 
            className="endpoint__item everything"
            onMouseEnter={e=>e.target.classList.add('hover')}
            onMouseLeave={e=>e.target.classList.remove('hover')}
            onClick={()=>dispatch(changeFilterOptions('endpoint', 'everything'))}
            >
                <div className="endpoint__btn-text">
                    <span>All</span>
                </div>
                <div className="endpoint__btn-icon">
                    <img src={infinity} alt="#" />
                </div>
            </div>

        </div>
        <div className={
            isActiveSearch?
            'search active'
            :
            'search'
        }>
            <form
            action="submit"
            onSubmit={e=>{
                e.preventDefault()
                dispatch(changeFilterOptions('search', inputVal))
            }}>
                <div className={
                    isActiveSearch?
                    'search__input active'
                    :
                    'search__input'
                    }>
                    <input
                    value={inputVal}
                    onChange={(e)=>setInputVal(e.target.value)}
                    placeholder='Search...'
                    type="text" 
                    className={
                        isActiveSearch?
                        'active'
                        :
                        ''
                    }
                    />
                </div>
                <div 
                className={isActiveSearch?'search__button active':'search__button'}
                onClick={()=>setIsActiveSearch(!isActiveSearch)}
                >
                    <button type='submit' action='submit'>
                        <img src={search} alt="#" />
                    </button>
                </div>
            </form>
        </div>
        <div
        className="refresh"
        onClick={()=>dispatch(getNews())}
        >
            <div className="refresh__icon">
                <img src={refresh} alt="#" />
            </div>
        </div>
        <div className="pagination">
            <div className="pagesize">
                <select
                value={filterOptions.pageSize}
                onChange={e=>dispatch(changeFilterOptions('pageSize', e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    </div>
    )
};

export default Filter;