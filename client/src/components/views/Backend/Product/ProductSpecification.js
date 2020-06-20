import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Alert, Tooltip, Modal, Button } from "antd";
import FlipMove from "react-flip-move";
import { updateLocale } from "moment";

function ProductSpecification(props) {
  const [Specification, setSpecification] = useState(
    props.specification ? props.specification : []
  );
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [UpdateIndex, setUpdateIndex] = useState(-1);
  const [UpdateTitle, setUpdateTitle] = useState("");
  const [UpdateDescription, setUpdateDescription] = useState("");
  const [isActive, setActive] = useState([]);
  const [modal2Visible, setmodal2Visible] = useState(false);
  const [loading, setLoading] = useState(false);

  const btnClick = () => {
    const variable = {
      title: Title,
      description: Description,
    };
    setSpecification([...Specification, variable]);
    props.refreshFunction([...Specification, variable]);
  };
  const handleCancel =  () => {
    setmodal2Visible(false);
    setActive([]);
  };
  const editSpecification = (specification) => (s) => {
    let index = Specification.indexOf(specification);
    
    setActive([]);
    setUpdateIndex(index);
    setUpdateTitle(specification.title);
    setUpdateDescription(specification.description);
    setmodal2Visible(true);
  };
  const updateSpecification = () => {
    setLoading(true);    
    let newSpecification = [...Specification];
    newSpecification[UpdateIndex] = {
      title: UpdateTitle,
      description: UpdateDescription
    };
    setSpecification(newSpecification);
    props.refreshFunction(newSpecification);
    setLoading(false); 
    setmodal2Visible(false)
    setActive([]);
  };

  const DeleteSpecification = (specification) => (e) => {
    const currentIndex = Specification.indexOf(specification);
    let newSpecification = [...Specification];
    newSpecification.splice(currentIndex, 1);
    setSpecification(newSpecification);
    props.refreshFunction(newSpecification);
  };

  return (
    <div>
      <blockquote className="blockquote">
        <Form.Group className="row">
          <label htmlFor="title" className="col-sm-3 col-form-label">
            Title
          </label>
          <div className="col-sm-9">
            <Form.Control
              type="text"
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="row">
          <label htmlFor="description" className="col-sm-3 col-form-label">
            Description
          </label>
          <div className="col-sm-9">
            <Form.Control
              type="text"
              id="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Form.Group>

        <div className="text-right">
          <button
            type="button"
            className="btn btn-inverse-primary"
            onClick={btnClick}
          >
            Add new specification
          </button>
        </div>
        
        <Modal
          title="Update the Specification"
          centered
          visible={modal2Visible}
          onOk={() => updateSpecification}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={updateSpecification}
            >
              Update
            </Button>,
          ]}
        >
          <Form.Group className="row">
            <label htmlFor="title" className="col-sm-3 col-form-label">
              Title
            </label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                value={UpdateTitle}
                id="title"
                placeholder="Title"
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-sm-3 col-form-label">
              Description
            </label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                id="description"
                value={UpdateDescription}
                placeholder="Description"
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </div>
          </Form.Group>
        </Modal>
      </blockquote>
      <FlipMove duration={250} easing="ease-out">
        {Specification.map((data, index) => (
          <div
            key={index}
            className={`specification-block ${
              isActive[index] ? "spec-active" : ""
            }`}
          >
            <Tooltip
              placement="topLeft"
              placement="topLeft"
              color="green"
              title="Tap to Change"
            >
              <Alert
                onClick={editSpecification(data)}
                message={++index +". "+ data.title}
                description={data.description}
                type="info"
                afterClose={DeleteSpecification(data)}
                closable
              />
            </Tooltip>
          </div>
        ))}
      </FlipMove>
    </div>
  );
}

export default ProductSpecification;
