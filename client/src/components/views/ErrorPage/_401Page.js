import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import './_401Page.css'

function _401Page(props) {

  return (
    <div className="">
      <div className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Error</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content-wrap section-ptb lagin-and-register-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
              <div id="notfound">
                <div className="notfound">
                  <div className="notfound-404">
                    <h1>4<span></span>1</h1>
                  </div>
                  <h2>Oops! You are not Authorize</h2>
                  <p>Sorry but the page you are looking for need appropriate authorize</p>
                  <a href="/">Back to homepage</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default withRouter(_401Page);


