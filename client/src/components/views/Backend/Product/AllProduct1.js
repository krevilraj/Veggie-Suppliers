import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from "react-router-dom";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page
} from '@syncfusion/ej2-react-grids';
import '../material.css';
import Axios from "axios";
import {Badge, Button,Spin } from 'antd';
import { Switch } from 'antd';


// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';


function AllProduct1(props) {
  var Loader = require('react-loaders').Loader;


  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [loading, setLoading] = useState(false)
  const spinner = loading ? (
    <Spin size="large" className="spinner" />
  ) : null;
  const renderLoader = loading ? (
    <span><Loader type="line-scale" active /> Please wait...</span>
  ) : null;
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

  const imageTemplate = (props) => {
    if (props.images[0]) {
      return (<img src={`http://localhost:5000/${props.images[0]}`}/>);
    } else {
      return (<img src="../images/imagenotfound.jpg"/>);
    }

  }

  const statusTemplate = (props) => {
    function onChange(checked) {
      console.log(`switch to ${checked} ${props._id}`);
    }
    const toggleStatus = (e) => {

     /* if(loading){
        setLoading(false);console.log("1"+loading);
      }

      else{

        setLoading(true);console.log("2"+loading);
      }*/
      setLoading(loading => !loading);
      console.log(loading);

    }


    if (props.current_status === "Enabled") {
      return (
        
        <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" onChange={onChange} />
      );
    } else {
      return (<Switch  checkedChildren="Active" unCheckedChildren="Inactive" onChange={onChange} />);
    }

  }

  return (
    <div>
      {spinner}
      <Loader type="ball-pulse-sync" />
      {renderLoader}
      <GridComponent dataSource={Products}
                     allowPaging={true}
                     pageSettings={{pageSize: 6}}
                     allowFiltering={true}
                     allowGrouping={true}
      >
        <ColumnsDirective>
          <ColumnDirective field='image' headerText='Image' template={imageTemplate} width='100'/>
          <ColumnDirective field='title' headerText='Product Name' textAlign='Right' width='150'/>
          <ColumnDirective field='short_description' headerText='Short Description' width='250'/>
          <ColumnDirective field='current_status' template={statusTemplate} headerText='Status'/>
        </ColumnsDirective>
        <Inject services={[Page, Filter, Group]}/>
      </GridComponent>
    </div>

  );
}

export default withRouter(AllProduct1)