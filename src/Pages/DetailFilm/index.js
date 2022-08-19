import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import DemonSlayerJpg from "../../Images/demon.jpg";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FeaturedToday, Loader, RelatedMovie } from "../../Components";

const DetailFilm = () => {
  const params = useParams();
  const [film, setFilm] = useState([]);
  const [loader, setLoader] = useState(false);
  const imageUrl = `http://localhost:5000/images/`;

  const getFilm = () => {
    const { id } = params;
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/film/${id}`)
      .then((result) => {
        setFilm(result.data.OUT_DATA);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getFilm();
  }, []);

  const { title, image, director, cast, genre, duration, synopsis } = film;

  if (loader) return <Loader />;
  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row>
          <Col sm={4} className="d-flex justify-content-center">
            <Image src={imageUrl + image} width={350}></Image>
          </Col>
          <Col>
            <h1>{title}</h1>
            <div className="d-flex flex-row gap-2">
              {genre
                ? genre.map((item, idx) => {
                    return (
                      <Badge bg="info" key={idx}>
                        {item}
                      </Badge>
                    );
                  })
                : null}
            </div>
            <p style={{ textTransform: "capitalize" }}>Director : {director}</p>
            <p>
              Cast:{" "}
              {cast
                ? cast.map((item, idx) => {
                    return (
                      <text style={{ textTransform: "capitalize" }}>
                        {item},{" "}
                      </text>
                    );
                  })
                : null}
            </p>

            <p>Duration : {duration}</p>
            <p>
              Synopsis:
              <br />
              {synopsis}
            </p>
          </Col>
        </Row>
        <div className="my-5">
          <RelatedMovie />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default DetailFilm;
