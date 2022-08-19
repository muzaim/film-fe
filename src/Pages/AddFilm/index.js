import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Figure from "react-bootstrap/Figure";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AddFilm = () => {
  const navigate = useNavigate();

  const [dataInsert, setDataInsert] = useState({
    title: "",
    image: "",
    director: "",
    cast: "",
    genre: "",
    duration: "",
    synopsis: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setDataInsert({ ...dataInsert, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setDataInsert({ ...dataInsert, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", dataInsert.title);
    formData.append("image", dataInsert.image);
    formData.append("director", dataInsert.director);
    formData.append("cast", dataInsert.cast);
    formData.append("genre", dataInsert.genre);
    formData.append("duration", dataInsert.duration);
    formData.append("synopsis", dataInsert.synopsis);

    Axios.post(`${process.env.REACT_APP_BASEURL}/film`, formData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  };

  const addfilm = () => {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <Form
            className="my-4 col-md-5"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                id="title"
                placeholder="Enter title"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              {imagePreview && (
                <Figure>
                  <Figure.Image width={171} height={180} src={imagePreview} />
                </Figure>
              )}
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                id="image"
                onChange={handleImage}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                name="director"
                id="director"
                placeholder="Enter Director"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cast</Form.Label>
              <Form.Control
                type="text"
                name="cast"
                id="cast"
                placeholder="Enter Cast"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                id="genre"
                placeholder="Enter Genre"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                id="duration"
                placeholder="Enter Duration"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Synopsis</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="synopsis"
                id="synopsis"
                placeholder="Enter Synopsis"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </React.Fragment>
    );
  };
  if (localStorage.getItem("token")) {
    return <>{addfilm()}</>;
  } else {
    return Navigate("/");
  }
};

export default AddFilm;
