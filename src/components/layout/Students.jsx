import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Header from '../header/index'
import Table from '../table/index'

class Students extends Component {

  render() {
    return(      
        <Segment>
            <Header/>
            <Table/>
        </Segment>
    )
  }
}

export default Students;