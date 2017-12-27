import React from "react";
import { Switch, Route } from "react-router-dom";
import Articles from "./article/articles";
import ArticleDetail from "./article/articleDetail";
import ArticleAdd from "./article/articleAdd";
import ArticleEdit from "./article/articleEdit";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/articles/add" component={ArticleAdd} />
      <Route exact path="/articles/:id" component={ArticleDetail} />
      <Route exact path="/articles/edit/:id" component={ArticleEdit} />
    </Switch>
  </main>
)

export default Main;