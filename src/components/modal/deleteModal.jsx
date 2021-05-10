import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import { withRouter} from 'react-router-dom';

class DeleteModal extends Component{

    render (){
        return (
            <Modal
                onClose={() => this.props.setOpen(false)}
                onOpen={() => this.props.setOpen(true)}
                open={this.props.open}
                >
                <Modal.Header>{this.props.data.title}</Modal.Header>
                <Modal.Content>
                    {this.props.data.message}
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        content="Cancel"
                        onClick={() => this.props.setOpen(false)}
                        secondary
                    />
                    <Button
                        content="Delete"
                        onClick={this.props.handleDelete}
                        negative
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(DeleteModal);