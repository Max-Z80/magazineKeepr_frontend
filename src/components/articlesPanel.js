import React from "react";

export function ArticlesPanel(props) {
  const { articles } = props;
  if (!articles || (articles instanceof Array && articles.length === 0)) {
    return null;
  }

  debugger;
  return articles.map((article) => <p> {article.title}</p>);
}
