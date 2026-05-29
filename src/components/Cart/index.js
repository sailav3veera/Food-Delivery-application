import { Component } from "react";
import CartItem from "../CartItem";
import "./index.css";
import Navbar from "../Navbar";
import API_URL from "../../config";

class Cart extends Component {
  state = { user_id: "" };

  getuserdatas = async () => {
    const useremail = localStorage.getItem("username");
    const responseuser = await fetch(`${API_URL}/profile/${useremail}`);
    const datauser = await responseuser.json();
    const userid = datauser[0].id;

    this.setState({ user_id: userid });
  };
  componentDidMount() {
    this.getuserdatas();
    document.title = "Cart | Skfoods";
  }

  placeOrder = async () => {
    const { cartItems } = this.props;
    const { user_id } = this.state;

    const total_amount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const orderData = {
      user_id,
      total_amount,
      cartItems,
    };

    const url = `${API_URL}/orders`;

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(orderData),
    };

    const response = await fetch(url, options);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Order Placed Successfully");
      localStorage.removeItem("cartItems");
    } else {
      alert("Failed To Place Order");
    }
  };
  render() {
    const { cartItems } = this.props;
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return (
      <>
        <Navbar className="navbarfeatures" />
        <div className="wholecart">
          <h1 className="cartheading">Cart Items</h1>
          <ul>
            {cartItems.map((eachitem) => (
              <CartItem key={eachitem.id} eachitem={eachitem} />
            ))}
          </ul>
          <div className="totalprice">
            <h2>Final Price : </h2>
            <p className="totalpricepara">{total}</p>
          </div>

          <button className="placeorderbutton" onClick={this.placeOrder}>
            Place Order
          </button>
        </div>
      </>
    );
  }
}

export default Cart;
