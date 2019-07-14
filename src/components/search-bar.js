import React, { Component } from 'react'


class SearchBar extends Component {
state = {
    SearchText: "",
    placeHolder:"Tapez votre film...",
}

handleChange = (event) => {
    this.setState( { SearchText: event.target.value } );
}

    render () {
        return (
            <>
            <div className="row">
                <div className="col-md-8">
                    <input 
                    type="text" 
                    className="form-control input-lg"
                    onChange={this.handleChange}
                    placeholder={this.state.placeHolder} 
                    />
                </div>
            </div>  
            </>
        )
    }
}

export default SearchBar