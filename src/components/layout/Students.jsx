import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Header from '../header/index'
import StudentsPage from '../pages/index'

class Students extends Component {

  render() {
    return(      
        <Segment>
            <Header/>
            <StudentsPage/>
        </Segment>
    )
  }
}

export default Students;