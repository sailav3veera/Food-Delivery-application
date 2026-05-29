import { Component } from "react";
import "./index.css";
import API_URL from "../../config";

import { Navigate } from "react-router-dom";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    newPassword: "",
    role: "",
    Login: false,
    message: "",
  };

  gotologin = () => {
    this.setState({ login: true });
  };
  namedetails = (event) => {
    this.setState({ name: event.target.value });
  };
  emaildetails = (event) => {
    this.setState({ email: event.target.value });
  };
  passworddetails = (event) => {
    this.setState({ newPassword: event.target.value });
  };
  roledetails = (event) => {
    this.setState({ role: event.target.value });
  };
  onsubmitsignup = async (event) => {
    const { name, email, newPassword, role } = this.state;

    event.preventDefault();
    const urlsignup = `${API_URL}/users`;
    const userdata = {
      name: name,
      email: email,
      password: newPassword,
      role: role,
    };
    const optionss = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    };

    try {
      const responses = await fetch(urlsignup, optionss);

      const datas = await responses.json();

      if (responses.ok) {
        alert(datas.message);
      } else {
        console.log("Signup failed:", datas.message);
        alert(datas.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  render() {
    const { name, email, newPassword, role, login } = this.state;
    if (login) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="loginpagecontainer">
        <img
          src="https://res.cloudinary.com/dnoycfpby/image/upload/v1779339971/ChatGPT_Image_May_21_2026_10_36_01_AM_mjwogc.png"
          alt="logo"
          className="logoimage"
        />

        <form onSubmit={this.onsubmitsignup} className="formcardsignup">
          <div className="input-container">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              id="name"
              onChange={this.namedetails}
              value={name}
              className="inputs"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email Id:</label>
            <input
              type="email"
              placeholder="Enter your Email"
              id="email"
              onChange={this.emaildetails}
              value={email}
              className="inputs"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="newpassword">Password:</label>
            <input
              type="text"
              placeholder="Password"
              id="newpassword"
              onChange={this.passworddetails}
              value={newPassword}
              className="inputs"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              placeholder="User or Guest"
              id="role"
              onChange={this.roledetails}
              value={role}
              className="inputs"
              required
            />
          </div>

          <button type="submit" className="loginbutton">
            Sign up
          </button>
          <button onClick={this.gotologin} className="createaccountlogin">
            Go back to login page !
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
