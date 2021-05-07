import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { withRouter} from 'react-router-dom';

class StudentModal extends Component{

    postNewStudent(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.student)
        }
        let url = "http://localhost:8080/students/add"
        fetch(url, requestOptions)
            .then(response => console.log(response));
        this.props.setOpen(false)
        this.props.history.push("/students")
        let alert = {title: 'Success', message: 'Student Created', type: 'positive ', alertState: true}
        this.props.createAlert(alert);
      }

    putStudent(){
        let student = this.props.student
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        }
        let url = "http://localhost:8080/students/update/"+student.id
        fetch(url, requestOptions)
            .then(response => console.log(response));
        this.props.setOpen(false)
        this.props.history.push("/students")
        let alert = {title: 'Success', message: 'Student info updated', type: 'positive ', alertState: true}
        this.props.createAlert(alert);
    }

    handlePost(){
        if (this.props.student.id === '')
            this.postNewStudent()
        else
            this.putStudent()
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
                                onChange={this.props.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input
                                name='lastName'
                                placeholder='Last Name' 
                                value={student.lastName}
                                onChange={this.props.handleChange}
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
                        content={(this.props.student.id === '')?"Add New Student":"Edit Information"}
                        onClick={() => this.handlePost()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(StudentModal);