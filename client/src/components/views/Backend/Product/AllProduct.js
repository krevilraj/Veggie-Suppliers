import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import '../material.css';
import Axios from "axios";
import {Button, message, Space, Switch, Table} from 'antd';


// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';


function AllProduct(props) {
  var Loader = require('react-loaders').Loader;
  const key = 'updatable';


  function renderLoader() {
    return Loading ? <Loader type="line-scale" active/> : '';
  }

  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [Loading, setLoading] = useState(false)

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
    message.loading({content: 'Loading...', key, duration: 0,className:"modelMessage"});
    console.log(checked);
    setLoading(!Loading)
  }
  const onChange1 = () => {
    setTimeout(() => {
      message.success({content: 'Loaded!', key, duration: 2,className:"modelMessage"});
    }, 1000);
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
        /*let load = sLoading;
        load[record._id] = false;
        setLoading(load);
        /!*setLoading([...sLoading => sLoading[record._id] = false])*!/*/
        if (record.current_status === "Enabled") {
          return (

            <Switch defaultChecked loading={Loading[record._id]} checkedChildren="Active" unCheckedChildren="Inactive"
                    onChange={onChange(record)}/>
          );
        } else {
          return (<Switch loading={Loading[record._id]} checkedChildren="Active" unCheckedChildren="Inactive"
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
            <Button type="primary" onClick={onChange1}>Edit</Button>
            <Button>View</Button>
            <Button type="danger">Delete</Button>
          </Space>

        </>
      ),
    },
  ];
  return (
    <div>
      {renderLoader()}
      <Table columns={columns} dataSource={Products} rowKey="_id"/>
    </div>

  );
}

export default withRouter(AllProduct)