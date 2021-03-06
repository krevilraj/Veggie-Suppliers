import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {loginUser} from "../../../_actions/user_actions";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Checkbox, Form, Input, Typography} from 'antd';
import {useDispatch} from "react-redux";
import Icon from '@ant-design/icons';

const {Title} = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="">
            <div className="breadcrumb-area">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <ul className="breadcrumb-list">
                      <li className="breadcrumb-item"><a href="/">Home</a></li>
                      <li className="breadcrumb-item active">login</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content-wrap section-ptb lagin-and-register-page">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                    <div className="login-register-wrapper">
                          <h2 className="text-center" style={{padding: "40px 0"}}>Log In</h2>
                      <div className="tab-content">
                        <div id="lg1" className="tab-pane active">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form onSubmit={handleSubmit}>
                                <div className="login-input-box">
                                  <Form.Item required>
                                    <Input
                                      id="email"
                                      prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                      placeholder="Enter your email"
                                      type="email"
                                      value={values.email}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                      }
                                    />
                                    {errors.email && touched.email && (
                                      <div className="input-feedback">{errors.email}</div>
                                    )}
                                  </Form.Item>
                                  <Form.Item required>
                                    <Input
                                      id="password"
                                      prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                      placeholder="Enter your password"
                                      type="password"
                                      value={values.password}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                      }
                                    />
                                    {errors.password && touched.password && (
                                      <div className="input-feedback">{errors.password}</div>
                                    )}
                                  </Form.Item>

                                  {formErrorMessage && (
                                    <label><p style={{
                                      color: '#ff0000bf',
                                      fontSize: '0.7rem',
                                      border: '1px solid',
                                      padding: '1rem',
                                      borderRadius: '10px'
                                    }}>{formErrorMessage}</p></label>
                                  )}

                                  <Form.Item>
                                    <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>Remember
                                      me</Checkbox>
                                    <a className="login-form-forgot" href="/reset_user" style={{float: 'right'}}>
                                      forgot password
                                    </a>
                                    <div className="button-box">
                                      <button className="register-btn btn-1" type="submit"
                                              disabled={isSubmitting} onSubmit={handleSubmit}><span>Log in</span>
                                      </button>
                                    </div>

                                    Or <a href="/register">register now!</a>

                                  </Form.Item>


                                </div>

                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


