import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'

class StudentModal extends Component{

    constructor(props){
        super(props)
        this.state = { 
            student: this.props.student
        }
        this.handleChange = this.handleChange.bind(this);
    }

    postNewStudent(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.student)
        }
        let url = "http://localhost:8080/students/add"
        fetch(url, requestOptions)
            .then(response => console.log(response));
      }

      getStudent(id){
        let query = "http://localhost:8080/students/get/"+id
        fetch(query)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({ student: result});
            },
            (error) => {
                console.log(error);
            })
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
        let student = this.props.student
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
                                value={student.firstName}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input
                                name='lastName'
                                placeholder='Last Name' 
                                value={student.lastName}
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