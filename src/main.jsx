import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ContexProvider from "./ContexApi/ContexProvider.jsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContexProvider>
      <App />
    </ContexProvider>
  </React.StrictMode>
);
