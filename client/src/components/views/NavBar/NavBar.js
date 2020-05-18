import React, {useState} from 'react';
import './Sections/Navbar.css';
import RightMenu from './Sections/RightMenu';
import "./navbar.css";

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };


  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>

      <header className="header">
        <div className="topbar-outer">
          <div className="container">
            <div className="topbar-left">
              <div className="topbar-social">
                <div className="social-facebook content"><a href="http:facebook.com/ebancha" target="_blank"><i
                  className="fab fa-facebook-f"></i></a></div>
                <div className="social-twitter content"><a href="http:twitter.com/ebancha" target="_blank"><i
                  className="fab fa-twitter"></i></a></div>
                <div className="social-instagram content"><a href="http:instagram.com/ebancha" target="_blank"><i
                  className="fab fa-instagram"></i></a></div>
                <div className="social-linkedin content"><a href="http:linkedin.com/ebancha" target="_blank"><i
                  className="fab fa-linkedin"></i></a></div>
              </div>
            </div>
            <div className="topbar-right">
              <div className="header-menu-links">
                <RightMenu mode="horizontal" />

              </div>
            </div>
          </div>
        </div>
        <div className="haeader-mid-area  border-bm-1 d-none d-lg-block ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-4 col-5">
                <div className="logo-area">
                  <a href="/">
                    <img src="./images/logo.png" alt=""/>
                  </a>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="search-box-wrapper">
                  <div className="search-box-inner-wrap">
                    <form className="search-box-inner">
                      <div className="search-select-box">
                        <select className="nice-select">
                          <optgroup label="organic food">
                            <option value="volvo">All</option>
                            <option value="saab">watch</option>
                            <option value="saab">air cooler</option>
                            <option value="saab">audio</option>
                            <option value="saab">speakers</option>
                            <option value="saab">amplifires</option>
                          </optgroup>
                          <optgroup label="Fashion">
                            <option value="mercedes">Womens tops</option>
                            <option value="audi">Jeans</option>
                            <option value="audi">Shirt</option>
                            <option value="audi">Pant</option>
                            <option value="audi">Watch</option>
                            <option value="audi">Handbag</option>
                          </optgroup>
                        </select>
                      </div>
                      <div className="search-field-wrap">
                        <input type="text" className="search-field" placeholder="Search product..."/>

                        <div className="search-btn">
                          <button><i className="fa fa-search"></i></button>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="customer-wrap green-bg">
                  <div className="single-costomer-box">
                    <div className="single-costomer">
                      <p><i className="far fa-check-circle"></i><span>Free Delivery</span></p>
                    </div>
                  </div>

                  <div className="single-costomer-box">
                    <div className="single-costomer">
                      <p><i className="fas fa-lock"></i><span>Safe Payment</span></p>
                    </div>
                  </div>

                  <div className="single-costomer-box">
                    <div className="single-costomer">
                      <p><i className="far fa-bell"></i><span>24/7 Support</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="haeader-bottom-area bg-gren header-sticky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9 d-none d-lg-block">

                <div className="main-menu-area white_text">

                  <nav className="main-navigation">
                    <ul>
                      <li className="active"><a href="#">Home</a></li>

                      <li><a href="#">About Us <i className="fa fa-angle-down"></i></a>

                        <ul className="sub-menu">
                          <li><a href="#">About Us </a></li>
                          <li><a href="#">About Us </a></li>
                          <li><a href="#">About Us </a></li>
                        </ul>
                      </li>

                      <li><a href="#">Products<i className="fa fa-angle-down"></i></a>
                        <ul className="mega-menu">
                          <li><a href="#">Kitchen</a>
                            <ul>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                            </ul>
                          </li>
                          <li><a href="#">Kitchen</a>
                            <ul>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                            </ul>
                          </li>
                          <li><a href="#">Kitchen</a>
                            <ul>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                              <li><a href="#">Kitchen</a></li>
                            </ul>
                          </li>
                        </ul>

                      </li>


                      <li><a href="search.html">Search</a></li>
                      <li><a href="contact-us.html">Contact</a></li>
                    </ul>
                  </nav>

                </div>
              </div>

              <div className="col-5 col-md-6 d-block d-lg-none">
                <div className="logo"><a href="#"><img src="./images/logo.png" alt=""/>
                </a></div>
              </div>

              <div className="col-lg-3 col-md-6 col-7">
                <div className="right-blok-box text-white d-flex">

                  <div className="user-wrap">
                    <a href="wishlist.html"><span className="cart-total">2</span><i className="far fa-heart"></i></a>
                  </div>


                  <div className="shopping-cart-wrap">
                    <a href="cart.html"><i className="fas fa-shopping-cart"></i><span className="cart-total">2</span>
                      <span className="cart-total-amunt">$0.00</span></a>
                    <ul className="mini-cart">
                      <li className="cart-item">
                        <div className="cart-image">
                          <a href="#"><img alt="" src="images/product-01.jpg"/></a>
                        </div>
                        <div className="cart-title">
                          <a href="#">
                            <h4>Product Name 01</h4>
                          </a>
                          <div className="quanti-price-wrap">
                            <span className="quantity">1 ×</span>
                            <div className="price-box"><span className="new-price">$130.00</span></div>
                          </div>
                        </div>
                      </li>
                      <li className="cart-item">
                        <div className="cart-image">
                          <a href="#"><img alt="" src="images/product-02.jpg"/></a>
                        </div>
                        <div className="cart-title">
                          <a href="#">
                            <h4>Product Name 03</h4>
                          </a>
                          <div className="quanti-price-wrap">
                            <span className="quantity">1 ×</span>
                            <div className="price-box"><span className="new-price">$130.00</span></div>
                          </div>
                        </div>
                      </li>
                      <li className="subtotal-box">
                        <div className="subtotal-title">
                          <h3>Sub-Total :</h3><span>$ 260.99</span>
                        </div>
                      </li>
                      <li className="mini-cart-btns">
                        <div className="cart-btns">
                          <a href="cart.html">View cart</a>
                          <a href="checkout.html">Checkout</a>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mobile-menu-btn d-block d-lg-none">
                    <div className="off-canvas-btn">
                      <a href="#" onClick={showDrawer}><img src="images/bg-menu.png" alt=""/></a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className={visible?'off-canvas-wrapper open':'off-canvas-wrapper'}>
          <div className="off-canvas-overlay" onClick={onClose}></div>
          <div className="off-canvas-inner-content">
            <div className="btn-close-off-canvas" onClick={onClose}>
              <i className="fas fa-times"></i>
            </div>

            <div className="off-canvas-inner">

              <div className="search-box-offcanvas">
                <form>
                  <input type="text" placeholder="Search product..."/>
                  <button className="search-btn"><i className="fa fa-search"></i></button>
                </form>
              </div>
              <div className="mobile-navigation">


                <nav>
                  <ul className="mobile-menu">
                    <li><a href="#">Home</a></li>
                    <li className="menu-item-has-children "><a href="#">About Us</a>
                      <ul className="dropdown">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">About Us</a></li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children"><a href="#">Products</a>
                      <ul className="megamenu dropdown">
                        <li className="mega-title has-children"><a href="#">Kitchen</a>
                          <ul className="dropdown">
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                          </ul>
                        </li>
                        <li className="mega-title has-children"><a href="#">Kitchen</a>
                          <ul className="dropdown">
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                          </ul>
                        </li>
                        <li className="mega-title has-children"><a href="#">Kitchen</a>
                          <ul className="dropdown">
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Kitchen</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>


                    <li><a href="search.html">Search</a></li>
                    <li><a href="product-details.html">Product Details</a></li>
                    <li><a href="contact-us.html">Contact</a></li>
                  </ul>
                </nav>

              </div>


              <div className="offcanvas-widget-area">
                <div className="top-info-wrap text-left text-black">
                  <h5>My Account</h5>
                  <ul className="offcanvas-account-container">
                    <li><a href="my-account.html">My account</a></li>
                    <li><a href="cart.html">Cart</a></li>
                    <li><a href="wishlist.html">Wishlist</a></li>
                    <li><a href="checkout.html">Checkout</a></li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </aside>


      </header>

    </div>
  )
}

export default NavBar