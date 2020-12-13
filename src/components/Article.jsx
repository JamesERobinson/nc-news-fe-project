import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';
import ErrorMessage from './ErrorMessage';
import VoteButton from './VoteButton';

export default class Article extends Component {

    state = {
        article: {},
        isLoading: true,
        hasError: false,
        errorMessage: ' ',
    }

    componentDidMount() {
        api.fetchSingleArticle(this.props).then(({ article }) => {
            this.setState({ article, isLoading: false })
        }).catch((err)=>{
            const { response: {status, statusText}} =err
            this.setState({
                hasError: true,
                isLoading: false,
                errorMessage: `Article not found... ${status}!!! ${statusText}`
            })
        });

    }
    componentDidUpdate(prevProp, prevState) {
        const newArticleId = prevProp.article_id !== this.props.article_id
        const newVote = prevState.article.votes !== this.state.article.votes
        if (newArticleId || newVote) {
            api.fetchSingleArticle(this.props).then(({ article }) => {
                this.setState({ article, isLoading: false });
            });

        }
    }

    voteArticle = (articleId, voteDirection) => {
        api.VoteArticle(articleId, voteDirection).then((votesback) => {

            this.setState((currState) => {
                const article = currState.article;
                article.votes = votesback;
                const newState = ({ article })
                return newState
            })

        })
    }
   
    render() {

        //404 - not found
        //display article not found
        // display  invalid article_id cant search 
        const { article, hasError, errorMessage, isLoading } = this.state;

        if (isLoading) {
            return <h2 className='loading'> Article Loading ..</h2>
        } else if(hasError){
        return <ErrorMessage errorMessage={errorMessage}/>
        } else {
        return (
            <div>
                <section className='main-article'>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                    <p>{new Date(article.created_at).toLocaleDateString('en-gb')}</p>
                    <p>{article.author}</p>
                    <p>{article.topic}</p>
                    <VoteButton votes={article.votes} voteArticle={this.voteArticle} article_id={article.article_id} />
                </section>
                <Comments articleId={article.article_id} />
            </div>
        );
        }
    }
}

// import React, { Component } from 'react';
// import * as api from '../api';
// import ArticleComments from './ArticleComments';
// import SubmitComment from './SubmitComment';
// import VoteButton from './VoteButton';

// export default class Article extends Component {

//     state = {
//         article: {},
//         comments: [],
//         isLoading: true,

//     }

//     componentDidMount() {
//         api.fetchSingleArticle(this.props).then(({ article }) => {
//             this.setState({ article, isLoading: false })
//             // console.log('state done1', this.state)
//         });

//         api.fetchArticleComments(this.props).then(({ comments }) => {
//             this.setState({ comments })
//             //console.log('state done2', this.state)
//         })

//     }
//     componentDidUpdate(prevProp, prevState) {
//         //const newArticleId = prevProp.article_id !== this.props.article_id
//         //if (newArticleId) {
//         api.fetchSingleArticle(this.props).then(({ article }) => {
//             this.setState({ article });
//         });

//         //}
//     }
//     addComment = (commentToPost) => {
//         const { article_id } = this.props;
//         api.postComment(commentToPost, article_id).then((newComment) => {
//             this.setState((currState) => {
//                 return { comments: [newComment, ...currState.comments], }
//             })
//         })

//     }

//     delComment = (commentId) => {
//         api.deleteComment(commentId).then(() => {

//             this.setState((currState) => {
//                 const newState = currState.comments.filter((comment) => {
//                     return comment.comment_id !== Number(commentId)
//                 })
//                 return { comments: newState }
//             })
//         })
//     }
//     voteArticle = (articleId, voteDirection) => {
//         api.VoteArticle(articleId, voteDirection).then((votesback) => {
//             this.setState((currState) => {
//                 //const { article } = currState
//                 const newState = {  article: votesback, ...currState }

//                 return newState
//             })

//         })
//     }
//     voteComment = (commentId, voteDirection)=>{
//         console.log(this.state, 'loggin da sate')
//         //console.log('invote coment',commentId, '<--commentId',voteDirection,'<--voteDirection')
//         api.VoteComment(commentId, voteDirection).then((votesback)=>{
//             this.setState = ((currentState)=>
//             {
//                 console.log(currentState,'herererer')
//             })
//         })
//     }
//     render() {
//         const { article, comments, isLoading } = this.state;

//         if (isLoading) {
//             return <h2 className='loading'> Article Loading ..</h2>
//         }
//         return (
//             <div>
//                 <section className='main-article'>
//                     <h2>{article.title}</h2>
//                     <p>{article.body}</p>
//                     <p>{new Date(article.created_at).toLocaleDateString('en-gb')}</p>
//                     <p>{article.author}</p>
//                     <p>{article.topic}</p>
//                     <VoteButton votes={article.votes} voteArticle={this.voteArticle} article_id={article.article_id} />
//                 </section>
//                 <SubmitComment addComment={this.addComment} />
//                 <ArticleComments comments={comments} delComment={this.delComment} voteComment={this.voteComment}/>
//             </div>
//         )
//     }
// }
