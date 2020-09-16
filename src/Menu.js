import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LIST_VIEW, ADD_VIEW } from "./constants";

export default function Menu(props) {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/"> MagazineKeepr</Navbar.Brand>
      <Nav activeKey={props.activeKey}>
        <Nav.Link eventKey={1} onClick={() => props.onClick(LIST_VIEW)}>
          Home
        </Nav.Link>
        <Nav.Link eventKey={2} onClick={() => props.onClick(ADD_VIEW)}>
          New article
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
