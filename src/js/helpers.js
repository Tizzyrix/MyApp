export const helpers = {
    // src/components/news/Newsletter
    getTimeAndDate(item) {
        const date = new Date(Date.parse(item.publishedAt))
        const time = `${date.getHours(new Date(Date.parse(item.publishedAt)))}:${date.getMinutes(new Date(Date.parse(item.publishedAt)))}`
        return {
            date: `${date.getFullYear(new Date(Date.parse(item.publishedAt)))} ${date.getMonth(new Date(Date.parse(item.publishedAt)))} ${date.getDate(new Date(Date.parse(item.publishedAt)))}`,
            time: time.length === 4 ? `${time.slice(0, 2)}:0${time.slice(3)}` : time
        }
    },
    // src/components/news/FilterCategory
    nameOfCategoriesHandler(item) {
        switch (item) {
            case 'business':
                return 'Business'
                break;
            case 'entertainment':
                return 'Entertainment'
                break;
            case 'general':
                return 'General'
                break;
            case 'health':
                return 'Health'
                break;
            case 'science':
                return 'Science'
                break;
            case 'sports':
                return 'Sports'
                break;
            case 'technology':
                return 'Technology'
                break;
            case 'relevancy':
                return 'Relevancy'
                break;
            case 'popularity':
                return 'Popularity'
                break;
            case 'publishedAt':
                return 'Published at'
                break;
            default:
                return item

        }
    },
    // src/components/news/NewsList
    isEmpty(obj) {
        for (let key in obj ) {
            return false
        }
        return true
    },
    showNews() {
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
    },
    // src/components/news/PaginationBS
    countPages(allNews, pageSize, pages) {
        const pagesCount = allNews / pageSize + 1
        for (let i = 1; i < pagesCount; i++) {
            pages.push(i)
        }
     },
     getActivePages(currentPage, pages, activePages) {      
         for (let i = currentPage-1; i <= currentPage+1; i++) {
             if (i <= 0 || i > pages.length) {        
                 continue
             } else {
                 activePages.push(i)
             }
         }
    },
    // src/redux/saga/newsSaga
    getUrl(filterOptions) {
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
    },
    // axiosRequest (url) {
    //     return axios({
    //         method: 'GET',
    //         url: url
    //     })
    // },
    idCreator() {
        return Math.ceil(Date.now()*Math.random(100))
    },
} 