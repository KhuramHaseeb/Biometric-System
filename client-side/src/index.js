import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigation from "./config/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/main.css";
import { Provider } from "react-redux";
import store from "./store";
import ScrollToTop from "./ScrollComponents/ScrollToTop";
import ScrollToTopBtn from "./ScrollComponents/ScrollToTopBtn";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Navigation />
        <ScrollToTopBtn />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
