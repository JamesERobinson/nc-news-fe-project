import React from 'react'

export default function ArticleComments(props) {
    const { comments } = props;

    const handleSubmit = (event) => {
        const { id: comment_id } = event.target
        props.delComment(comment_id)
    }

    return (
        <div>
            <comments >
                <h2>Comments</h2>
                {comments.map((comment) => {
                    return (
                        <div key={`${comment.comment_id}`}>
                            <div className='comments-list'>
                                <p>{comment.body}</p>
                                <p>User: {comment.author}</p>
                                <p>Votes: {comment.votes}</p>
                                <p>{new Date(comment.created_at).toLocaleDateString('en-gb')}</p>
                                <button id={`${comment.comment_id}`} onClick={handleSubmit}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </comments>
        </div>
    )
}