import React, { Component, Fragment } from 'react';
import Header from '../header/index'
import ClassesPage from '../pages/classesPage';


class Classes extends Component {

  render() {
    return(      
      <Fragment>
        <Header/>
        <ClassesPage/>
      </Fragment>
    )
  }
}

export default Classes;