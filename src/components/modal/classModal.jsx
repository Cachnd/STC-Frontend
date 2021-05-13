import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

class ClassModal extends Component{

    postNewClass(){
        let payload = this.props.class
        axios.post('http://localhost:8080/classes/', payload)
            .then((response) => {
                this.props.setOpen(false)
                let alert = {title: 'Success', message: 'Class Created', type: 'positive ', alertState: true}
                this.props.createAlert(alert)
            })
    }

    putClass(){
        let payload = this.props.class
        let class_code = this.props.class.class_code
        axios.put('http://localhost:8080/classes/'+class_code, payload)
            .then((response) => {
                this.props.setOpen(false)
                let alert = {title: 'Success', message: 'Class info updated', type: 'positive ', alertState: true}
                this.props.createAlert(alert)
            })
    }

    handlePost(){
        if (this.props.class.class_code === '')
            this.postNewClass()
        else
            this.putClass()
    }

    getClass(class_code){
        axios.get('http://localhost:8080/classes/')
            .then((response) => {
                this.setState({ class: response.data })
            })
            .catch((error) => {
                console.log(error)
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