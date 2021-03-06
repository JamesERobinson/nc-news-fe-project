import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import { Router } from '@reach/router';
import Article from './components/Article';
import ErrorMessage from './components/ErrorMessage';
function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <h1>In the App</h1>
      <Router>
        <ArticleList path='/' />
        <Article path='/article/:article_id' />
        <ErrorMessage default errorMessage= "Page not found!"/>
      </Router>

    </div>
  );
}

export default App;
