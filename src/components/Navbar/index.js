import { Component } from "react";
import "./index.css";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

class Navbar extends Component {
  state = { redirect: false };

  onclicklogout = () => {
    Cookies.remove("jwt_token");
    this.setState({ redirect: true });
    localStorage.removeItem("password");
  };
  onclickprofie = () => {
    this.setState({ profile: true });
  };
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Navigate to="/login" />;
    }

    return (
      <nav className="navbardesign">
        <div className="logoandtitle">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dnoycfpby/image/upload/v1779339971/ChatGPT_Image_May_21_2026_10_36_01_AM_mjwogc.png"
              alt="navbar-logo"
              className="navbarlogo"
            />
          </Link>
          <Link to="/" className="logolink">
            <h2 className="titleheading">SKfoods</h2>
          </Link>
        </div>

        <div className="buttonsnavbar">
          <Link to="/">
            <button className="profilebutton">
              <IoHome className="profilecion" />
            </button>
          </Link>

          <Link to="/profile">
            <button className="profilebutton">
              <CgProfile className="profilecion" />
            </button>
          </Link>

          <button className="logoutbutton" onClick={this.onclicklogout}>
            Logout
          </button>
          <Link to="/cart">
            <button className="profilebutton">
              <MdOutlineShoppingCartCheckout className="profilecion" />
            </button>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
