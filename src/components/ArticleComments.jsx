// import React from 'react'
// import VoteButton from './VoteButton';

// export default function ArticleComments(props) {
//     const { comments } = props;

//     const handleSubmit = (event) => {
//         const { id: comment_id } = event.target
//         props.delComment(comment_id)
//     }

//     return (
//         <div>
//             <comments >
//                 <h2>Comments</h2>
//                 {comments.map((comment) => {
//                     return (
//                         <div key={`${comment.comment_id}`}>
//                             <div className='comments-list'>
//                                 <p>{comment.body}</p>
//                                 <p>User: {comment.author}</p>
//                                 <VoteButton votes={comment.votes} comment_id={comment.comment_id} voteComment={props.voteComment} />
//                                 <p>{new Date(comment.created_at).toLocaleDateString('en-gb')}</p>
//                                 <button id={`${comment.comment_id}`} onClick={handleSubmit}>Delete</button>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </comments>
//         </div>
//     )
// }
