import React, { Component, Fragment } from 'react';
import Header from '../header/index'
import StudentsPage from '../pages/index'

class Students extends Component {

  render() {
    return(      
        <Fragment>
            <Header/>
            <StudentsPage/>
        </Fragment>
    )
  }
}

export default Students;