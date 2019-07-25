import React, { Component } from 'react'


class SearchBar extends Component {
state = {
    SearchText: "",
    placeHolder:"Tapez votre film...",
    intervalBeforRequest: 1000,
    lockRequest: false
}

handleChange = (event) => {
    this.setState( { SearchText: event.target.value });
    if(!this.state.lockRequest) {
        this.setState({lockRequest:true})
        setTimeout(()=>{this.search()},this.state.intervalBeforRequest)
    }
}

handleOnclick = () => {
    this.search()
}

search() {
    this.props.callback(this.state.SearchText)
    this.setState({lockRequest:false})
}


    render () {
        return (
            <>
            <div className="row">
                <div className="col-md-8 input-group">
                    <input 
                    type="text" 
                    className="form-control input-lg"
                    onChange={this.handleChange}
                    placeholder={this.state.placeHolder} 
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" onClick={this.handleOnclick}>GO</button>
                    </span>
                </div>
            </div>  
            </>
        )
    }
}

export default SearchBar