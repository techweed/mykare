import {lazy} from "react";

const routes = [
  {
    exact: true,
    name: "Home",
    path: "/home",
    component: lazy(() => import("./pages/home")),
  },
];

export default routes;
