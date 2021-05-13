import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'

class ClassModal extends Component{

    postNewClass(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.class)
        }
        let url = "http://localhost:8080/classes/add"
        fetch(url, requestOptions)
            .then(response => {
                console.log(response)
                this.props.setOpen(false)
                let alert = {title: 'Success', message: 'Class Created', type: 'positive ', alertState: true}
                this.props.createAlert(alert)
            });
    }

    putClass(){
        let classroom = this.props.class
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classroom)
        }
        let url = "http://localhost:8080/classes/update/"+classroom.code
        fetch(url, requestOptions)
            .then(response => {
                console.log(response)                
                this.props.setOpen(false)
                let alert = {title: 'Success', message: 'Class info updated', type: 'positive ', alertState: true}
                this.props.createAlert(alert)
            });
    }

    handlePost(){
        if (this.props.class.code === '')
            this.postNewClass()
        else
            this.putClass()
    }

    getClass(code){
        let query = "http://localhost:8080/classes/get/"+code
        fetch(query)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({ class: result});
            },
            (error) => {
                console.log(error);
            })
    }

    render (){
        let classroom = this.props.class
        return (
            <Modal
                onClose={() => this.props.setOpen(false)}
                onOpen={() => this.props.setOpen(true)}
                open={this.props.open}
                >
                <Modal.Header>{(this.props.class.class_code === '')?"Create a new Class":"Edit Information"}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                name="title"  
                                placeholder='Title' 
                                value={classroom.title}
                                onChange={this.props.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input
                                name='description'
                                placeholder='Description' 
                                value={classroom.description}
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
                        content={(this.props.class.class_code === '')?"Add New Class":"Edit Information"}
                        onClick={() => this.handlePost()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ClassModal