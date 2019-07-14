import React from 'react'
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {
    const {moviesList} = props  
        return (
            <>
            <ul>
                {
                    moviesList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack} />
                    })
                }
                
            
            </ul>

            </>
        )
        function receiveCallBack (movie) {
            props.callback(movie)
            
        }
}

export default VideoList