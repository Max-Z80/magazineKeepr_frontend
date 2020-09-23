import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Collapse
} from "react-bootstrap";
import axios from "axios";
import NewMagazineForm from "./components/NewMagazineForm";
import MagazineSelect from "./components/MagazineSelect";
import { LIST_VIEW } from "./constants";

const EMPTY_ARTICLE = {
  title: "",
  page: "",
  type: "",
  comment: ""
};

export function NewOrEditArticlePage(props) {
  const { articleId } = props;
  const [article, setArticle] = useState(EMPTY_ARTICLE);
  const [magazine, setMagazine] = useState(null);
  const [isMagazineFomVisible, setMagazineFormVisibility] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isMagazineSelectInvalid, setMagazineSelectValidity] = useState(false);

  let titleInput = null; //
  useEffect(() => {
    axios
      .get(`http://localhost:8000/article/${articleId}/get`)
      .then(response => response.data)
      .then(article => {
        setArticle(article);
        setMagazine(article.magazine);
      });
  }, [articleId]);


  /**
   * Function triggered when the user clicks on the save button to create a magazine
   * @param {object} magazine magazine which has been created
   */
  function onMagazineSaveButtonClicked(magazine) {
    setMagazineFormVisibility(false);
    setMagazine(magazine);
  }

  function onSubmit(event) {
    const form = event.currentTarget.form;
    event.preventDefault();
    event.stopPropagation();
    titleInput.focus();

    if (form.checkValidity() === false || !magazine) {
      setValidated(true);
      !magazine && setMagazineSelectValidity(true);
      return;
    }

    if (props.articleId) {
      updateArticle().then(() => props.setView(LIST_VIEW));
      return;
    }

    saveArticle().then(() => {
      if (event.willStayOnPage) {
        setArticle(EMPTY_ARTICLE);
        setValidated(false);
        setMagazineSelectValidity(false);
      } else {
        props.setView(LIST_VIEW);
      }
    });
  }

  function saveArticle() {
    return axios({
      method: "POST",
      url: `http://localhost:8000/magazine/${magazine._id}/article/add`,
      data: { article, magazine }
    }).then(() => props.setMessage("Article created successfully."));
  }

  function updateArticle() {
    article.magazine = magazine._id;
    return axios({
      method: "PUT",
      url: `http://localhost:8000/article/${article._id}/update`,
      data: { article }
    }).then(() => props.setMessage("Article updated successfully."));
  }

  function handleArticleChange(e) {
    const fieldName = e.target.name;
    let newArticle = { ...article, [fieldName]: e.target.value };
    setArticle(newArticle);
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <p> </p>
          <Card>
            <Card.Header>
              {" "}
              {props.articleId ? "Edit Article" : "New article"}{" "}
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group controlId="title">
                  <Form.Control
                    onChange={handleArticleChange}
                    name="title"
                    placeholder="Title"
                    type="text"
                    ref={(input) =>  titleInput = input }
                    required
                    value={article.title}
                  />
                </Form.Group>

                <Row>
                  <Col xs={6}>
                    <Form.Group controlId="page">
                      <Form.Control
                        onChange={handleArticleChange}
                        name="page"
                        placeholder="Page"
                        type="number"
                        min={0}
                        required
                        value={article.page}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="type">
                      <Form.Control
                        as="select"
                        name="type"
                        onChange={handleArticleChange}
                        required
                        value={article.type}
                      >
                        <option value="">Choose type...</option>
                        <option value="memo">Memo</option>
                        <option value="file">Dossier</option>
                        <option value="recipe">Recette</option>
                        <option value="interview">Interview</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="comment">
                  <Form.Control
                    as="textarea"
                    name="comment"
                    onChange={handleArticleChange}
                    placeholder="Comment"
                    value={article.comment}
                  />
                </Form.Group>

                <Card.Text> In which magazine ? </Card.Text>
                <MagazineSelect
                  onChange={magazine => setMagazine(magazine)}
                  onLinkClicked={() =>
                    setMagazineFormVisibility(!isMagazineFomVisible)
                  }
                  magazine={magazine}
                  showsInvalidMessage={isMagazineSelectInvalid}
                />
                <Collapse in={isMagazineFomVisible}>
                  <div style={{ margin: 10 }}>
                    <NewMagazineForm
                      onSaveButtonClicked={onMagazineSaveButtonClicked}
                    />
                  </div>
                </Collapse>

                <div style={{ margin: 10 }}>
                  <Button
                    onClick={e => {
                      e.willStayOnPage = false;
                      onSubmit(e);
                    }}
                  >
                    Save
                  </Button>{" "}
                  <Button
                    onClick={e => {
                      e.willStayOnPage = true;
                      onSubmit(e);
                    }}
                  >
                    Save & add new article again
                  </Button>{" "}
                  <Button onClick={() => props.setView(LIST_VIEW)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
