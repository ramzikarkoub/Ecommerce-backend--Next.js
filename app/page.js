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
    <>
      <UserInfo />
      <div className="p-10 flex flex-col content-center items-start">
        <h3 className="font-bold text-gray-600">Orders</h3>
        <div className="flex justify-evenly gap-10 pb-6 ml-2">
          <div className=" w-80 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3 shadow-md">
            <h2 className="text-xlg font-bold text-gray-600">TODAY</h2>
            <div className="text-3xl font-bold text-blue-800 pt-3">
              {todayOrders.length}
            </div>
            <div className="text-sm text-gray-400">
              {todayOrders.length} {todayOrders.length > 0 ? "orders" : "order"}{" "}
              today
            </div>
          </div>
          <div className="w-80 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3 shadow-md">
            <h2 className="text-xlg font-bold text-gray-600">THIS WEEK</h2>
            <div className="text-3xl font-bold text-blue-800 pt-3">
              {weekOrders.length}
            </div>
            <div className="text-sm text-gray-400">
              {weekOrders.length} orders this week
            </div>
          </div>
          <div className="w-80 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3 shadow-md">
            <h2 className="text-xlg font-bold text-gray-600">THIS MONTH</h2>
            <div className="text-3xl font-bold text-blue-800 pt-3">
              {monthOrders.length}
            </div>
            <div className="text-sm text-gray-400">
              {monthOrders.length} orders this month
            </div>
          </div>
        </div>
        <h3 className="font-bold text-gray-600">Revenue</h3>
        <div className="flex justify-evenly gap-10  pb-6 ml-2">
          <div className=" w-80 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3 shadow-md">
            <h2 className="text-xlg font-bold text-gray-600">TODAY</h2>
            <div className="text-3xl font-bold text-blue-800 pt-3">
              {todayOrders
                .reduce((acc, cur) => acc + cur.cartTotal, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </div>
            <div className="text-sm text-gray-400">
              {todayOrders.length} orders today
            </div>
          </div>
          <div className="w-80 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3 shadow-md">
            <h2 className="text-xlg font-bold text-gray-600">THIS WEEK</h2>
            <div className="text-3xl font-bold text-blue-800 pt-3">
              {weekOrders
                .reduce((acc, cur) => acc + cur.cartTotal, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </div>
            <div className="text-sm text-gray-400">
              {weekOrders.length} orders this week
            </div>
          </div>
          <div className="w-80 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-2 border-slate-200 p-3 shadow-md">
            <h2 className="text-xlg font-bold text-gray-600">THIS MONTH</h2>
            <div className="text-3xl font-bold text-blue-800 pt-3">
              {monthOrders
                .reduce((acc, cur) => acc + cur.cartTotal, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </div>
            <div className="text-sm text-gray-400">
              {monthOrders.length} orders this month
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
