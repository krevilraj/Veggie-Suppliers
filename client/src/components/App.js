import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import RoleAuth from "../hoc/role_auth";
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import AppRoute from './AppRoute';
import BackendLayout from "./views/Backend/Layout/BackendLayout";
import HomeLayout from "./HomeLayout";
import Dashboard from "./views/Backend/Dashboard/Dashboard";
import LandingPage from "./views/LandingPage/LandingPage";
import _401Page from "./views/ErrorPage/_401Page";
import AddProduct from "./views/Backend/Product/AddProduct";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Switch>
          <AppRoute exact path="/401" component={Auth(_401Page, null)} layout={HomeLayout} />
          <AppRoute exact path="/" component={Auth(LandingPage, null)} layout={HomeLayout} />
          <AppRoute exact path="/login" component={Auth(LoginPage, false)} layout={HomeLayout}/>
          <AppRoute exact path="/register" component={Auth(RegisterPage, false)} layout={HomeLayout}/>
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />

          <AppRoute exact path="/dashboard/index" component={RoleAuth(Dashboard,false, null,['admin','shop-manager'])} layout={BackendLayout}/>
          <AppRoute exact path="/dashboard/product-add" component={RoleAuth(AddProduct,false, null,['admin','shop-manager'])} layout={BackendLayout}/>

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
