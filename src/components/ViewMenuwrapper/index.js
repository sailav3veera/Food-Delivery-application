import ViewMenu from "./../ViewMenu";
import { useParams } from "react-router-dom";

const ViewMenuwrapper = (props) => {
  const { restid } = useParams();
  return <ViewMenu restid={restid} addToCart={props.addToCart} />;
};

export default ViewMenuwrapper;
