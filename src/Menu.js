import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Menu(props) {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/"> MagazineKeepr</Navbar.Brand>
      <Nav activeKey={props.activeKey}>
        <Nav.Link eventKey={1} href="/">
          {" "}
          Home
        </Nav.Link>
        <Nav.Link eventKey={2} href="/add">
          {" "}
          New article
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
