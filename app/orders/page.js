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
    console.log(orders);
  }, []);
  console.log(orders);

  return (
    <div>
      <h1>Orders</h1>
      <table className="basic mt-6">
        <thead className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
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

                <td>{order.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
