import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class ArticleAdd extends Component {

  addArticle(newArticle) {
    // console.log(newArticle);
    axios.post('http://localhost:3000/api/articles', newArticle)
         .then(res => {
           this.state.history.push('/');
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
    this.addArticle(article);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">Back</Link>

        <h1>Add Article</h1>

        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="title" ref="title" value={'Article'} />
            <label htmlFor="title">Title</label>
          </div>

          <div className="input-field">
            <textarea name="content" ref="content" value={'This is my article.'}></textarea>
            <label htmlFor="content">Content</label>
          </div>

          <div className="input-field">
            <input type="text" name="author" ref="author" value={'admin'} />
            <label htmlFor="author">Author</label>
          </div>

          <div className="input-field">
            <input type="text" name="created_at" ref="created_at" value={new Date().toLocaleDateString()} />
            <label htmlFor="created_at">Create At</label>
          </div>

          <div className="input-field">
            <input type="text" name="is_deleted" ref="is_deleted" value={false} />
            <label htmlFor="is_deleted">Is Deleted</label>
          </div>

          <input type="submit" className="btn" value="Save"/>
        </form>
      </div>
    );
  }
}

export default ArticleAdd;