import React, { Component } from 'react'

export default class VoteButton extends Component {
state ={ hasVoted: false}
    handleClick = (event) => {
    
    if(this.props.article_id){
        this.props.voteArticle(this.props.article_id, event.target.id)
    } else{
        
        this.props.voteComment(this.props.comment_id, event.target.id)
        
    }

    }
render(){
    return (

        <div>
            <div className='votes-button'>
                <p className='vote-button' id={1} onClick={this.handleClick} >⬆️ </p>
                 Votes: {this.props.votes}
                <p className='vote-button' id={-1} onClick={this.handleClick}>⬇️</p>
            </div>
        </div>
    )
}
}
