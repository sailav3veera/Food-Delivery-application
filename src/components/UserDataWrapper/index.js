import { useParams } from "react-router-dom";
import UserData from "./../UserData";

const UserDataWrapper = () => {
  const { useremail } = useParams();

  return <UserData useremail={useremail} />;
};

export default UserDataWrapper;