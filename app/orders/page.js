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
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody className="basic">
          {orders?.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td className="border-2 text-center">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
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

                <td className="border-2 text-center">
                  {order.line_items.map((o, i) => (
                    <div key={i}>{o.price_data.product_data.name}</div>
                  ))}
                </td>
                <td className="text-center border-2">
                  {order.line_items.map((o, i) => (
                    <div key={i}>{o.quantity}</div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
