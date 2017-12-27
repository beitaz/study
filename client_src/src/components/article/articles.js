import React, {Component} from "react";
import axios from "axios";
import ArticleItem from "./articleItem";

class Articles extends Component {

  constructor(){
    super();
    this.state = {
      articles: []
    }
  }

  getArticles() {
    axios.get('http://localhost:3000/api/articles')
         .then(res => {
          //  console.log(res.data);
          this.setState({ articles: res.data });
         }).catch(err => console.log(err));
  }

  componentWillMount() {
    this.getArticles();
  }

  render(){
    const articleItems = this.state.articles.map((article, index) => {
      return (
        <ArticleItem item={article} key={article.id} />
      )
    })
    return(
      <div>
        <h1>Articles</h1>
        <ul className="collection">
          {articleItems}
        </ul>
      </div>
    )
  }
}

export default Articles;