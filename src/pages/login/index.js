import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import "./login.scss";

const Login = () => {
  const [cred, setCred] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(true);

  const onLogin = (cred) => {
    console.log(cred);
  };
  const onInputChanged = (e) => {
    const {name, value} = e.target;
    let tempCred = cred;
    switch (name) {
      case "username": {
        tempCred.username = value;
        break;
      }
      case "password": {
        tempCred.password = value;
        break;
      }
      default: {
        break;
      }
    }
    setCred({...tempCred});
  };
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <Form>
          <Form.Control
            className="mb-3"
            placeholder="Username"
            name="username"
            value={cred?.username}
            onChange={(e) => {
              onInputChanged(e);
            }}
          />
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Password"
            name="password"
            value={cred?.password}
            onChange={(e) => {
              onInputChanged(e);
            }}
          />
          {!isAlreadyRegistered && (
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              value={cred?.confirmPassword}
              onChange={(e) => {
                onInputChanged(e);
              }}
            />
          )}
          <Button
            className="w-100"
            variant="primary"
            onClick={() => {
              onLogin(cred);
            }}
          >
            {isAlreadyRegistered ? "Login" : "Register"}
          </Button>
          <p
            className="text-right"
            onClick={() => setIsAlreadyRegistered(!isAlreadyRegistered)}
          >
            {isAlreadyRegistered
              ? "Don't have an account? Register here"
              : "Already registered log in?"}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
