"use client";
import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    const response = await fetch("api/orders");
    const data = await response.json();
    setOrders(data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <table className="basic mt-6">
        <thead className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">
          <tr>
            <th>Date</th>
            <th>paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody className="basic">
          {orders?.length > 0 &&
            orders.map((order) => (
              <tr
                key={order._id}
                className="border - 2 justify-center align-center"
              >
                <td className="border-2 text-center">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td>{order.paid ? "yes" : "no"}</td>
                <td className="border-2 text-center">
                  {order.name}
                  <br />
                  {order.streetAddress}
                  <br />
                  {order.postalCode}
                  <br />
                  {order.country}
                  <br />
                  {order.phoneNumber}
                </td>
                {order.items?.map((o, i) => (
                  <td key={i} className="  flex border-1 ">
                    <div className=" mr-20 ">{o.name}</div>
                    {o.properties?.map((p, index) => (
                      <div key={index} className=" mr-5">
                        **{p.name}: {p.value} **
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
