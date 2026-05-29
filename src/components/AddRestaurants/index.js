import { Component } from "react";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

class AddRestaurants extends Component {
  state = {
    name: "",
    address: "",
    phone: "",
    image_url: "",
    messagestatus: false,
    message: "",
  };

  suceefulladd = (message) => {
    this.setState({ message: message });
  };

  onsubmitaddresform = async (event) => {
    const { phone, image_url, name, address } = this.state;
    event.preventDefault();
    const restaurantDetails = {
      name,
      address,
      phone,
      image_url,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantDetails),
    };
    const urladdres = "http://localhost:5000/restaurants";
    const responseadd = await fetch(urladdres, options);
    const dataaddres = await responseadd.json();
    console.log(dataaddres);
    if (responseadd.ok) {
      this.setState((prevState) => ({
        messagestatus: !prevState.messagestatus,
      }));
      this.suceefulladd(dataaddres.message);
    }
  };

  onchangeaddresturatname = (event) => {
    this.setState({ name: event.target.value });
  };
  onchangeaddress = (event) => {
    this.setState({ address: event.target.value });
  };

  onchangephonenumber = (event) => {
    this.setState({ phone: event.target.value });
  };

  onchangeimageurl = (event) => {
    this.setState({ image_url: event.target.value });
  };

  render() {
    const { phone, image_url, name, address, messagestatus, message } =
      this.state;
    return (
      <div className="addrescontainer">
        <form className="formcontainer" onSubmit={this.onsubmitaddresform}>
          <h1>Restaurant Details</h1>
          <hr className="hrlinep" />
          <div className="addresdiv">
            <label htmlFor="restaurantname">Restaurant name : </label>
            <input
              type="text"
              placeholder="Restaurant Name"
              id="restaurantname"
              onChange={this.onchangeaddresturatname}
              value={name}
              required
            />
          </div>
          <div className="addresdiv">
            <label htmlFor="address">Address : </label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              onChange={this.onchangeaddress}
              value={address}
              required
            />
          </div>
          <div className="addresdiv">
            <label htmlFor="phno">Phone Number : </label>
            <input
              type="text"
              placeholder="Phone Number"
              id="phno"
              onChange={this.onchangephonenumber}
              value={phone}
              required
            />
          </div>
          <div className="addresdiv">
            <label htmlFor="imageurl">Image URL : </label>
            <input
              type="text"
              placeholder="Image Url"
              id="imageurl"
              value={image_url}
              onChange={this.onchangeimageurl}
              required
            />
          </div>
          <button type="submit" className="buttonprofile">
            Submit
          </button>
          {messagestatus && <p className="successfulmessage">{message}</p>}
          <Link to="/profile">
            <button className="buttonprofile">
              <FaArrowLeft /> Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default AddRestaurants;
