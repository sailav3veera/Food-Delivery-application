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
  state = { cartItems: [] };
  componentDidMount() {
    const storedCart = localStorage.getItem("cartItems");

    if (storedCart) {
      this.setState({
        cartItems: JSON.parse(storedCart),
      });
    }
  }
  addToCart = (menuItem) => {
    const { cartItems } = this.state;

    const existingItem = cartItems.find((item) => item.id === menuItem.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) => {
        if (item.id === menuItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      this.setState(
        {
          cartItems: updatedCart,
        },
        () => {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(this.state.cartItems),
          );
        },
      );
    } else {
      const newItem = {
        ...menuItem,
        quantity: 1,
      };

      this.setState(
        {
          cartItems: [...cartItems, newItem],
        },
        () => {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(this.state.cartItems),
          );
        },
      );
    }
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
                <Cart cartItems={cartItems} />
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
