import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = (props) => {
    const { article_id, author, comment_count, created_at, title, votes } = props
    const created_atMod = new Date(created_at).toLocaleDateString('en-gb');
    return (

        <li className='article-card'>
            <Link className='article-link' to={`article/${article_id}`} >
                <p className='article-title'> {title}</p>
            </Link>
            <p className='article-votes'> Votes: {votes}</p>
            <p className='article-postdate'>Post Date: {created_atMod}</p>
            <p className='article-author'>Author: {author}</p>
            <p className='article-comments'>Comments: {comment_count}</p>

        </li>

    )
}
export default ArticleCard;