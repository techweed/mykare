import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./home.scss";

const Logout = ({navigate}) => (
  <button
    className="float-btn"
    onClick={() => {
      navigate("/");
      localStorage.clear();
    }}
  >
    logout
  </button>
);

const Home = () => {
  const location = useLocation();
  let navigate = useNavigate();
  if (location?.state?.username !== "admin")
    return (
      <div className="home-page">
        Hello {location?.state?.username} <Logout navigate={navigate} />
      </div>
    );
  else {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    return (
      <div class="panel panel-default">
        <Logout navigate={navigate} />
        <div class="panel-heading">
          <h1>Admin Portal</h1>
        </div>
        <div class="panel-body">
          <table class="table-latitude">
            <thead>
              <th>ID</th>
              <th>Name</th>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr>
                  <th>{index}</th>
                  <td> {item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
export default Home;
