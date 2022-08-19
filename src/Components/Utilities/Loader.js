import React from "react";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
  return (
    <Container className="d-flex justify-content-center mt-5 gap-3">
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </Container>
  );
};

export default Loader;
