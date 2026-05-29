import { useParams } from "react-router-dom";
import AddMenuItems from "./../AddMenuItems";

const AddMenuItemsWrapper = () => {
  const params = useParams();

  return <AddMenuItems params={params} />;
};

export default AddMenuItemsWrapper;
