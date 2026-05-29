import { Component } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { MdOutlineRestaurantMenu } from "react-icons/md";

class Profile extends Component {
  render() {
    const user = localStorage.getItem("username");

    return (
      <div className="profilecontainer">
        <Navbar />
        <h1 className="settingsheading">Settings</h1>
        <div className="optionssection">
          <Link to={`/profile/${user}`} className="linkprofile">
            <div className="profile-details">
              <CgProfile className="profilelogo" />
              <p>Profile Details</p>
            </div>
          </Link>
          <Link to={`/addrestaurants`} className="linkprofile">
            <div className="profile-details">
              <HiMiniBuildingStorefront className="profilelogo" />
              <p>Add your Restaurant</p>
            </div>
          </Link>
          <Link to={`/orders`} className="linkprofile">
            <div className="profile-details">
              <MdOutlineRestaurantMenu className="profilelogo" />
              <p>Orders</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default Profile;
