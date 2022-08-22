import React from "react";
import { CardImage, Loader } from "../../Components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import axios from "axios";

const FeaturedToday = () => {
  const navigate = useNavigate();

  const [allFilm, setAllFilm] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/film`)
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

  const detailHandler = (_id) => {
    navigate(`/detail/${_id}`);
  };

  useEffect(() => {
    getAllData();
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <Row className="mt-3">
        <b style={{ fontSize: "2rem", color: "#F5C518" }}>Featured Today</b>
        <p className="text-secondary">TV shows and movies just for you</p>
      </Row>

      <div className="d-flex flex-row flex-nowrap overflow-auto">
        {allFilm.map((film) => {
          return (
            <CardImage {...film} detailHandler={detailHandler} key={film._id} />
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedToday;
