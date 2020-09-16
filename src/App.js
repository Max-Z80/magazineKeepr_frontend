import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { ArticlesPage } from "./ArticlesPage";
import { NewOrEditArticlePage } from "./NewOrEditArticlePage";
import Menu from "./Menu";
import { LIST_VIEW, ADD_VIEW, EDIT_VIEW } from "./constants";

function App() {
  const [view, setView] = useState(LIST_VIEW);
  const [message, setMessage] = useState(null);
  const [editedArticleId, setEditedArticleId] = useState(null);

  function onMenuClicked(view) {
    setMessage(null);
    setEditedArticleId(null);
    setView(view);
  }

  if (view === ADD_VIEW || view === EDIT_VIEW) {
    return (
      <React.Fragment>
        <Menu
          activeKey={view === ADD_VIEW ? 2 : null}
          onClick={onMenuClicked}
        />
        ;{message ? <Alert variant="primary"> {message} </Alert> : null}
        <NewOrEditArticlePage
          articleId={editedArticleId ? editedArticleId : undefined}
          setView={view => setView(view)}
          setMessage={message => setMessage(message)}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Menu activeKey={1} onClick={onMenuClicked} />;
      {message ? <Alert variant="primary"> {message} </Alert> : null}
      <ArticlesPage
        setMessage={message => setMessage(message)}
        onEditButtonClicked={articleId => {
          setView(EDIT_VIEW);
          setEditedArticleId(articleId);
        }}
      />
      ;
    </React.Fragment>
  );
}

export default App;
