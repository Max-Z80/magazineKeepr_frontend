import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

export function ArticlesPanel(props) {
  const { articles } = props;

  if (!articles || (articles instanceof Array && articles.length === 0)) {
    return null;
  }

  const articleRows = articles.map(article => (
    <tr>
      <td>{article.title}</td>
      <td>{article.page}</td>
      <td>{article.type}</td>
      <td>{article.comment}</td>
      <td>{article.magazine.name}</td>
      <td>{article.magazine.issue}</td>
      <td>{article.magazine.location}</td>
      <td>
        <Button onClick={() => props.onEditButtonClicked(article._id)}>
          Edit
        </Button>
      </td>
    </tr>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>page</th>
          <th>type</th>
          <th>comment</th>
          <th>magazine</th>
          <th>issue</th>
          <th>location</th>
        </tr>
      </thead>
      <tbody>{articleRows}</tbody>
    </Table>
  );
}
