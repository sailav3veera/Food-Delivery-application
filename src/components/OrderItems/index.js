import "./index.css";

const OrderItems = (props) => {
  const { eachorder } = props;
  const { id, order_status, total_amount } = eachorder;
  console.log(eachorder);
  return (
    <li className="orderlist">
      <p>Order id : {id}</p>
      <p>Order Status : {order_status}</p>
      <p>Total Amount : {total_amount}</p>
    </li>
  );
};

export default OrderItems;
