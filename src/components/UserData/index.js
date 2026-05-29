import { Component } from "react";
import API_URL from "../../config";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

class UserData extends Component {
  state = { usernames: "", userid: "", userrole: "", useremail: "" };
  componentDidMount = async () => {
    try {
      const { useremail } = this.props;

      const response = await fetch(`${API_URL}/profile/${useremail}`);

      const data = await response.json();

      if (response.ok) {
        this.sucessfullretrive(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  sucessfullretrive = (data) => {
    const { name, email, id, role } = data[0];
    this.setState({
      usernames: name,
      userid: id,
      useremail: email,
      userrole: role,
    });
  };

  render() {
    const { usernames, userid, useremail, userrole } = this.state;
    return (
      <div className="profilecontaineruser">
        <div className="profiledetailscontainer">
          <h1>Profile Details...</h1>
          <hr className="hrlinep" />
          <div className="detailscontainer">
            <h3>Userid : </h3>
            <p>{userid}</p>
          </div>
          <div className="detailscontainer">
            <h3>Name : </h3>
            <p>{usernames}</p>
          </div>
          <div className="detailscontainer">
            <h3>Email : </h3>
            <p>{useremail}</p>
          </div>
          <div className="detailscontainer">
            <h3>Role : </h3>
            <p>{userrole}</p>
          </div>
          <Link to="/profile">
            <button className="buttonprofile">
              <FaArrowLeft /> Settings
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default UserData;
