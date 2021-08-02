import React from 'react'
import {useSelector} from 'react-redux'

import '../styles/error.scss'

const Error = () => {
    const error = useSelector(state => state.news.error)
    return (
        <div className="error">
            <h3 className="error__name" >{error.name}</h3>
            <p className="error__message" >{error.message}</p>
        </div>
    )
}


export default Error