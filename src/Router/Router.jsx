import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home Page/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import { Component } from "react";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import AddParcel from "../Pages/AddParcel/AddParcel";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import PrivateRoute from "../Routes/PrivateRoute";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/MyParcels/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/coverage", Component: Coverage },
      { path: "/add-parcel", Component: AddParcel },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />,
      </PrivateRoute>
    ),
    children: [{ path: "myParcels", Component: MyParcels },{
      path: 'payment/:id',
      Component: Payment
    }],
  },
]);
