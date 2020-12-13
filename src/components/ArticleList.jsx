import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from '../components/ArticleCard';


class ArticleList extends Component {
    state = {
        articles: [],
        isLoading: true,
        selectTopic: '',
        sortBy: '',
        orderBy: 'asc'
    };

    componentDidMount() {
        api.fetchArticles().then(({ articles }) => {
            this.setState({ articles, isLoading: false });
        });
    }

    componentDidUpdate(prevProp, prevState) {
        const newTopic = prevState.selectTopic !== this.state.selectTopic;
        const newSortBy = prevState.sortBy !== this.state.sortBy;
        const newOrderBy = prevState.orderBy !== this.state.orderBy;
        if (newTopic) {
            api.fetchArticles({ topic: this.state.selectTopic }).then(({ articles }) => {
                this.setState({ articles, isLoading: false });
            })
        }
        if (newSortBy || newOrderBy) {
            api.fetchArticles({ topic: this.state.selectTopic, sort_by: this.state.sortBy, order: this.state.orderBy }).then(({ articles }) => {
                this.setState({ articles, isLoading: false })
            })
        }

    }

    updateTopic = (event) => {
        this.setState((currentState) => {
            const newState = { selectTopic: event.target.id }
            return newState;
        })
    };

    updateSortBy = (event) => {

        this.setState((currentState) => {
            let { orderBy: newOrderBy } = currentState
            if (newOrderBy === 'desc') { newOrderBy = 'asc'; }
            else { newOrderBy = 'desc'; }
            const newState = { sortBy: event.target.id, orderBy: newOrderBy }
            return newState;
        })
    };
    render() {
        const { articles, isLoading } = this.state;
        if (isLoading) {
            return <h2 className='loading'>Articles on the way!!</h2>;
        }

        return (
            <main className="article-main">
                <h2>Article List </h2>
                <section className='articles-topic-button-group'>
                    <h3>Topics</h3>
                    <button className='articles-topic-button' id='' onClick={this.updateTopic}>Home</button>
                    <button className='articles-topic-button' id="football" onClick={this.updateTopic}>Football</button>
                    <button className='articles-topic-button' id="cooking" onClick={this.updateTopic}>Cooking</button>
                    <button className='articles-topic-button' id='coding' onClick={this.updateTopic}>Coding</button>
                </section>
                <ul className="article-list">
                    <section>
                        <h4>Sort By</h4>
                        <button className='articles-sort-button' id="article_id" onClick={this.updateSortBy}>Date</button>
                        <button className='articles-sort-button' id="votes" onClick={this.updateSortBy}>Votes</button>
                        <button className='articles-sort-button' id="comment_count" onClick={this.updateSortBy}>Comments</button>
                    </section>

                    {articles.map((article) => {

                        return (
                            <ArticleCard key={article.article_id} {...article} />
                        );
                    })}
                </ul>
               
            </main >
        )
    }
}

export default ArticleList;