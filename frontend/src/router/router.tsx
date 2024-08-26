import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import { Layout } from "../layout/Layout";

import { Home } from "../views/Home.view";
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
      {
        path: Routes.CreateChallenge,
        async lazy() {
          let { CreateChallenge } = await import("../views/CreateChallenge/CreateChallenge.view");
          return { Component: CreateChallenge };
        }
      },
      {
        path: Routes.NoMatch,
        async lazy() {
          let { NoMatch } = await import("../views/NoMatch.view");
          return { Component: NoMatch };
        }
      },
    ],
  },
]);
