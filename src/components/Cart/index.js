import { Component } from "react";
import CartItem from "../CartItem";
import "./index.css";
import Navbar from "../Navbar";
import API_URL from "../../config";
import { Oval } from "react-loader-spinner";

class Cart extends Component {
  state = { user_id: "", isLoadingcart: "initial" };

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
    const { cartItems, clearCart } = this.props;

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

    this.setState({ isLoadingcart: "loading" });

    const url = `${API_URL}/orders`;

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(orderData),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      clearCart();

      this.setState({ isLoadingcart: "success" });
    } else {
      alert("Failed To Place Order");
    }
  };

  getpagecontent = (load) => {
    const { cartItems } = this.props;

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    switch (load) {
      case "initial":
        return (
          <div className="wholecart">
            <h1 className="cartheading">Cart Items</h1>
            {cartItems.length === 0 ? (
              <h1>No Items In Cart</h1>
            ) : (
              <ul>
                {cartItems.map((eachitem) => (
                  <CartItem key={eachitem.id} eachitem={eachitem} />
                ))}
              </ul>
            )}
            <div className="totalprice">
              <h2>Final Price :</h2>

              <p className="totalpricepara">{total}</p>
            </div>
            <button className="placeorderbutton" onClick={this.placeOrder}>
              Place Order
            </button>
          </div>
        );

      case "loading":
        return (
          <div className="wholecart">
            <h1 className="cartheading">Cart Items</h1>

            <div className="loader-container">
              <Oval
                height={80}
                width={80}
                color="gold"
                secondaryColor="#555555"
                strokeWidth={4}
                strokeWidthSecondary={4}
                ariaLabel="loading"
                visible={true}
              />
            </div>
          </div>
        );

      case "success":
        return (
          <div className="wholecart">
            <h1 className="cartheading">Cart Items</h1>

            <h1>Order Placed Successfully</h1>
          </div>
        );

      default:
        return <h1>No Item in Cart</h1>;
    }
  };

  render() {
    const { isLoadingcart } = this.state;

    return (
      <>
        <Navbar className="navbarfeatures" />

        {this.getpagecontent(isLoadingcart)}
      </>
    );
  }
}

export default Cart;
