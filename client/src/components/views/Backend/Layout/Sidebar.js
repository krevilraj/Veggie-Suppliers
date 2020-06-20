import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Collapse, Dropdown} from 'react-bootstrap';
import {useSelector} from "react-redux";

function Sidebar(props) {

  const [navmenu,toggleDropdown] = useState({userProduct:false});
  const state = {};

  const setState = (menuState,value) =>{
    state[menuState] = value;
  };

  const toggleMenuState = (menuState) => {
    console.log(state.userProduct);
    if (!state[menuState]) {
      setState(menuState,true);
    } else if (Object.keys(state).length === 0) {
      setState(menuState,false);
    }else{
      setState(menuState,false)
    }
  }

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  };
  /*componentDidUpdate(prevProps) {
    if (props.location !== prevProps.location) {
      onRouteChanged();
    }
  }*/

  const user = useSelector(state => state.user);
  if (user.userData && user.userData.isAuth) {
    let post="";
    if (user.userData.role ===1 ) {
      post = "Admin";
    } else if(user.userData.role ===2 ) {
      post = "Manager";
    } else {
      post = "";
    }
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="/"><img
            src="../../images/logo.png" alt="logo"/></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="/"><img
            src={require("../../../../assets/images/logo-mini.svg")} alt="logo"/></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="profile-image">
                      <img src={user.userData.image} alt="profile"/>
                    </div>
                    <div className="text-left ml-3">
                      <p className="profile-name">{user.userData.name}</p>
                      <small className="designation text-muted text-small">{post}</small>
                      <span className="status-indicator online"></span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center" href="!#"
                                 onClick={evt => evt.preventDefault()}>
                    <div className="d-flex">
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                      </div>
                      <div
                        className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                        <i className="mdi mdi-account-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-alarm-check mr-0"></i>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Manage Accounts
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Check Inbox
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button className="btn btn-success btn-block">New Project <i className="mdi mdi-plus"></i></button>
            </div>
          </li>
          <li className={isPathActive('/dashboard/index') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard/index">
              <i className="fa fa-dashboard menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>

          <li className={isPathActive('/dashboard/product') ? 'nav-item active' : 'nav-item'}>
            <div className={navmenu.userProduct ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => toggleDropdown({...navmenu, userProduct: !navmenu.userProduct})} data-toggle="collapse">
              <i className="mdi mdi-shopify menu-icon"></i>
              <span className="menu-title">Product</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={navmenu.userProduct}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link
                  className={isPathActive('/dashboard/product/index') ? 'nav-link active' : 'nav-link'}
                  to="/dashboard/product/index"><i className="mdi mdi-view-list menu-icon"></i> All Products</Link></li>
                <li className="nav-item"><Link
                  className={isPathActive('/dashboard/product/add') ? 'nav-link active' : 'nav-link'}
                  to="/dashboard/product/add"><i className="mdi mdi-cart-plus menu-icon"></i> Add Product</Link></li>
                <li className="nav-item"><Link
                  className={isPathActive('/dashboard/category/index') ? 'nav-link active' : 'nav-link'}
                  to="/dashboard/category/index"><i className="mdi mdi-chili-hot menu-icon"></i> Categories</Link></li>

              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a className="nav-link"
               href="http://www.bootstrapdash.com/demo/star-admin-free/react/documentation/documentation.html"
               rel="noopener noreferrer" target="_blank">
              <i className="mdi mdi-file-outline menu-icon"></i>
              <span className="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html"><img
            src={require("../../../../assets/images/logo.svg")} alt="logo"/></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img
            src={require("../../../../assets/images/logo-mini.svg")} alt="logo"/></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="profile-image">
                      <img src={require("../../../../assets/images/faces/face8.jpg")} alt="profile"/>
                    </div>
                    <div className="text-left ml-3">
                      <p className="profile-name">Richard V.Welsh</p>
                      <small className="designation text-muted text-small">Manager</small>
                      <span className="status-indicator online"></span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center" href="!#"
                                 onClick={evt => evt.preventDefault()}>
                    <div className="d-flex">
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                      </div>
                      <div
                        className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                        <i className="mdi mdi-account-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-alarm-check mr-0"></i>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Manage Accounts
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Check Inbox
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small"
                                 onClick={evt => evt.preventDefault()}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button className="btn btn-success btn-block">New Project <i className="mdi mdi-plus"></i></button>
            </div>
          </li>
          <li className={isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link"
               href="http://www.bootstrapdash.com/demo/star-admin-free/react/documentation/documentation.html"
               rel="noopener noreferrer" target="_blank">
              <i className="mdi mdi-file-outline menu-icon"></i>
              <span className="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>

    );
  }

  /*isPathActive(path) {
    return props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }*/

}

export default withRouter(Sidebar);