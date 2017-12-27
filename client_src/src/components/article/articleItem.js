import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ArticleItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    }
  }

  render() {
    return (
      <li className='collection-item'>
        <Link to={`/articles/${this.state.item.id}`}>{this.state.item.title}</Link>
      </li>
    );
  }
}

export default ArticleItem;