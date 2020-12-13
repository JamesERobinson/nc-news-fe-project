import axios from 'axios';

export const fetchArticles = (query) => {
    return axios.get('https://front-of-news-test.herokuapp.com/api/articles', {
        params: query
    })
        .then(({ data }) => {
            return data;
        })
}
export const fetchSingleArticle = (props) => {
    const { article_id } = props;
    return axios
        .get(`https://front-of-news-test.herokuapp.com/api/articles/${article_id}`)
        .then(({ data }) => {
            return data;
        });
};
export const fetchArticleComments = (articleId) => {
    return axios
        .get(`https://front-of-news-test.herokuapp.com/api/articles/${articleId}/comments`)
        .then(({ data }) => {
            return data;
        });
};

export const postComment = (newComment, articleId) => {
    return axios.post(`https://front-of-news-test.herokuapp.com/api/articles/${articleId}/comments`, newComment)
        .then(({ data }) => {
            return data.comment;
        });
}
export const deleteComment = (comment_id) => {
    return axios.delete(`https://front-of-news-test.herokuapp.com/api/comments/${comment_id}`)

}

export const VoteArticle = (article_id, vote_inc) => {
    return axios.patch(`https://front-of-news-test.herokuapp.com/api/articles/${article_id}`, { inc_votes: vote_inc })
        .then(({ data }) => {
            const { votes } = data.article
            return votes;
        })

}
export const VoteComment = (comment_id, vote_inc) => {
    return axios.patch(`https://front-of-news-test.herokuapp.com/api/comments/${comment_id}`, { inc_votes: vote_inc })
        .then(({ data }) => {
            return data.comment;
        })

}