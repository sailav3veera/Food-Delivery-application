import { Component } from "react";
import MenuItemCard from "../MenuItemCard";
import API_URL from "../../config";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import "./index.css";
import Navbar from "../Navbar";

class ViewMenu extends Component {
  state = { selectedRestaurantId: null, menuItems: [] };
  componentDidMount() {
    const { restid } = this.props;
    this.setState({ selectedRestaurantId: restid });
    this.getmenudata(restid);
  }

  getmenudata = async (restaurantId) => {
    this.setState({ restid: restaurantId });
    const url = `${API_URL}/menu-items/${restaurantId}`;

    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);

    const data = await response.json();

    this.setState({
      menuItems: data,
      selectedRestaurantId: restaurantId,
    });
  };
  render() {
    const { menuItems, selectedRestaurantId } = this.state;
    const { addToCart } = this.props;

    return (
      <div className="menuitemscontainer">
        <Navbar />

        <div className="menucontent">
          <h1 className="menuitemheading">Menu Items</h1>

          <div className="divmenulist">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                menuItemDetails={item}
                addToCart={addToCart}
              />
            ))}

            <Link to={`/menu-items/${selectedRestaurantId}`}>
              <button className="addbutton">
                <IoMdAdd className="plusicon" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewMenu;
