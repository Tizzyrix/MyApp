import React from 'react'; 
import {useDispatch} from 'react-redux'
import {newsFavoriteHandler} from '../../redux/actions'

import '../../styles/news/newsletter.scss'

import add from '../../img/icons/newsletter/add.png'
import remove from '../../img/icons/newsletter/remove.png'
import newsletter from '../../img/newsletter/newsletter.jpg'

const Newsletter = ({ item }) => {
    const dispatch = useDispatch(); 

    const date = new Date(Date.parse(item.publishedAt))
    const dateToWrite = `${date.getFullYear(new Date(Date.parse(item.publishedAt)))} ${date.getMonth(new Date(Date.parse(item.publishedAt)))} ${date.getDate(new Date(Date.parse(item.publishedAt)))}`

    const time = `${date.getHours(new Date(Date.parse(item.publishedAt)))}:${date.getMinutes(new Date(Date.parse(item.publishedAt)))}`
    const timeToWrite = time.length === 4 ? `${time.slice(0, 2)}:0${time.slice(3)}` : time

        return (
        <div className="newsletter">
            <div className="newsletter__main">
                <div className="newsletter__img">
                    <img src={
                        item.urlToImage ? 
                        item.urlToImage
                        :
                        newsletter
                    } alt="" />
                </div>
                <div className="newsletter__text">
                    <div className="newsletter__title">
                        <h2>{item.title}</h2>
                    </div>
                    <div className="newsletter__subtitle">
                        <p>{item.description}</p>
                    </div>
                </div>
                <div className="newsletter__meta">
                    <div className="newsletter__time">
                        <span>{dateToWrite}</span>
                        <span>{timeToWrite}</span>
                    </div>
                    <div className={
                        item.isFavorited ? 
                        "newsletter__favbtn active"
                        :
                        "newsletter__favbtn"
                    }
                    onClick={()=>{
                        item.isFavorited?
                        dispatch(newsFavoriteHandler('remove', item))
                        :
                        dispatch(newsFavoriteHandler('add', item))
                    }}
                    >

                            <div className="favbtn__text">
                                {
                                item.isFavorited?
                                <span>Remove</span>
                                :
                                <span>Add</span>
                                }
                            </div>
                            <div className="favbtn__img">
                                <img src={
                                        item.isFavorited?
                                        remove
                                        :
                                        add
                                } alt="#" />
                            </div>
                    </div>
                    <div className="newsletter__source">
                        <a href={item.url}>Source</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Newsletter;
