import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import '../material.css';
import Axios from "axios";
import {Button, Switch, Table,Space} from 'antd';


// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';


function AllProduct(props) {
  var Loader = require('react-loaders').Loader;


  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [sLoading, setLoading] = useState([])

  useEffect(() => {

    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProducts(variables)

  }, [])

  const getProducts = (variables) => {
    Axios.post('/api/product/getProducts', variables)
      .then(response => {
        if (response.data.success) {
          setProducts(response.data.products)
        } else {
          alert('Failed to fectch product datas')
        }
      })
  }

  const onChange = tags => (checked) => {
    const newLoadings = [...sLoading];
    if (sLoading[tags._id]) {
      newLoadings[tags._id] = false;
      setLoading(newLoadings);
    }
    else {
      newLoadings[tags._id] = true;
      setLoading(newLoadings);
    }

  }
  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: imagesrc => {
        if (imagesrc[0]) {
          return <img width={50}
                      src={`http://localhost:5000/${imagesrc[0]}`}/>
        }
        else {
          return <img width={50}
                      src="../images/imagenotfound.jpg"/>
        }
      }

    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Short Descripion',
      dataIndex: 'short_description',
      key: 'short_description',
    },
    {
      title: 'Status',
      key: 'current_status',
      render: (text, record) => {
        if (record.current_status === "Enabled") {
          return (

            <Switch defaultChecked loading={sLoading[record._id]} checkedChildren="Active" unCheckedChildren="Inactive"
                    onChange={onChange(record)}/>
          );
        } else {
          return (<Switch loading={sLoading[record._id]} checkedChildren="Active" unCheckedChildren="Inactive"
                          onChange={onChange(record)}/>);
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Space>
            <Button type="primary">Edit</Button>
            <Button>View</Button>
            <Button type="danger">Delete</Button>
          </Space>

        </>
      ),
    },
  ];
  return (
    <div>
      <Loader type="ball-pulse-sync"/>
      <Table columns={columns} dataSource={Products}/>
    </div>

  );
}

export default withRouter(AllProduct)