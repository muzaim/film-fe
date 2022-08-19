import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const Navigate = useNavigate();
  const [dataReg, setDataReg] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setDataReg({ ...dataReg, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", dataReg.email);
    formData.append("password", dataReg.password);
    Axios.post(`${process.env.REACT_APP_BASEURL}/user/register`, formData)
      .then(() => {
        Navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-5">
        <Form className="col-md-4" onSubmit={submitHandler}>
          <h3 className="text-center mb-4">Register Form</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={changeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Register;
