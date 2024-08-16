import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import { Layout } from "../layout/Layout";

import { Home } from "../views/Home.view";
import { NoMatch } from "../views/NoMatch.view";
import { Routes } from "../enums/routes.enum";

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: Routes.Home,
        element: <Home />,
      },
      // {
      //   path: "about",
      //   // Single route in lazy file
      //   lazy: () => import("./pages/About"),
      // },
      // {
      //   path: "dashboard",
      //   async lazy() {
      //     // Multiple routes in lazy file
      //     let { DashboardLayout } = await import("./pages/Dashboard");
      //     return { Component: DashboardLayout };
      //   },
      //   children: [
      //     {
      //       index: true,
      //       async lazy() {
      //         let { DashboardIndex } = await import("./pages/Dashboard");
      //         return { Component: DashboardIndex };
      //       },
      //     },
      //     {
      //       path: "messages",
      //       async lazy() {
      //         let { dashboardMessagesLoader, DashboardMessages } = await import(
      //           "./pages/Dashboard"
      //         );
      //         return {
      //           loader: dashboardMessagesLoader,
      //           Component: DashboardMessages,
      //         };
      //       },
      //     },
      //   ],
      // },
      {
        path: Routes.NoMatch,
        element: <NoMatch />,
      },
    ],
  },
]);
