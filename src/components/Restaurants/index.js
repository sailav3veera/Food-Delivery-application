import React, { Component } from "react";

import RestaurantCard from "../RestaurantCard";

import Navbar from "../Navbar";
import "./index.css";
import API_URL from "../../config";

class Restaurants extends Component {
  state = {
    restaurants: [],

    restid: "",
  };

  componentDidMount() {
    this.getRestaurants();
    document.title = "Home | Skfoods";
  }

  getRestaurants = async () => {
    const url = `${API_URL}/restaurants`;

    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);

    const data = await response.json();

    this.setState({
      restaurants: data,
    });
  };

  render() {
    const { restaurants } = this.state;

    return (
      <div className="homepagecontainer">
        <Navbar />
        <h1 className="resturantname">Food Delivery App</h1>

        <h2 className="headingrest">Restaurants</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurantDetails={restaurant}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Restaurants;
