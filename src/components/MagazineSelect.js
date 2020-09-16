import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

export default function MagazineSelect(props) {
  const [isLoading, setLoadingState] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (props.magazine) {
      const option = {
        value: props.magazine._id,
        label: props.magazine.name + "; " + props.magazine.issue
      };
      setOptions([option]);
      setValue(option);
    }
  }, [props.magazine]);

  /**
   * Function triggered when the user clicks to open the menu
   */
  async function onMenuOpen() {
    setLoadingState(true);
    const response = await axios.get("http://localhost:8000/magazine/list");
    const magazines = response.data;
    const options = magazines.map(magazine => {
      return {
        value: magazine._id,
        label: magazine.name + "; " + magazine.issue,
        magazineName: magazine.name,
        magazineIssue: magazine.issue
      };
    });
    setLoadingState(false);
    setOptions(options);
  }

  function onChange(option, action) {
    props.onChange({
      _id: option.value,
      name: option.magazineName,
      issue: option.magazineIssue
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={6}>
          <Select
            value={value}
            options={options}
            onMenuOpen={onMenuOpen}
            onChange={onChange}
            isLoading={isLoading}
            maxMenuHeight={200}
          />
          {props.showsInvalidMessage ? (
            <p className="text-danger"> Please select something </p>
          ) : null}
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            size="sm"
            style={{ marginTop: 4 }}
            onClick={props.onLinkClicked}
          >
            New magazine
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
