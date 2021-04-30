import React, { Component } from "react";
import axiosInstance from "../ax";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        username: this.state.username,
        password: this.state.password,
      });
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + response.data.access;
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("Auth_state", 1);
      await axiosInstance.post("/set");
      document.location = "/";
      return response;
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="regestraiton_login_bdy" style={{ width: 300 }}>
        <h1 className="cont">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="cont">
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <div className="sbaseline" id="sbaselineuname"></div>
          </label>
          <label className="cont">
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="sbaseline" id="sbaselinepassword"></div>
          </label>
          <label className="cont center">
            <button type="submit" className="submit">
              Login
            </button>
          </label>
        </form>
      </div>
    );
  }
}
export default Login;
