const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
    layout: "site",
  },
  {
    path: "/login",
    exact: true,
    component: "Login",
    layout: "auth",
  },
  {
    path: "/admin/dashboard",
    exact: true,
    component: "Dashboard",
    layout: "admin",
  },
];

export default routes;
