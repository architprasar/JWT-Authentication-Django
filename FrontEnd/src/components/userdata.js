import React, { Component } from "react";
import axiosInstance from "../ax";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.gm = this.gm.bind(this);
    this.logout = this.logout.bind(this);
  }

  async gm() {
    try {
      let response = await axiosInstance.get("/hw");
      const nm = response.data.name;
      this.setState({
        name: nm,
      });
      return nm;
    } catch (error) {
      console.log("User error: ", JSON.stringify(error, null, 4));
      // throw error; todo
    }
  }
  async logout(){
    var c = localStorage.getItem('Auth_state')?localStorage.removeItem('Auth_state'): null
    var m = localStorage.getItem('access_token')?localStorage.removeItem('access_token'): null
    try {
        let response = await axiosInstance.post("/logout",{refresh_token:localStorage.getItem('refresh_token')});
        var m = localStorage.getItem('refresh_token')?localStorage.removeItem('refresh_token'): null
        document.location ='/'
        return response;
      } catch (error) {
        console.log("User error: ", JSON.stringify(error, null, 4));
        
      }
     
     
    
  }
  componentDidMount() {
    this.gm();
  }
  componentDidUpdate() {
    this.gm();
  }
  render() {
    return (
      <div>
        <div className="loggedinas">Hi You are logged in as<div className="user"> {this.state.name}</div></div>
        <div>
          <button className="logout" onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default User;
