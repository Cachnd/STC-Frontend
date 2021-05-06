import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'

class StudentModal extends Component{

    constructor(props){
        super(props)
        this.state = { 
            open: false, 
            student: { firstName: '', lastName: '', id: '' }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    postNewStudent(){
        console.log(JSON.stringify(this.state.student))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.student)
        }
        let url = "http://localhost:8080/students/add"
        fetch(url, requestOptions)
            .then(response => console.log(response));
      }

      handleChange(event) {
        const value = event.target.value;
        this.setState(prevState => ({
            student: {
                ...prevState.student,
                [event.target.name]: value
            }
        }));
      }

    render (){
        return (
            <Modal
                onClose={() => this.props.setOpen(false)}
                onOpen={() => this.props.setOpen(true)}
                open={this.props.open}        
                >
                <Modal.Header>Created a New Student</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input
                                name="firstName"  
                                placeholder='First Name' 
                                value={this.state.student.firstName}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input
                                name='lastName'
                                placeholder='Last Name' 
                                value={this.state.student.lastName}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        content="Cancel"
                        onClick={() => this.props.setOpen(false)}
                        negative
                    />
                    <Button
                        content="Add New Student"
                        onClick={() => this.postNewStudent()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default StudentModal;










