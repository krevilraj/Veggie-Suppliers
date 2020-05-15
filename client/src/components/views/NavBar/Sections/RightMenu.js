/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import {withRouter} from 'react-router-dom';
import {useSelector} from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && user.userData.isAuth) {
    console.log(user);
    return (
      <ul id="menu-header-top-links" className="header-menu">
        <li id="menu-item-3249"
            className="white">
          <a href={void(0)} aria-current="page">Welcome {user.userData.name} ! </a></li>
        {(user.userData.role === 3 || user.userData.role === 1 || user.userData.role === 2) ?
          <li><a href="/dashboard" className="login show-login-link">Dashboard </a></li>
          :
          ""
        }

        <li><a href="/login" className="login show-login-link" onClick={logoutHandler}>Logout</a>
        </li>
      </ul>
    )
  } else {

    return (
      <ul id="menu-header-top-links" className="header-menu">
        <li id="menu-item-3249"
            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2709 current_page_item menu-item-3249">
          <a href="index.php" aria-current="page">Home</a></li>
        <li id="menu-item-3250"
            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3250"><a
          href="/about-us">About Us</a></li>
        <li><a href="/login" className="login show-login-link">Login / Register</a></li>
      </ul>
      /*<Menu mode={props.mode}>

        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>*/
    )
  }
}

export default withRouter(RightMenu);

