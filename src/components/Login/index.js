import { Component } from "react";
import API_URL from "../../config";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    signup: false,
    errorMessage: "",
    agreed: false,
  };
  componentDidMount() {
    document.title = "Login | Skfoods";
  }
  checkboxdetails = (event) => {
    this.setState({ agreed: event.target.checked });
  };
  usernames = (event) => {
    this.setState({ username: event.target.value });
    localStorage.setItem("username", event.target.value);
  };

  passwords = (event) => {
    this.setState({ password: event.target.value });
    localStorage.setItem("password", event.target.value);
  };
  successfullogin = (data) => {
    console.log(data.jwt_token);
    Cookies.set("jwt_token", data.jwt_token, {
      expires: 30,
    });
    this.setState({ redirect: true, errorMessage: "" });
  };

  createaccount = () => {
    this.setState({ signup: true });
  };

  onsubmitlogin = async (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    const url = `${API_URL}/auth/login`;

    const userDetails = { email: username, password: password };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);

      const data = await response.json();

      if (response.ok) {
        this.successfullogin(data);
        window.location.reload();
      } else {
        this.setState({ errorMessage: data.message });
      }
    } catch (error) {
      console.log("Error:", error);
    }
    this.setState({ username: "", password: "" });
  };

  render() {
    const { username, password, redirect, signup, errorMessage, agreed } =
      this.state;
    if (redirect || Cookies.get("jwt_token")) {
      return <Navigate to="/" />;
    }
    if (signup) {
      return <Navigate to="/signup" />;
    }
    return (
      <div className="loginpagecontainer">
        <img
          src="https://res.cloudinary.com/dnoycfpby/image/upload/v1779339971/ChatGPT_Image_May_21_2026_10_36_01_AM_mjwogc.png"
          alt="logo"
          className="logoimage"
        />

        <form onSubmit={this.onsubmitlogin} className="formcard">
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
              type="email"
              placeholder="Enter your Email"
              id="username"
              onChange={this.usernames}
              value={username}
              className="inputs"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type={agreed ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={this.passwords}
              value={password}
              className="inputs"
              required
            />
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="reveal"
              checked={agreed}
              onChange={this.checkboxdetails}
            />

            <label htmlFor="reveal">Show Password</label>
          </div>

          <button type="submit" className="loginbutton">
            Login
          </button>
          <button onClick={this.createaccount} className="createaccountlogin">
            Don't have account? Create one
          </button>
          {errorMessage && <p className="errormessage">{errorMessage}</p>}
        </form>
      </div>
    );
  }
}

export default Login;
