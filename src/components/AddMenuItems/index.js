import { Component } from "react";
import "./index.css";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import API_URL from "../../config";

class AddMenuItems extends Component {
  state = {
    restids: null,
    itemName: "",
    description: "",
    price: "",
    imgUrl: "",
  };
  componentDidMount() {
    const { restid } = this.props.params;
    this.setState({ restids: restid });
    document.title = "Add Menu Items | Skfoods";
  }

  onchangeitemname = (event) => {
    this.setState({ itemName: event.target.value });
  };

  onchangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  onchangeprice = (event) => {
    this.setState({ price: event.target.value });
  };
  onchangeimgUrl = (event) => {
    this.setState({ imgUrl: event.target.value });
  };
  onsubmitformadditems = async (event) => {
    const { restids, itemName, description, price, imgUrl } = this.state;
    event.preventDefault();
    const itemDetails = {
      restaurant_id: restids,
      item_name: itemName,
      description,
      price,
      image_url: imgUrl,
    };
    const additemOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemDetails),
    };
    const urladditem = `${API_URL}/menu-items`;
    const additemresponse = await fetch(urladditem, additemOptions);
    const additemdata = await additemresponse.json();

    if (additemresponse.ok) {
      console.log(additemdata);
    } else {
      console.log(additemdata);
    }
  };

  render() {
    const { restids, itemName, description, price, imgUrl } = this.state;
    return (
      <div className="add-items-container">
        <form className="formadditems" onSubmit={this.onsubmitformadditems}>
          <h1>Add Menu Items</h1>
          <hr className="hrlinep" />
          <div className="inputcontainers">
            <h3>Restaurant ID : </h3>
            <p>{restids}</p>
          </div>
          <div className="inputcontainers">
            <label htmlFor="itemname">Item Name : </label>
            <input
              type="text"
              placeholder="Item Name"
              onChange={this.onchangeitemname}
              id="itemname"
              value={itemName}
              required
            />
          </div>
          <div className="inputcontainers">
            <label htmlFor="description">Description : </label>
            <input
              type="text"
              placeholder="Description"
              onChange={this.onchangeDescription}
              id="description"
              value={description}
              required
            />
          </div>
          <div className="inputcontainers">
            <label htmlFor="price">Price : </label>
            <input
              type="text"
              placeholder="Price"
              onChange={this.onchangeprice}
              id="price"
              value={price}
              required
            />
          </div>
          <div className="inputcontainers">
            <label htmlFor="imgUrl">Image Url : </label>
            <input
              type="text"
              placeholder="Image Url"
              onChange={this.onchangeimgUrl}
              id="imgUrl"
              value={imgUrl}
              required
            />
          </div>
          <div className="buttonssubmit">
            <button type="submit" className="submitbuttons">
              Submit
            </button>
            <Link to="/">
              <button type="button" className="homebuttons">
                <FaHome />
                Home
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default AddMenuItems;
