import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
const Jumbotron = () => {
  const [index, setIndex] = useState(0);

  const [allFilm, setAllFilm] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageUrl = `http://localhost:5000/images/`;
  const getAllData = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/film?currentPage=1&perPage=3`)
      .then((result) => {
        setAllFilm(result.data.OUT_DATA);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="mt-3">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {allFilm.map((item, idx) => {
          return (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={imageUrl + item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "25rem",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Jumbotron;
