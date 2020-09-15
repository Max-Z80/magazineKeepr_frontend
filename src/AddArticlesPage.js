import React, { useState } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Card,
  Collapse
} from "react-bootstrap";
import axios from "axios";
import NewMagazineForm from "./components/NewMagazineForm";

const EMPTY_ARTICLE = { title: "", page: "", type: "", comment: "" };
const EMPTY_MAGAZINE = { name: "", issue: "", location: "" };

export function AddArticlesPage() {
  const [formValues, setFormValues] = useState({
    article: EMPTY_ARTICLE,
    magazine: EMPTY_MAGAZINE
  });
  const [message, setMessage] = useState(null);
  const [isNewMagazinePanelVisible, setNeWMagazinePanelVisibility] = useState(
    false
  );
  function handleChange(e) {
    const value = e.target.value;
    const split = e.target.name.split(".");
    const obj = split[0];
    const name = split[1];
    setFormValues({
      ...formValues,
      [obj]: { ...formValues[obj], [name]: value }
    });
  }

  function onSaveButtonClicked() {
    axios({
      method: "POST",
      url: "http://localhost:8000/article/add",
      data: { ...formValues }
    }).then(response => {
      console.log(response);
      setMessage("Article created successfully.");
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <p> </p>
          <Card>
            <Card.Header>New article</Card.Header>
            <Card.Body>
              {message ? <Alert variant="primary"> {message} </Alert> : null}
              <Form>
                <Form.Group controlId="article.title">
                  <Form.Control
                    onChange={handleChange}
                    name="article.title"
                    placeholder="Title"
                    type="text"
                    value={formValues.article.title}
                  />
                </Form.Group>

                <Row>
                  <Col xs={6}>
                    <Form.Group controlId="article.page">
                      <Form.Control
                        onChange={handleChange}
                        name="article.page"
                        placeholder="Page"
                        type="number"
                        value={formValues.article.page}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="article.type">
                      <Form.Control
                        as="select"
                        name="article.type"
                        onChange={handleChange}
                        defaultValue="Choose type..."
                        value={formValues.article.type}
                      >
                        <option id="">Choose type...</option>
                        <option id="memo"> memo</option>
                        <option id="file"> file</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="article.comment">
                  <Form.Control
                    as="textarea"
                    name="article.comment"
                    onChange={handleChange}
                    placeholder="Comment"
                    value={formValues.article.comment}
                  />
                </Form.Group>
              </Form>
              <Card.Text> In which magazine ? </Card.Text>
              <Form inline>
                <Col xs={6}>
                  <Form.Group controlId="magazineId">
                    <Form.Control
                      as="select"
                      name="magazine._id"
                      onChange={handleChange}
                      defaultValue="Select a magazine..."
                      value={formValues.article.type}
                    >
                      <option id=""> Select a magazine...</option>
                      <option id="testmagazine"> Test</option>
                    </Form.Control>

                    <Button
                      variant="link"
                      size="sm"
                      onClick={() =>
                        setNeWMagazinePanelVisibility(
                          !isNewMagazinePanelVisible
                        )
                      }
                    >
                      New magazine
                    </Button>
                  </Form.Group>
                </Col>
              </Form>
              <Collapse in={isNewMagazinePanelVisible}>
                <div style={{ margin: 10 }}>
                  <NewMagazineForm />
                </div>
              </Collapse>
              <div style={{ margin: 10 }}>
                <Button onClick={onSaveButtonClicked}> Save </Button>{" "}
                <Button> Cancel </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
