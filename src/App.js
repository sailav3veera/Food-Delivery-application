import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Restaurants from "./components/Restaurants";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import UserDataWrapper from "./components/UserDataWrapper";
import AddRestaurants from "./components/AddRestaurants";
import AddMenuItemsWrapper from "./components/AddMenuItemsWrapper";
import ViewMenuwrapper from "./components/ViewMenuwrapper";
import { Component } from "react";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  getCartItems = () => {
    const username = localStorage.getItem("username");

    const storedCart = localStorage.getItem(`cartItems_${username}`);

    return storedCart ? JSON.parse(storedCart) : [];
  };

  state = {
    cartItems: [], // start empty safely
  };

  componentDidMount() {
    this.setState({
      cartItems: this.getCartItems(),
    });
  }

  addToCart = (menuItem) => {
    const { cartItems } = this.state;

    const username = localStorage.getItem("username");

    const existingItem = cartItems.find((item) => item.id === menuItem.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) => {
        if (item.id === menuItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      updatedCart = [...cartItems, { ...menuItem, quantity: 1 }];
    }

    this.setState({ cartItems: updatedCart }, () => {
      localStorage.setItem(
        `cartItems_${username}`,
        JSON.stringify(this.state.cartItems),
      );
    });
  };

  clearCart = () => {
    const username = localStorage.getItem("username");

    localStorage.removeItem(`cartItems_${username}`);

    this.setState({ cartItems: [] });
  };

  render() {
    const { cartItems } = this.state;

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Restaurants />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:useremail"
            element={
              <ProtectedRoute>
                <UserDataWrapper />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />

          <Route
            path="addrestaurants"
            element={
              <ProtectedRoute>
                <AddRestaurants />
              </ProtectedRoute>
            }
          />

          <Route
            path="/menu-items/:restid"
            element={
              <ProtectedRoute>
                <AddMenuItemsWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-menu/:restid"
            element={
              <ProtectedRoute>
                <ViewMenuwrapper addToCart={this.addToCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cartItems={cartItems} clearCart={this.clearCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
