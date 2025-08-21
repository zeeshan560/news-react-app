import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imgUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img src={imgUrl?imgUrl:"https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title?title.slice(0,45):""}...</h5>
            <p className="card-text">{description?description.slice(0,88):""}...</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
