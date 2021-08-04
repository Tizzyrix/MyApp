import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {changeFilterOptions} from '../../redux/actions'
import Pagination from 'react-bootstrap/Pagination'
import {helpers} from '../../js/helpers'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/news/paginationBS.scss'


const PaginationBS = () => {
    const dispatch = useDispatch();

    const pages = []
    const activePages = []
    const currentPage = useSelector( state => state.newsFilter.currentPage)
    const allNews = useSelector(state=> state.news.metadata.totalResults)
    const pageSize = useSelector(state=> state.newsFilter.pageSize)

    helpers.countPages(allNews, pageSize, pages)
    helpers.getActivePages(currentPage, pages, activePages)

    return (
        <Pagination size='sm'>
            <Pagination.First onClick={()=>dispatch(changeFilterOptions('currentPage',pages[0]))}/>
            <Pagination.Prev onClick={()=>dispatch(changeFilterOptions('currentPage',
            currentPage === pages[0]?
            currentPage
            :
            currentPage - 1
            ))} />
            {
                activePages.includes(pages[0])?
                null
                :
                <>
                    <Pagination.Item onClick={()=>dispatch(changeFilterOptions('currentPage',pages[0]))}>{pages[0]}</Pagination.Item>
                    <Pagination.Ellipsis />
                </>
            }
            {                
                activePages.map(page => <Pagination.Item 
                    key={page} 
                    active={page === currentPage}
                    onClick={()=>dispatch(changeFilterOptions('currentPage',page))}
                    >{page}</Pagination.Item>)
            }
            {
               activePages.includes(pages.length)? 
               null:
               <>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={()=>dispatch(changeFilterOptions('currentPage', pages[pages.length - 1]))}>{pages[pages.length - 1]}</Pagination.Item>
               </>   
            }
            <Pagination.Next onClick={()=>dispatch(changeFilterOptions('currentPage',
            currentPage === pages[pages.length - 1]?
            currentPage
            :
            currentPage + 1
            ))} />
            <Pagination.Last onClick={()=>dispatch(changeFilterOptions('currentPage',pages[pages.length - 1]))} />
        </Pagination>
    )
}

export default PaginationBS