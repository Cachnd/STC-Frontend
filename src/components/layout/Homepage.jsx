import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Header from '../header/index'

class HomePage extends Component {

  render() {
    return(      
        <Segment>
            <Header/>
            Welcome
        </Segment>
    )
  }
}

export default HomePage;