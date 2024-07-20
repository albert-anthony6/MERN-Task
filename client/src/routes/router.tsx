import App from "../App";
import LoginForm from "../views/LoginForm";
import RegisterForm from "../views/RegisterForm";
import DashboardPage from "../views/DashboardPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
]);
