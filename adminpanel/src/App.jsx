import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import Sidebar from "./components/Sidebar/Sidebar";
import Menubar from "./components/Menubar/menubar";
import {ToastContainer, toast} from "react-toastify";

const App = () => {

    const [sidebarVisible,setSidebarVisible] = useState(true);

    const toggleSidebar = () =>{
        setSidebarVisible(!sidebarVisible);
    }

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarVisible={sidebarVisible}></Sidebar>

      <div id="page-content-wrapper">
        <Menubar toggleSidebar={toggleSidebar}></Menubar>
        <ToastContainer></ToastContainer>

        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<AddFood></AddFood>}></Route>
            <Route path="/list" element={<ListFood></ListFood>}></Route>
            <Route path="/orders" element={<Orders></Orders>}></Route>
            <Route path="/" element={<ListFood></ListFood>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
