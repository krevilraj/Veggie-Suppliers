import React from 'react';
import NavBar from "./views/NavBar/NavBar";

export default ({children}) => (
  <>
    <NavBar/>
    {children}

  </>
);
