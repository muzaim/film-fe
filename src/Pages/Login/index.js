import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [token, setToken] = useState("");
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", dataLogin.email);
    formData.append("password", dataLogin.password);

    Axios.post(`${process.env.REACT_APP_BASEURL}/user/login`, formData)
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("token", result.data.OUT_TOKEN);
        setToken(result.data.OUT_TOKEN);
        if (result.data.OUT_TOKEN) {
          Navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const isLogin = () => {
    const token = localStorage.getItem("token");
    if (token) return Navigate("/");
  };
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-5">
        <Form className="col-md-4" onSubmit={submitHandler}>
          <h3 className="text-center mb-4">Login Form</h3>
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Text className="text-muted">
              Not registered yet ? <a href="/register">Click here</a>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Login;
