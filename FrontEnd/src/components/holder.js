import React, { Component } from "react";
import Login from "./login.js";
import Signin from "./signin.js";
export default class Holder extends Component {
  constructor() {
    super();
    this.state = { tab: 0, tabstate: "Log In" };
  }
  updatetab = () => {
    if (this.state.tab === 1) this.setState({ tab: 0, tabstate: "Log In" });
    else this.setState({ tab: 1, tabstate: "Sign Up" });
  };

  render() {
    let current;
    if (this.state.tab === 1) current = <Login />;
    else current = <Signin />;
    return (
      <div>
        {current}
        <div >
          or 
          <button  onClick={this.updatetab} className="chngbtn">
            {this.state.tabstate}
          </button>
        </div>
      </div>
    );
  }
}
