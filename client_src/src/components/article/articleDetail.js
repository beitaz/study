import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class ArticleDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detail: ''
    }
  }

  getArticle() {
    let articleId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/articles/${articleId}`)
         .then(res => {
            this.setState({ detail: res.data })
         }).catch(err => console.log(err));
  }

  componentWillMount() {
    this.getArticle();
  }

  onDelete(e) {
    let articleId = this.state.detail.id;
    axios.delete(`http://localhost:3000/api/articles/${articleId}`)
         .then(res => {
           this.props.history.push('/');
         }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">Back</Link>

        <h1>{this.state.detail.title}</h1>
        
        <ul className="collection">
          <li className="collection-item">Content: {this.state.detail.content}</li>
          <li className="collection-item">Author: {this.state.detail.author}</li>
        </ul>
        <Link className="btn" to={`/articles/edit/${this.state.detail.id}`}>Edit</Link>
        <button onClick={this.onDelete.bind(this)} className="btn right red">Delete</button>
      </div>
    );
  }
}

export default ArticleDetail;