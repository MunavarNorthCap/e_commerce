import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import Layout from "../components/Layout";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const orderArray = [];
      result.forEach((doc) => {
        orderArray.push(doc.data());
        setLoading(false);
      });
      //   console.log(orderArray);
      setOrders(orderArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      {/* <h1>{orders.length}</h1> */}
      
      <div className="p-2">
        {orders
          .filter((obj) => obj.userid === userid)
          .map((order, k) => (
            <table className="table mt-3 order" key={k}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={item.imageURL} alt="img" height="80" width="80" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
      </div>
    </Layout>
  );
}

export default OrdersPage;
