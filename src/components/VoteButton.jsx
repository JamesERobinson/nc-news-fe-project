import React from 'react'

export default function VoteButton(props) {

    const handleClick=(event)=>{
console.log('got click',event)
console.log(props,'props here')
props.voteArticle(props.article_id)
    }

    return (

        <div>
            <p className='votes-button'> 
                 <p className='vote-button' onClick={handleClick} >⬆️ </p>
                 Votes: {props.votes}
                 <p className='vote-button' onClick={handleClick}>⬇️</p>
            </p>
        </div>
    )
}
