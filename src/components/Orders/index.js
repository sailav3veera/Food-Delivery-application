import { Component } from "react";
import API_URL from "../../config";
import { Oval } from "react-loader-spinner";
import "./index.css";
import Navbar from "../Navbar";
import OrderItems from "../OrderItems";

class Orders extends Component {
  state = { isloading: true, orders: [] };
  componentDidMount() {
    this.getorderdata();
  }
  successfulorders = (data) => {
    this.setState((prevstate) => ({ orders: [...prevstate.orders, ...data] }));
  };
  getorderdata = async () => {
    const urls = `${API_URL}/orders`;
    const options = { method: "GET" };
    const response = await fetch(urls, options);
    const data = await response.json();

    if (response.ok) {
      this.setState({ isloading: false });
      this.successfulorders(data);
    }
  };

  render() {
    const { isloading, orders } = this.state;
    return (
      <>
        <Navbar />
        <div className="ordercontainer">
          <h1 className="headingorders">Orders</h1>
          {isloading ? (
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
          ) : (
            <ul >
              {orders.map((eachorder) => (
                <OrderItems key={eachorder.id} eachorder={eachorder} />
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

export default Orders;
