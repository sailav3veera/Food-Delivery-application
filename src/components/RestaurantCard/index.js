import { Link } from "react-router-dom";
import "./index.css";
import { Component } from "react";
class RestaurantCard extends Component {
  render() {
    const { restaurantDetails } = this.props;

    const { id, name, address, image_url } = restaurantDetails;
    return (
      <div className="returantcards">
        <img src={image_url} alt={name} className="imagerest" />

        <div className="restdetails">
          <h3>{name}</h3>

          <p>{address}</p>

          <Link to={`/view-menu/${id}`}>
            <button className="buttonsviewmenu">View Menu</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default RestaurantCard;
