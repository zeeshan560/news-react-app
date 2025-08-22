import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
    articles = [];
    constructor(){    
        super();
        // console.log('hello i am a constructor');
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        // console.log("cdm");
        this.setState({loading: true});
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d5771a38db96452ba33458561d31ed29&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        // console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    }

    handlePrevClick = async ()=>{
        this.setState({loading: true});
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d5771a38db96452ba33458561d31ed29&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        // console.log(parseData);
        this.setState({ 
            page: this.state.page - 1,
            articles: parseData.articles, 
            loading: false
        })
    }

    handleNextClick = async ()=>{
        // console.log('next')
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        } else {
            this.setState({loading: true});
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d5771a38db96452ba33458561d31ed29&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parseData = await data.json()
            // console.log(parseData);
            this.setState({ 
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })  
        }      
    }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News Site</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-3">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url}/>
                </div>  
            })}
                     
        </div>
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
