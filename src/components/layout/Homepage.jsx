import React, { Component, Fragment } from 'react';
import { Segment } from 'semantic-ui-react'
import Header from '../header/index'

class HomePage extends Component {

  render() {
    return(      
        <Fragment>
            <Header/>
            <Segment>
              HomePage
            </Segment>
        </Fragment>
    )
  }
}

export default HomePage;