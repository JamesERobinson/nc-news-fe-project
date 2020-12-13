import React, { Component } from 'react';
import * as api from '../api';
import VoteButton from './VoteButton';
import SubmitComment from './SubmitComment';

export default class Comments extends Component {

    state = {
        article_id: '',
        comments: [],
    }

    componentDidMount() {
        api.fetchArticleComments(this.props.articleId).then(({ comments }) => {
            const article_id = this.props.articleId
            this.setState({ comments, article_id })
        })
    }

    componentDidUpdate(prevProp, prevState) {
        const newArticleId = prevState.article_id !== this.props.articleId
        if(newArticleId){
        api.fetchArticleComments(this.props.articleId).then(({ comments }) => {
            this.setState({ comments })
        })
    }
    }

    handleSubmit = (event) => {
        const { id: comment_id } = event.target
        this.delComment(comment_id)
    }

    addComment = (commentToPost) => {
        const { articleId } = this.props;
        api.postComment(commentToPost, articleId).then((newComment) => {
            this.setState((currState) => {
                return { comments: [newComment, ...currState.comments], }
            })
        })

    }
    delComment = (commentId) => {
        api.deleteComment(commentId).then(() => {

            this.setState((currState) => {
                const newState = currState.comments.filter((comment) => {
                    return comment.comment_id !== Number(commentId)
                })
                return { comments: newState }
            })
        })
    }
    voteComment = (commentId, voteDirection) => {
       
        api.VoteComment(commentId, voteDirection).then((commentApi) => {
            this.setState((currentState) => {
                const newState = currentState.comments.map((comment) => {
                    if (comment.comment_id === commentId) comment.votes = commentApi.votes
                    return comment
                })
                
                return { comments: newState }
            })
        })
    }
    render() {
        const { comments } = this.state;

        return (
            <div>
                <comments >
                    <SubmitComment addComment={this.addComment} />
                    <h2>Comments here</h2>
                    {comments.map((comment) => {
                        return (
                            <div key={`${comment.comment_id}`}>
                                <div className='comments-list'>
                                    <p>{comment.body}</p>
                                    <p>User: {comment.author}</p>
                                    <VoteButton votes={comment.votes} comment_id={comment.comment_id} voteComment={this.voteComment} />
                                    <p>{new Date(comment.created_at).toLocaleDateString('en-gb')}</p>
                                    <button id={`${comment.comment_id}`} onClick={this.handleSubmit}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </comments>
            </div>
        )
    }
}
