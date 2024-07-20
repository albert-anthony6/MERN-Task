import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { router } from "./routes/router";
import { store } from "./store/configureStore.ts";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
