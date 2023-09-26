// c5022a2e42eb484a866abb5a7dcbc756

import React from 'react'
import './newsItem.css'

const NewsItem = ({ title, description, url, urlToImage }) => {
    return (
        <div className="news-app">
            <div className='news-item'>
                <img className='news-img' src={urlToImage} alt={urlToImage} />
                <h3><a href={url}>{title}</a></h3>
                <p>{description}</p>
                {/* read the whole artice  */}
            </div>
        </div>
    )
}

export default NewsItem