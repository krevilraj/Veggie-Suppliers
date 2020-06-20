import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Alert, Tooltip, Modal, Button } from "antd";
import FlipMove from "react-flip-move";

function ProductFAQ(props) {
  const [FAQ, setFAQ] = useState(
    props.faq ? props.faq : []
  );
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  const [UpdateIndex, setUpdateIndex] = useState(-1);
  const [UpdateQuestion, setUpdateQuestion] = useState("");
  const [UpdateAnswer, setUpdateAnswer] = useState("");
  const [isActive, setActive] = useState([]);
  const [modelVisible, setModelVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const btnClick = () => {
    const variable = {
      question: Question,
      answer: Answer,
    };
    setFAQ([...FAQ, variable]);
    props.refreshFunction([...FAQ, variable]);
  };
  const handleCancel =  () => {
    setModelVisible(false);
    setActive([]);
  };
  const editFAQ = (faq) => (s) => {
    let index = FAQ.indexOf(faq);
    
    setActive([]);
    setUpdateIndex(index);
    setUpdateQuestion(faq.question);
    setUpdateAnswer(faq.answer);
    setModelVisible(true);
  };
  const updateFAQ = () => {
    setLoading(true);    
    let newFAQ = [...FAQ];
    newFAQ[UpdateIndex] = {
      question: UpdateQuestion,
      answer: UpdateAnswer
    };
    setFAQ(newFAQ);
    props.refreshFunction(newFAQ);
    setLoading(false); 
    setModelVisible(false)
    setActive([]);
  };

  const DeleteFAQ = (faq) => (e) => {
    const currentIndex = FAQ.indexOf(faq);
    let newFAQ = [...FAQ];
    newFAQ.splice(currentIndex, 1);
    setFAQ(newFAQ);
    props.refreshFunction(newFAQ);
  };

  return (
    <div>
      <blockquote className="blockquote">
        <Form.Group className="row">
          <label htmlFor="question" className="col-sm-3 col-form-label">
            Question
          </label>
          <div className="col-sm-9">
            <Form.Control
              type="text"
              id="question"
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="row">
          <label htmlFor="answer" className="col-sm-3 col-form-label">
            Answer
          </label>
          <div className="col-sm-9">
            <Form.Control
              type="text"
              id="answer"
              placeholder="Answer"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </Form.Group>

        <div className="text-right">
          <button
            type="button"
            className="btn btn-inverse-primary"
            onClick={btnClick}
          >
            Add new faq
          </button>
        </div>
        
        <Modal
          title="Update the FAQ"
          centered
          visible={modelVisible}
          onOk={() => updateFAQ}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={updateFAQ}
            >
              Update
            </Button>,
          ]}
        >
          <Form.Group className="row">
            <label htmlFor="question" className="col-sm-3 col-form-label">
              Question
            </label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                value={UpdateQuestion}
                id="question"
                placeholder="Question"
                onChange={(e) => setUpdateQuestion(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="answer" className="col-sm-3 col-form-label">
              Answer
            </label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                id="answer"
                value={UpdateAnswer}
                placeholder="Answer"
                onChange={(e) => setUpdateAnswer(e.target.value)}
              />
            </div>
          </Form.Group>
        </Modal>
      </blockquote>
      <FlipMove duration={250} easing="ease-out">
        {FAQ.map((data, index) => (
          <div
            key={index}
            className={`faq-block ${
              isActive[index] ? "faq-active" : ""
            }`}
          >
            <Tooltip
              placement="topLeft"
              placement="topLeft"
              color="green"
              question="Tap to Change"
            >
              <Alert
                onClick={editFAQ(data)}
                message={++index +". "+ data.question}
                description={data.answer}
                type="info"
                afterClose={DeleteFAQ(data)}
                closable
              />
            </Tooltip>
          </div>
        ))}
      </FlipMove>
    </div>
  );
}

export default ProductFAQ;
