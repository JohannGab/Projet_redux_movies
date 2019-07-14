import React, { Component } from 'react';
import axios from 'axios'

import SearchBar from "./components/search-bar"
import VideoList from './containers/video-list';
import VideoDetail from './components/video-detail';
import Video from './components/video';

import './style.scss'


const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=af6b7a9e7847c591fea91cf17561fde6"



class App extends Component {
state = {
  moviesList: {},
  currentMovie:{},
}

initMovies = () => {
  axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then((res)=> {
    this.setState({moviesList: res.data.results.slice(1,6),currentMovie: res.data.results[0]},()=>{
        this.applyVideoToCurrentMovie();
  });
  })
}


applyVideoToCurrentMovie() {
  axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then((res)=> {
    console.log("poulet",res);
    const youtubeKey = res.data.videos.results[0].key;
    let newCurrentMovieState = this.state.currentMovie;
    newCurrentMovieState.videoId = youtubeKey;
    this.setState({currentMovie: newCurrentMovieState})
  });
}

componentWillMount() {  
  this.initMovies()
}

receiveCallBack = (movie)=>{
  this.setState({currentMovie: movie}, () => {
        this.applyVideoToCurrentMovie();
})
}

  render() {
    const renderVideoList = () => {
      if (this.state.moviesList.length >=5) {
        return <VideoList moviesList={this.state.moviesList} callback={this.receiveCallBack}/>
      }
    }
  return (
    <>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="row">
          <div className="col-md-8">
              <Video videoId={this.state.currentMovie.videoId} />
              <VideoDetail 
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
              />
          </div>
            <div className="col-md-4">
              {renderVideoList()}
            </div>
      </div>
    </>
    );
  }
}

export default App;
