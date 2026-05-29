import "./index.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfoundcontainer">
      <img
        src="https://res.cloudinary.com/dnoycfpby/image/upload/v1779443136/ChatGPT_Image_May_22_2026_03_13_58_PM_o6xv9j.png"
        alt="notfound-image"
        className="notfoundimage"
      />
      <Link to="/">
        <button className="notfoundbutton">Back Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
