import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input } from "react-bootstrap";
import "../material.css";
import Axios from "axios";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Modal,
  Table,
  Select,
  Descriptions,
} from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import Sluggify from "../../../utils/Sluggify";

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

function AllCategory(props) {
  var Loader = require("react-loaders").Loader;
  const key = "updatable";
  const { Option } = Select;
  function filterCategory(str) {
    return str.replace(/-/g, "").trim();
  }
  function renderLoader() {
    return Loading ? <Loader type="line-scale" active /> : "";
  }


  const [Categories, setCategories] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [Loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [ParentId, setParentId] = useState("");

  const [UpdateId, setUpdateId] = useState(-1);
  const [UpdateName, setUpdateName] = useState("");
  const [UpdateDescription, setUpdateDescription] = useState("");
  const [UpdateParent, setUpdateParent] = useState("");
  const [modal2Visible, setmodal2Visible] = useState(false);

  const [viewModal, setViewModal] = useState(false);
  const viewModalCancel = () => {
    setViewModal(false);
  };
  const viewDetail = (category) => (s) => {
    setUpdateName(filterCategory(category.name));
    setUpdateDescription(category.description);    
    setUpdateParent(category.parent_id ? category.parent_id : "");
    setViewModal(true);
  };

  const handleCancel = () => {
    setmodal2Visible(false);
  };
  function handleUpdateChange(value) {
    setUpdateParent(UpdateId === value ? "" : value);
  }
  const editCategory = (category) => (s) => {
    console.log(category);
    setUpdateId(category._id);
    setUpdateName(filterCategory(category.name));
    setUpdateDescription(category.description);
    setUpdateParent(category.parent_id ? category.parent_id : "");
    setmodal2Visible(true);
  };
  const updateCategory = () => {
    setLoading(true);
    let postData = {};
    if (UpdateParent != "") {
      postData = {
        _id: UpdateId,
        name: UpdateName,
        slug: Sluggify(UpdateName),
        description: UpdateDescription,
        parent_id: UpdateParent,
      };
    } else {
      postData = {
        _id: UpdateId,
        name: UpdateName,
        slug: Sluggify(UpdateName),
        description: UpdateDescription,
      };
    }
    console.log(postData);
    Axios.put("/api/category/", postData)
      .then((response) => {
        if (response.data.success) {
          getCategories({
            skip: Skip,
            limit: Limit,
          });

          setTimeout(() => {
            message.success({
              content: "Category Successfully Uploaded",
              key,
              duration: 2,
              className: "modelMessage",
            });
          }, 1000);
        } else {
          setTimeout(() => {
            message.error({
              content: "Failed to upload or may be category already exist",
              key,
              duration: 2,
              className: "modelMessage",
            });
          }, 1000);
        }
        setLoading(false);
        setmodal2Visible(false);
      })
      .catch((error) => {
        // error messag => error.response.data.err.message
        if (!error.response.data.success) {
          setTimeout(() => {
            message.error({
              content: "Failed to upload",
              key,
              duration: 2,
              className: "modelMessage",
            });
          }, 1000);
        }
        console.log(error.response);
      });
  };

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getCategories(variables);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!Name || !Description) {
      setTimeout(() => {
        message.error({
          content: "fill all the fields first!!",
          key,
          duration: 2,
          className: "modelMessage",
        });
      }, 1000);
      return;
    }
    let postData = {};
    if (ParentId != "") {
      postData = {
        name: Name,
        slug: Sluggify(Name),
        description: Description,
        parent_id: ParentId,
      };
    } else {
      postData = {
        name: Name,
        slug: Sluggify(Name),
        description: Description,
      };
    }

    message.loading({
      content: "Action in Progress...",
      key,
      duration: 0,
      className: "modelMessage",
    });

    Axios.post("/api/category/", postData)
      .then((response) => {
        if (response.data.success) {
          getCategories({
            skip: Skip,
            limit: Limit,
          });
          setTimeout(() => {
            message.success({
              content: "Category Successfully Uploaded",
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
      })
      .catch((error) => {
        // error messag => error.response.data.err.message
        if (!error.response.data.success) {
          setTimeout(() => {
            message.error({
              content: "Failed to upload",
              key,
              duration: 2,
              className: "modelMessage",
            });
          }, 1000);
        }
        console.log(error.response);
      });
  };

  const getCategories = (variables) => {
    Axios.post("/api/category/getCategories", variables).then((response) => {
      if (response.data.success) {
        setCategories(response.data.result);
      } else {
        alert("Failed to fectch category datas");
      }
    });
  };
  function handleChange(value) {
    setParentId(value);
  }
  const onChange = (tags) => (checked) => {
    message.loading({
      content: "Action in Progress...",
      key,
      duration: 0,
      className: "modelMessage",
    });
    const postData = {
      _id: tags._id,
      current_status: checked ? "Enabled" : "Disabled",
    };
    Axios.put("/api/category/", postData).then((response) => {
      if (response.data.success) {
        setTimeout(() => {
          message.success({
            content: response.data.message,
            key,
            duration: 2,
            className: "modelMessage",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          message.error({
            content: response.data.message,
            key,
            duration: 2,
            className: "modelMessage",
          });
        }, 1000);
      }
    });
  };

  const handleDelete = (record, index) => {
    // setCategories(Categories.filter((e) => (e._id !== record._id)))
    message.loading({
      content: "Action in Progress...",
      key,
      duration: 0,
      className: "modelMessage",
    });
    const postData = {
      _id: record._id,
    };
    Axios.delete("/api/category/" + record._id).then((response) => {
      if (response.data.success) {
        setCategories(Categories.filter((e) => e._id !== record._id));
        setTimeout(() => {
          message.success({
            content: response.data.message,
            key,
            duration: 2,
            className: "modelMessage",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          message.error({
            content: response.data.message,
            key,
            duration: 2,
            className: "modelMessage",
          });
        }, 1000);
      }
    });
  };
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <>
          <Space>
            <Button
              type="primary"
              onClick={editCategory(record)}
              icon={<FormOutlined />}
            >
              Edit
            </Button>
            <Button icon={<EyeOutlined />} onClick={viewDetail(record)}>
              View
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record, index)}
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      {/*{renderLoader()}*/}
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <Modal
                centered
                visible={viewModal}
                onOk={() => viewModalCancel}
                onCancel={viewModalCancel}
                footer={[
                  <Button key="submit" type="primary" onClick={viewModalCancel}>
                    OK
                  </Button>,
                ]}
              >
                <Descriptions title="Category Info" layout="vertical">
                  <Descriptions.Item label="Category">
                    {UpdateName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Parent Category" span={2}>
                  <Select
                      defaultValue=""
                      disabled
                      value={UpdateParent}
                      onChange={handleUpdateChange}
                    >
                      <Option key="0" value="">
                        None parent
                      </Option>
                      {Categories.map((data, index) => (
                        <Option key={data._id} value={data._id}>
                          {data.name}
                        </Option>
                      ))}
                      ;
                    </Select>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description" span={3}>
                    {UpdateDescription}
                  </Descriptions.Item>
                </Descriptions>
              </Modal>

              <Modal
                title="Update the Category"
                centered
                visible={modal2Visible}
                onOk={() => updateCategory}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="submit"
                    type="primary"
                    loading={Loading}
                    onClick={updateCategory}
                  >
                    Update
                  </Button>,
                ]}
              >
                <Form.Group className="row">
                  <label htmlFor="name" className="col-sm-3 col-form-label">
                    Name
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      value={UpdateName}
                      id="name"
                      placeholder="Name"
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label
                    htmlFor="description"
                    className="col-sm-3 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={UpdateDescription}
                      placeholder="Description"
                      onChange={(e) => setUpdateDescription(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label
                    htmlFor="parent_id"
                    className="col-sm-3 col-form-label"
                  >
                    Parent Id
                  </label>
                  <div className="col-sm-9">
                    <Select
                      defaultValue=""
                      style={{ width: 348 }}
                      value={UpdateParent}
                      onChange={handleUpdateChange}
                    >
                      <Option key="0" value="">
                        Select Parent Id
                      </Option>
                      {Categories.map((data, index) => (
                        <Option key={data._id} value={data._id}>
                          {data.name}
                        </Option>
                      ))}
                      ;
                    </Select>
                  </div>
                </Form.Group>
              </Modal>
              <form className="forms-sample" onSubmit={onSubmit}>
                <Form.Group className="row">
                  <Form.Control
                    type="text"
                    id="title"
                    placeholder="Category Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="row">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={Description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="row">
                  <Select
                    defaultValue=""
                    style={{ width: 420 }}
                    onChange={handleChange}
                  >
                    <Option key="0" value="">
                      Select Parent Id
                    </Option>
                    {Categories.map((data, index) => (
                      <Option key={data._id} value={data._id}>
                        {data.name}
                      </Option>
                    ))}
                    ;
                  </Select>
                </Form.Group>
                <div className="text-right">
                  <button type="submit" className="btn btn-inverse-primary">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <Table columns={columns} dataSource={Categories} rowKey="_id" />
        </div>
      </div>
    </div>
  );
}

export default withRouter(AllCategory);
