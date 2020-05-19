import React, {useEffect} from 'react';
import {auth} from '../_actions/user_actions';
import {useDispatch, useSelector} from "react-redux";

export default function (ComposedClass, reload, adminRoute = null, role = []) {
  function AuthenticationCheck(props) {

    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      var adminindex = role.indexOf('admin');

      if (~adminindex) {
        role[adminindex] = 1;
      }
      var managerindex = role.indexOf('shop-manager');

      if (~managerindex) {
        role[managerindex] = 2;
      }

      dispatch(auth()).then(async response => {
        if (await !response.payload.isAuth) {
            props.history.push('/login')
        } else {
          if (!role.includes(response.payload.role)) {
              props.history.push('/401')
          }

        }
      })

    }, [dispatch, props.history, user.googleAuth])

    return (
      <ComposedClass {...props} user={user}/>
    )
  }

  return AuthenticationCheck
}


