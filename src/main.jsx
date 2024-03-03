import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { checkAuthentication } from "./slice/authSlice.js";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/pacifico";
import "@fontsource/montserrat";
import "@fontsource/open-sans";
import "@fontsource/roboto";
import "@fontsource/urbanist";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
store.dispatch(checkAuthentication());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
