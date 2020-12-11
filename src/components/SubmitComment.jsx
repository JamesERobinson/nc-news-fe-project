import React, { Component } from 'react'

export default class SubmitComment extends Component {
    state = {
        body: '',
        username: 'weegembump',
    };

    handleChange = (event)=>{
        const {value, name} = event.target;
        this.setState({[name]: value})
        //console.log(this.state,"checking state")
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.addComment(this.state)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Add A Comment:
                <textarea
                type="text"
                name="body"
                 onChange={this.handleChange}
                 value = {this.state.body}>
                 </textarea>
                </label>
                <button type="submit" >POST</button>    
            </form>
        )
    }
}
