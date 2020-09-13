import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

import { ArticlesPanel } from "./components/articlesPanel";

export function ArticlesPage() {
  const [fetching, setFetching] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFetching(true);
    axios
      .get("http://192.168.0.10:8000/articles")
      .then((articles) => {
        setArticles(articles.data);
        setFetching(false);
      })
      .catch(() => {
        setError("Fetching articles failed");
        setFetching(false);
      });
  }, []);

  if (fetching) {
    return <Alert variant="info"> Loading </Alert>;
  }

  if (error) {
    return <Alert variant="danger"> {error} </Alert>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <h1> Current articles </h1>
          <ArticlesPanel articles={articles} />
        </Col>
      </Row>
    </Container>
  );
}
