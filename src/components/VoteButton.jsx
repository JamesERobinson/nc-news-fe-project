import React from 'react'

export default function VoteButton(props) {

    const handleClick = (event) => {
    
    if(props.article_id){
        props.voteArticle(props.article_id, event.target.id)
    } else{
        
        props.voteComment(props.comment_id, event.target.id)
        
    }

    }

    return (

        <div>
            <div className='votes-button'>
                <p className='vote-button' id={1} onClick={handleClick} >⬆️ </p>
                 Votes: {props.votes}
                <p className='vote-button' id={-1} onClick={handleClick}>⬇️</p>
            </div>
        </div>
    )
}
