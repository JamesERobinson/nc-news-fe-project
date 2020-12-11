import React, { Component } from 'react';
import * as api from '../api';
import ArticleComments from './ArticleComments';
import SubmitComment from './SubmitComment';
import VoteButton from './VoteButton';

export default class Article extends Component {

    state = {
        article: {},
        comments: [],
        isLoading: true,

    }

    componentDidMount() {
        api.fetchSingleArticle(this.props).then(({ article }) => {
            this.setState({ article, isLoading: false })
            // console.log('state done1', this.state)
        });

        api.fetchArticleComments(this.props).then(({ comments }) => {
            this.setState({ comments })
            //console.log('state done2', this.state)
        })

    }
    componentDidUpdate(prevProp, prevState) {
        const newArticleId = prevProp.article_id !== this.props.article_id
        if (newArticleId) {
            api.fetchSingleArticle(this.props).then(({ article }) => {
                this.setState({ article });
            });

        }
    }
    addComment = (commentToPost) => {
        const { article_id } = this.props;
        api.postComment(commentToPost, article_id).then((newComment) => {
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
    voteArticle = (articleId)=>{
        console.log('hello in artle metod',articleId)
    }
    render() {
        const { article, comments, isLoading } = this.state;
        
        if (isLoading) {
            return <h2 className='loading'> Article Loading ..</h2>
        }
        return (
            <div>
                <section className='main-article'>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                    <p>{new Date(article.created_at).toLocaleDateString('en-gb')}</p>
                    <p>{article.author}</p>
                    <p>{article.topic}</p>
                    <VoteButton votes={article.votes} voteArticle={this.voteArticle} article_id={article.article_id}/>
                </section>
                <SubmitComment addComment={this.addComment} />
                <ArticleComments comments={this.state.comments} delComment={this.delComment} />
            </div>
        )
    }
}
