import React, { Component } from 'react';
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react'

class AssignModal extends Component{
        
    handlePost(){
        console.log("post")
    }

    render (){
        return (
            <Modal
                onClose={() => this.props.setOpen(false)}
                onOpen={() => this.props.setOpen(true)}
                open={this.props.open}
                >
                <Modal.Header>Assign Student to Class</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                           <Dropdown
                                placeholder="Select a Student"
                                fluid
                                selection
                                search
                                options={this.props.options}
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
                        content="Assign"
                        onClick={() => this.handlePost()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AssignModal