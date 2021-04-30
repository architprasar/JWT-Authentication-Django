import React, { Component } from "react";
import axiosInstance from "../ax";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name:"",
      last_name:"",
      Phone_number:"",
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async login() {
    const resp2 = await axiosInstance.post("/login", {
      username: this.state.username,
      password: this.state.password,
    });
    axiosInstance.defaults.headers["Authorization"] =
      "JWT " + resp2.data.access;
    localStorage.setItem("access_token", resp2.data.access);
    localStorage.setItem("refresh_token", resp2.data.refresh);
    localStorage.setItem("Auth_state", 1);
    await axiosInstance.post("/set");
    document.location = "/";
    return resp2;
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        Phone_number:this.state.Phone_number
      });
      this.login();
      return response;
    } catch (error) {
      console.log(error.stack);
      this.setState({
        errors: error.response.data,
      });
    }
  }

  render() {
    return (
      <div className="regestraiton_login_bdy" style={{ width: 300 }}>
        <h1 className="cont">Sign Up </h1>
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
            {this.state.errors.username ? this.state.errors.username : null}
          </label>
          <label className="cont">
            First Name:
            <input
              name="first_name"
              type="text"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
             <div className="sbaseline" id="sbaselineuname"></div>
            {this.state.errors.first_name ? this.state.errors.first_name : null}
          </label><label className="cont">
            Last Name:
            <input
              name="last_name"
              type="text"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
             <div className="sbaseline" id="sbaselineuname"></div>
            {this.state.errors.last_name ? this.state.errors.last_name : null}
          </label>
          <label className="cont">
            Phone Number:
            <input
              name="Phone_number"
              type="trl"
              value={this.state.Phone_number}
              onChange={this.handleChange}
            />
             <div className="sbaseline" id="sbaselineuname"></div>
            {this.state.errors.Phone_number ? this.state.errors.Phone_number : null}
          </label>
          <label className="cont">
            Email:
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
             <div className="sbaseline" id="sbaselineuname"></div>
            {this.state.errors.email ? this.state.errors.email : null}
          </label>
          <label className="cont">
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
             <div className="sbaseline" id="sbaselineuname"></div>
            {this.state.errors.password ? this.state.errors.password : null}
          </label>
          <label className="cont center">
            <button type="submit" className="submit" >Sign Up</button>
          </label>
        </form>
      </div>
    );
  }
}

export default Signup;
