import React from 'react';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
export default ({children}) => (
  <>
    <div className="container-scroller">
      <Navbar/>
      <div className="container-fluid page-body-wrapper">
        <Sidebar/>
        <div className="main-panel">
          <div className="content-wrapper">
            {children}
          </div>
          <Footer/>
        </div>
      </div>
    </div>
    <Navbar/>

  </>
);
