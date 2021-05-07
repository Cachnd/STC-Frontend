import React from 'react'
import { withRouter} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Header extends React.Component{

    toHome = () => {
        this.props.history.push("/")
    }

    toStudents = () => {
        this.props.history.push("/students")
    }

    toClasses = () => {
        this.props.history.push("/classes")
    }

    render(){
        return(
            <Menu
                inverted
                attached="top">
                <Menu.Item onClick={this.toHome}>
                    Home
                </Menu.Item>
                <Menu.Item onClick={this.toStudents}>
                    Students
                </Menu.Item>
                <Menu.Item onClick={this.toClasses}>
                    Classes
                </Menu.Item>
            </Menu>
        )
    }

}

export default withRouter(Header)