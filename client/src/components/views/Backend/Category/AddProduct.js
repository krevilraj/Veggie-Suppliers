import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import "../Backend.scss";
import { Link, withRouter } from "react-router-dom";
import FileUpload from "../../../utils/FileUpload";
import ProductSpecification from "./ProductSpecification";
import ProductFAQ from "./ProductFAQ";
import classnames from "classnames";
import QuillEditor from "../../../editor/QuillEditor";
import Axios from "axios";
import { message, Space, Switch } from "antd";

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

function AddProduct(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [ShortDescriptionValue, setShortDescriptionValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [SKUValue, setSKUValue] = useState("");
  const [RegularPriceValue, setRegularPriceValue] = useState(0);
  const [SalesPriceValue, setSalesPriceValue] = useState(0);
  const [DisablePriceValue, setDisablePriceValue] = useState(false);
  const [EnableFeatureValue, setEnableFeatureValue] = useState(false);
  const [ManageStock, setManageStock] = useState(false);
  const [Specification, setSpecification] = useState([]);
  const [FAQ, setFAQ] = useState([]);
  const [StockQuantityValue, setStockQuantity] = useState(0);
  const [StockAvailabilty, setStockAvailabilty] = useState(true);
  const [StatusValue, setStatusValue] = useState(true);

  const [files, setFiles] = useState([]);
  const [Images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const key = "updatable";
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const onEditorChange = (value) => {
    setDescriptionValue(value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const updateSpecification = (Specification) => {
    setSpecification(Specification);
  };
  const updateFAQ = (FAQ) => {
    setFAQ(FAQ);
  };
  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!TitleValue || !DescriptionValue || !SalesPriceValue || !Images) {
      setTimeout(() => {
        message.error({
          content: "fill all the fields first!!1",
          key,
          duration: 2,
          className: "modelMessage",
        });
      }, 1000);
      return;
    }

    const postData = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      short_description: ShortDescriptionValue,
      sku: SKUValue,
      regular_price: RegularPriceValue,
      sales_price: SalesPriceValue,
      images: Images,
      manage_stock: ManageStock,
      stock_quantity: StockQuantityValue,
      stock_availabilty: StockAvailabilty ? "In Stock" : "Out of Stock",
      specification: Specification,
      faq: FAQ,
      enable_featured: EnableFeatureValue,
      disable_price: DisablePriceValue,
      current_status: StatusValue ? "Enabled" : "Disabled",
    };
    message.loading({
      content: "Action in Progress...",
      key,
      duration: 0,
      className: "modelMessage",
    });

    Axios.post("/api/product/", postData).then((response) => {
      if (response.data.success) {
        setTimeout(() => {
          message.success({
            content: "Product Successfully Uploaded",
            key,
            duration: 2,
            className: "modelMessage",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          message.error({
            content: "Failed to upload",
            key,
            duration: 2,
            className: "modelMessage",
          });
        }, 1000);
      }
    });
  };
  const toggleStatus = (checked) => {
    setStatusValue(checked);
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Add New Product</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard/product-all">Products</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add
            </li>
          </ol>
        </nav>
      </div>
      <form className="forms-sample" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-9 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Form.Group>
                  <label htmlFor="exampleInputUsername1">Product Name</label>
                  <Form.Control
                    type="text"
                    id="exampleInputUsername1"
                    placeholder="Product name"
                    onChange={(e) => setTitleValue(e.target.value)}
                    size="lg"
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleTextarea1">Short Description</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    onChange={(e) => setShortDescriptionValue(e.target.value)}
                  ></textarea>
                </Form.Group>

                <Form.Group>
                  <label htmlFor="exampleTextarea2">Description</label>
                  <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                    htmlval={DescriptionValue}
                  />
                </Form.Group>
                <Form.Group>
                  <blockquote className="blockquote">
                    <h5>Images</h5>
                    <FileUpload refreshFunction={updateImages} />
                  </blockquote>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin">
            <div className="card">
              <div className="card-body">
                <Space size="large" align="center">
                  Status
                  <Switch
                    defaultChecked={StatusValue}
                    key={StatusValue}
                    checkedChildren="Active"
                    onChange={toggleStatus}
                    unCheckedChildren="Inactive"
                  />
                </Space>
              </div>
            </div>
          </div>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">More Information</h4>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      General
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Inventory
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      Specification
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        toggle("4");
                      }}
                    >
                      FAQ
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "5" })}
                      onClick={() => {
                        toggle("5");
                      }}
                    >
                      Downloads
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "6" })}
                      onClick={() => {
                        toggle("6");
                      }}
                    >
                      Advanced
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent style={{ padding: "1rem" }} activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <Form.Group className="row">
                          <label
                            htmlFor="sku"
                            className="col-sm-3 col-form-label"
                          >
                            SKU{" "}
                          </label>
                          <div className="col-sm-9">
                            <Form.Control
                              type="text"
                              id="sku"
                              placeholder="SKU"
                              onChange={(e) => setSKUValue(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                        <Form.Group className="row">
                          <label
                            htmlFor="regular_price"
                            className="col-sm-3 col-form-label"
                          >
                            Regular Price
                          </label>
                          <div className="col-sm-9">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">
                                  $
                                </span>
                              </div>
                              <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                onChange={(e) =>
                                  setRegularPriceValue(e.target.value)
                                }
                                id="regular_price"
                                className="form-control"
                                aria-label="Amount (to the nearest dollar)"
                              />
                            </div>
                          </div>
                        </Form.Group>
                        <Form.Group className="row">
                          <label
                            htmlFor="sales_price"
                            className="col-sm-3 col-form-label"
                          >
                            Sales Price
                          </label>
                          <div className="col-sm-9">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text bg-success text-white">
                                  $
                                </span>
                              </div>
                              <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                id="sales_price"
                                onChange={(e) =>
                                  setSalesPriceValue(e.target.value)
                                }
                                className="form-control"
                                aria-label="Amount (to the nearest dollar)"
                              />
                            </div>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <Form.Group className="row">
                          <label
                            htmlFor="sku"
                            className="col-sm-3 col-form-label"
                          >
                            Manage Stock
                          </label>
                          <div className="col-sm-9">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    setManageStock(e.target.checked)
                                  }
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Enable stock management
                              </label>
                            </div>
                          </div>
                        </Form.Group>
                        {ManageStock ? (
                          <Form.Group className="row">
                            <label
                              htmlFor="stock_quantity"
                              className="col-sm-3 col-form-label"
                            >
                              Stock Quantity
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="number"
                                id="stock_quantity"
                                placeholder="Stock Quantity"
                                onChange={(e) =>
                                  setStockQuantity(e.target.value)
                                }
                              />
                            </div>
                          </Form.Group>
                        ) : null}

                        <Form.Group className="row">
                          <label
                            htmlFor="stock_availabilty"
                            className="col-sm-3 col-form-label"
                          >
                            Stock Availability{" "}
                          </label>
                          <div className="col-sm-9">
                            <Space size="large" align="center">
                              <Switch
                                defaultChecked={StockAvailabilty}
                                id="stock_availabilty"
                                key={StockAvailabilty}
                                checkedChildren="In Stock"
                                onChange={(checked) =>
                                  setStockAvailabilty(checked)
                                }
                                unCheckedChildren="Out of Stock"
                              />
                            </Space>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <ProductSpecification
                      refreshFunction={updateSpecification}
                    />
                  </TabPane>
                  <TabPane tabId="4">
                    <ProductFAQ
                      refreshFunction={updateFAQ}
                      key={FAQ}
                      faq={FAQ}
                    />
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>
                            With supporting text below as a natural lead-in to
                            additional content.
                          </CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>
                            With supporting text below as a natural lead-in to
                            additional content.
                          </CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="6">
                    <Row>
                      <Col sm="12">
                        <Form.Group className="row">
                          <label
                            htmlFor="sku"
                            className="col-sm-3 col-form-label"
                          >
                            Disable Price{DisablePriceValue}
                          </label>
                          <div className="col-sm-9">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    setDisablePriceValue(e.target.checked)
                                  }
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Disable Product Price
                              </label>
                            </div>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col sm="12">
                        <Form.Group className="row">
                          <label
                            htmlFor="sku"
                            className="col-sm-3 col-form-label"
                          >
                            Feature Product{EnableFeatureValue}
                          </label>
                          <div className="col-sm-9">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    setEnableFeatureValue(e.target.checked)
                                  }
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Enable as featured product
                              </label>
                            </div>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

                <button type="submit" className="btn btn-inverse-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default withRouter(AddProduct);
