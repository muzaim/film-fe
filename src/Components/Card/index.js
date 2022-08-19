import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./style.scss";
import { Row } from "react-bootstrap";

const CardImage = (props) => {
  const imageUrl = `http://localhost:5000/images/`;
  const { _id, title, image, detailHandler } = props;
  return (
    <Col className="my-0">
      <Card
        style={{ width: "12rem", height: "21rem", margin: "0.5rem" }}
        className="d-flex justify-content-between pb-3 card-image"
      >
        <Row>
          <Card.Img
            variant="top"
            src={imageUrl + image}
            style={{
              width: "100%",
              height: "15rem",
              objectFit: "fill",
              cursor: "pointer",
            }}
            onClick={() => detailHandler(_id)}
          />
        </Row>
        <Row className="px-4 my-1">
          <Card.Title
            onClick={() => detailHandler(_id)}
            style={{ cursor: "pointer" }}
          >
            <b>{title}</b>
          </Card.Title>
        </Row>
        <Row className="px-4">
          <Button type="button" variant="primary">
            + Watchlist
          </Button>
        </Row>
      </Card>
    </Col>
  );
};

export default CardImage;
