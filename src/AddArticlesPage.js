import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";

const EMPTY_ARTICLE = { title: null, page: null, type: null, comment: null };
const EMPTY_MAGAZINE = { name: null, issue: null, location: null };

export function AddArticlesPage() {
  const [formValues, setFormValues] = useState({
    article: EMPTY_ARTICLE,
    magazine: EMPTY_MAGAZINE,
  });
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const value = e.target.value;
    setFormValues({ ...formValues, [e.target.name]: value });
  }

  function onSaveButtonClicked() {
    axios({
      method: "POST",
      url: "http://192.168.0.10:8000/article/add",
      data: { ...formValues },
    }).then((response) => {
      console.log(response);
      setMessage("Article created successfully.");
    });
  }

  return (
    <Container fluid>
      {JSON.stringify(formValues)}
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <h2> add a new article </h2>
          {message ? <Alert variant="primary"> {message} </Alert> : null}
          <Form>
            <Form.Group controlId="article[title]">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="article[title]"
                placeholder="Enter title"
                type="text"
                value={formValues.article.title}
              />
            </Form.Group>

            <Form.Group controlId="article.page">
              <Form.Label>Page</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="article.page"
                placeholder="Enter page"
                type="number"
                value={formValues.article.page}
              />
            </Form.Group>

            <Form.Group controlId="article.type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="article.type"
                onChange={handleChange}
                value={formValues.article.type}
              >
                <option id="memo"> memo</option>
                <option id="file"> file</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="article.comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                name="article.comment"
                onChange={handleChange}
                placeholder="Enter comment"
                value={formValues.article.comment}
              />
            </Form.Group>

            <Form.Group controlId="magazine.name">
              <Form.Label>Name of the magazine</Form.Label>
              <Form.Control
                type="text"
                name="magazine.name"
                onChange={handleChange}
                placeholder="Enter the name of the magazine"
                value={formValues.magazine.name}
              />
            </Form.Group>

            <Form.Group controlId="magazine.issue">
              <Form.Label>Issue of the magazine</Form.Label>
              <Form.Control
                type="text"
                name="magazine.issue"
                onChange={handleChange}
                placeholder="Enter the issue of the magazine"
                value={formValues.magazine.issue}
              />
            </Form.Group>

            <Form.Group controlId="magazine.location">
              <Form.Label>Location of the magazine</Form.Label>
              <Form.Control
                type="text"
                name="magazine.location"
                onChange={handleChange}
                placeholder="Enter the location of the magazine"
                value={formValues.magazine.location}
              />
            </Form.Group>

            <Button onClick={onSaveButtonClicked}> Save </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
