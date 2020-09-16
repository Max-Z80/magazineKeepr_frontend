import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

export default function NewMagazineForm(props) {
  const [validated, setValidated] = useState(false);

  function saveMagazine(magazine) {
    return axios({
      method: "POST",
      url: "http://localhost:8000/magazine/add",
      data: { magazine }
    }).then(response => response.data);
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // form is valid
    const magazine = {
      name: form.elements["name"].value,
      issue: form.elements["issue"].value,
      location: form.elements["location"].value
    };
    debugger;

    saveMagazine(magazine).then(magazine => {
      props.onSaveButtonClicked(magazine);
    });
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Col xs={12} md={2}>
          <Form.Group controlId="name">
            <Form.Control type="text" required name="name" placeholder="Name" />
          </Form.Group>
        </Col>

        <Col xs={12} md={2}>
          <Form.Group controlId="issue">
            <Form.Control
              type="text"
              required
              name="issue"
              placeholder="Issue"
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="location">
            <Form.Control
              type="text"
              required
              name="location"
              placeholder="Location"
            />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button type="submit">ok</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
