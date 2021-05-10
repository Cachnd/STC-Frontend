import React, { Component, Fragment } from 'react';
import { Segment } from 'semantic-ui-react'
import Header from '../header/index'

class Classes extends Component {

  render() {
    return(      
      <Fragment>
        <Header/>
        <Segment>Classes</Segment>
      </Fragment>
    )
  }
}

export default Classes;