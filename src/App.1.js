import React from "react";
import Router from "./components/config/Router";

// import Navbar from "./components/reusable/navbar/Navbar";
export function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Dashboard/> */}
      <Router /> {/* This component should not contain another BrowserRouter */}
    </div>
  );
}
