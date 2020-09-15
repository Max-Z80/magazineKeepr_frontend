import React from "react";
import { Form, Col } from "react-bootstrap";

export default function NewMagazineForm(props) {
  return (
    <Form>
      <Form.Row>
        <Col xs={12} md={3}>
          <Form.Group controlId="magazine.name">
            <Form.Control
              type="text"
              name="magazine.name"
              // onChange={handleChange}
              placeholder="Name"
              //value={formValues.magazine.name}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group controlId="magazine.issue">
            <Form.Control
              type="text"
              name="magazine.issue"
              //onChange={handleChange}
              placeholder="Issue"
              //value={formValues.magazine.issue}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="magazine.location">
            <Form.Control
              type="text"
              name="magazine.location"
              //onChange={handleChange}
              placeholder="Location"
              //value={formValues.magazine.location}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}
