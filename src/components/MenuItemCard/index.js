import "./index.css";
import "./index.css";
import { Component } from "react";

class MenuItemCard extends Component {
  onclickadtocart = () => {
    const {
    menuItemDetails,
    addToCart,
  } = this.props;

  addToCart(menuItemDetails);
  };

  render() {
    const { menuItemDetails } = this.props;

    const { item_name, description, price, image_url } = menuItemDetails;

    return (
      <div className="itemcontainer">
        <img src={image_url} alt={item_name} className="imageitem" />

        <div className="details">
          <h3>{item_name}</h3>

          <p>{description}</p>

          <p>₹ {price}</p>

          <button className="addcartbutton" onClick={this.onclickadtocart}>
            Add To Cart
          </button>
        </div>
      </div>
    );
  }
}

export default MenuItemCard;
