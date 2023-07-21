"use client";

import React, { useEffect, useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import UserInfo from "./components/UserInfo";

const Home = () => {
  const { data: session } = useSession();
  const [todayOrders, setTodayOrders] = useState([]);
  const [weekOrders, setWeekOrders] = useState([]);
  const [monthOrders, setMonthOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch("api/orders");
    const data = await response.json();

    // Get the current date
    const currentDate = new Date();

    // Filter orders that were created today
    const ordersToday = data.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt.toDateString() === currentDate.toDateString();
    });

    // Calculate the date one week ago from the current date
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Filter orders that were created in the last week
    const ordersLastWeek = data.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= oneWeekAgo;
    });

    // Calculate the first day of the current month
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Filter orders that were created this month
    const ordersThisMonth = data.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= firstDayOfMonth;
    });

    setTodayOrders(ordersToday);
    setWeekOrders(ordersLastWeek);
    setMonthOrders(ordersThisMonth);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!session) {
    return (
      <div className="flex justify-center">
        <button className="btn-primary" onClick={() => signIn("google")}>
          Sign in with google
        </button>
      </div>
    );
  }
  return (
    <div>
      <UserInfo />
      <div className="flex justify-evenly items-center p-8">
        <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3">
          <h2 className=" text-xlg font-bold  text-gray-600">Today's Orders</h2>
          <div className=" text-3xl font-bold text-blue-800 pt-3">
            {todayOrders.length}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3">
          <h2 className=" text-xlg font-bold  text-gray-600">
            This Week's Orders
          </h2>
          <div className=" text-3xl font-bold text-blue-800 pt-3">
            {weekOrders.length}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3">
          <h2 className=" text-xlg font-bold  text-gray-600">
            This Month's Orders
          </h2>
          <div className=" text-3xl font-bold text-blue-800 pt-3">
            {monthOrders.length}
          </div>
        </div>
      </div>
      <div className="flex justify-evenly p-10">
        <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3">
          <h2 className=" text-xlg font-bold  text-gray-600">Today's Orders</h2>
          <div className=" text-3xl font-bold text-blue-800 pt-3">
            {todayOrders.reduce((acc, cur) => acc + cur.cartTotal, 0)}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3">
          <h2 className=" text-xlg font-bold  text-gray-600">
            This Week's Orders
          </h2>
          <div className=" text-3xl font-bold text-blue-800 pt-3">
            {weekOrders.reduce((acc, cur) => acc + cur.cartTotal, 0)}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3">
          <h2 className=" text-xlg font-bold  text-gray-600">
            This Month's Orders
          </h2>
          <div className=" text-3xl font-bold text-blue-800 pt-3">
            {monthOrders.reduce((acc, cur) => acc + cur.cartTotal, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
