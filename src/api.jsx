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
export const fetchArticleComments = (props) => {
    const { article_id } = props;
    return axios
        .get(`https://front-of-news-test.herokuapp.com/api/articles/${article_id}/comments`)
        .then(({ data }) => {
            return data;
        });
};

export const postComment = (newComment, article_id) => {
    //const { article_id, newComment } = props
    return axios.post(`https://front-of-news-test.herokuapp.com/api/articles/${article_id}/comments`, newComment).then(({ data }) => {
        return data.comment;
    });
}
export const deleteComment = (comment_id) => {
    //const { article_id, newComment } = props
    console.log(comment_id,'inside api')
    return axios.delete(`https://front-of-news-test.herokuapp.com/api/comments/${comment_id}`)
    
}