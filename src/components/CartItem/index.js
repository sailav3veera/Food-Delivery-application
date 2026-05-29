import { RxCross2 } from "react-icons/rx";
import "./index.css";
import { Component } from "react";
class CartItem extends Component {
  render() {
    const { eachitem } = this.props;

    const { image_url, price, quantity, item_name } = eachitem;

    return (
      <li className="eachitemincart">
        <img src={image_url} alt="item-image" className="imagecart" />
        <h3>{item_name}</h3>
        <p>
          <RxCross2 /> {quantity}
        </p>
        <p>₹ {quantity * price}</p>
      </li>
    );
  }
}
export default CartItem;
