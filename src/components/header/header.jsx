import React from 'react'
import { withRouter} from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';

class Header extends React.Component{

    render(){
        return(
            <Menu
                fixed
                inverted
                attached="top">
                <Menu.Item>
                    Home
                </Menu.Item>
                <Menu.Item>
                    Students
                </Menu.Item>
                <Menu.Item>
                    Classes
                </Menu.Item>
            </Menu>
        )
    }

}

export default withRouter(Header)