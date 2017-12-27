import React, {Component} from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render(){
    return (
      <nav className="blue darken-3">
        <div className="nav-wrapper">
          <a className="brand-logo">Articles</a>
          <a data-activates="main-menu" className="button-collapse show-on-large">
            <i className="fa fa-bars"></i>
          </a>
          <ul className="right hide-on-small-only">
            <li>
              <Link to="/">
                <i className="fa fa-book"></i> Articles
              </Link>
            </li>
          </ul>
          <ul className="side-nav" id="main-menu">
            <li>
              <Link to="/">
                <i className="fa fa-book"></i> Articles
              </Link>
            </li>
            <li>
              <Link to="/articles/add">
                <i className="fa fa-plus"></i> Add Article
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;