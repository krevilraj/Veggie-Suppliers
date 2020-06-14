import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import '../material.css';
import Axios from "axios";
import {Button, message, Popconfirm, Space, Switch, Table} from 'antd';
import {DeleteOutlined, EyeOutlined, FormOutlined} from '@ant-design/icons';


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
  const [Loading, setLoading] = useState([])

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

    message.loading({content: 'Action in Progress...', key, duration: 0, className: "modelMessage"});
    const postData = {
      _id: tags._id,
      'current_status': checked ? 'Enabled' : 'Disabled'
    }
    Axios.put('/api/product/', postData)
      .then(response => {
        if (response.data.success) {
          setTimeout(() => {
            message.success({content: response.data.message, key, duration: 2, className: "modelMessage"});
          }, 1000);
        } else {
          setTimeout(() => {
            message.error({content: response.data.message, key, duration: 2, className: "modelMessage"});
          }, 1000);

        }
      })
  }
  
  const handleDelete = (record, index) => {
    // setProducts(Products.filter((e) => (e._id !== record._id)))
     message.loading({content: 'Action in Progress...', key, duration: 0, className: "modelMessage"});
     const postData = {
       _id: record._id,
     }
     Axios.delete('/api/product/'+record._id)
       .then(response => {
         if (response.data.success) {
           setProducts(Products.filter((e)=>(e._id !== record._id)))
           setTimeout(() => {
             message.success({content: response.data.message, key, duration: 2, className: "modelMessage"});
           }, 1000);
         } else {
           setTimeout(() => {
             message.error({content: response.data.message, key, duration: 2, className: "modelMessage"});
           }, 1000);

         }

       })
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
                      src="../../images/imagenotfound.jpg"/>
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
      render: (text, record, index) => (
        <>
          <Space>
            <Link to={record._id}>
              <Button type="primary" icon={<FormOutlined/>}>Edit</Button>
            </Link>
            <Button icon={<EyeOutlined/>}>View</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record, index)}>
              <Button type="danger" icon={<DeleteOutlined/>}
              >Delete</Button>
            </Popconfirm>
          </Space>

        </>
      ),
    },
  ];
  return (
    <div>
      {/*{renderLoader()}*/}
      <Table columns={columns} dataSource={Products} rowKey="_id"/>
    </div>

  );
}

export default withRouter(AllProduct)