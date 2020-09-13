import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ArticlesPage } from "./ArticlesPage";
import { AddArticlesPage } from "./AddArticlesPage";
import Menu from "./Menu";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add">
          <Menu activeKey={2} />
          <AddArticlesPage />
        </Route>

        <Route path="/">
          <Menu activeKey={1} />
          <ArticlesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
