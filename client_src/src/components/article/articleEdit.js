import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

class ArticleEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      author: '',
      created_at: '',
      is_deleted: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getArticleDetail() {
    let articleId = this.props.match.params.id;
    console.log(articleId);
    axios.get(`http://localhost:3000/api/articles/${articleId}`)
         .then(res => {
           this.setState({
             id: res.data.id,
             title: res.data.title,
             content: res.data.content,
             author: res.data.author,
             created_at: res.data.created_at,
             is_deleted: res.data.is_deleted
           })
         }).catch(err => console.log(err));
  }

  componentWillMount() {
    this.getArticleDetail();
  }

  editArticle(newArticle) {
    axios.put(`http://localhost:3000/api/articles/${this.state.id}`, newArticle)
         .then(res => {
           this.props.history.push('/');
         }).catch(err => console.log(err));
  }

  onSubmit(e) {
    const article = {
      title: this.refs.title.value,
      content: this.refs.content.value,
      author: this.refs.author.value,
      created_at: this.refs.created_at.value,
      is_deleted: this.refs.is_deleted.value
    }
    this.editArticle(article);
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const inputName = target.name;

    this.setState({
      [inputName]: value
    });
  }

  render() {
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">Back</Link>

        <h1>Edit Article</h1>

        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="title" ref="title" value={this.state.title} onChange={this.handleInputChange}/>
            <label htmlFor="title">Title</label>
          </div>

          <div className="input-field">
            <textarea name="content" ref="content" value={this.state.content} onChange={this.handleInputChange}></textarea>
            <label htmlFor="content">Content</label>
          </div>

          <div className="input-field">
            <input type="text" name="author" ref="author" value={this.state.author} onChange={this.handleInputChange} />
            <label htmlFor="author">Author</label>
          </div>

          <div className="input-field">
            <input type="text" name="created_at" ref="created_at" value={this.state.created_at} onChange={this.handleInputChange} />
            <label htmlFor="created_at">Create At</label>
          </div>

          <div className="input-field">
            <input type="text" name="is_deleted" ref="is_deleted" value={this.state.is_deleted} />
            <label htmlFor="is_deleted">Is Deleted</label>
          </div>

          <input type="submit" className="btn" value="Save" />
        </form>
      </div>
    );
  }
}

export default ArticleEdit;