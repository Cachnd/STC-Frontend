import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'

class StudentModal extends Component{

    state = { open: false }

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
                    <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                </Form.Field>
            </Form>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button 
                content="Cancel"
                negative
                onClick={() => this.props.setOpen(false)}
            />
            <Button
                content="Add New Student"
                onClick={() => this.props.setOpen(false)}
                positive
            />
        </Modal.Actions>
        </Modal>
    )}
}

export default StudentModal;










