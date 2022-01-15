import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [cred, setCred] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(true);
  const users = JSON.parse(localStorage.getItem("users")) || [];
  let navigate = useNavigate();

  const onLogin = () => {
    if (cred.username && cred.password) {
      let res = checkIfUserExist(cred.username);
      if (
        (res && res?.password === cred.password) ||
        (cred.username === "admin" && cred.password === "admin")
      ) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home", {
          state: {
            username: cred.username,
          },
        });
      } else {
        alert("Invalid credentials");
      }
    }
    setCred({username: "", password: ""});
  };
  const onRegister = () => {
    if (cred.username !== "admin") {
      if (cred.password === cred.confirmPassword) {
        if (checkIfUserExist(cred.username)) {
          alert("Username already registered");
        } else {
          users.push({username: cred.username, password: cred.password});
          localStorage.setItem("users", JSON.stringify(users));
          setIsAlreadyRegistered(true);
        }
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Cannot use that name");
    }
    setCred({username: "", password: "", confirmPassword: ""});
  };
  const checkIfUserExist = (username) => {
    return users.find((item) => item.username === username);
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
      case "confirm-password": {
        tempCred.confirmPassword = value;
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
        <Form autoComplete="off">
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
            disabled={!(cred.username && cred.password)}
            onClick={() => {
              isAlreadyRegistered ? onLogin() : onRegister();
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
