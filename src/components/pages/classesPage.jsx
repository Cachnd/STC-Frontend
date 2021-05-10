import React from 'react'
import { Table, Button, Icon, Segment } from 'semantic-ui-react';
import ClassModal from '../modal/classModal'
import DeleteModal from '../modal/deleteModal'
import AssignModal from '../modal/assignModal'
import Message from '../message/index'

class ClassesPage extends React.Component{

  constructor(props){
    super(props)
    this.state = { classes: [{title: null, description: null, code: null}] ,
                  editModalState: false,
                  selectedClass: {title: '', description: '', code: ''},
                  alert: {title: '', message: '', type: '', alertState: false,},
                  deleteModalState: false,
                  deleteModal: {title: '', message: '', code: ''},
                  assignModalOptions: [],
                  assignModalState: false
                 }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getClassesList = this.getClassesList.bind(this);
  }

  componentDidMount() {
    this.getClassesList();
  }

  getClassesList(){
    let query = "http://localhost:8080/classes/all"
    fetch(query)
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({ classes: result});
        },
        (error) => {
            console.log(error);
        })
  }

  getClass(code){
    let query = "http://localhost:8080/classes/get/"+code
    fetch(query)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            this.setState({ selectedClass: result, editModalState: true});
        },
        (error) => {
            console.log(error);
        })
  }

  editModalState = (state, code) => {
    if (typeof code != "undefined"){
      this.getClass(code, state)
    }
    else{
      this.setState({
        editModalState: state, 
        selectedClass: { title: '', description: '', code: '' }
      })
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(prevState => ({
        selectedClass: {
            ...prevState.selectedClass,
            [event.target.name]: value
        }
    }));
  }

  handleAlert = (state) => {
    this.setState(prevState => ({
      alert: {
          ...prevState.alert,
          alertState: state
      }
    }));
  }

  deleteModalState = (state, classroom) => {
    if (typeof classroom == "undefined"){
      this.setState({deleteModalState: state})
    }
    else
      this.setState(prevState => ({
        deleteModal: {
            title: "Delete",
            message: "Are you sure you want to Delete: " + classroom.title,
            code: classroom.code
        },
        deleteModalState: state
      }));   
  }

  handleDelete () {
    console.log("DELETE")
        const requestOptions = {
            method: 'DELETE',
        }
        let url = "http://localhost:8080/classes/delete/"+this.state.deleteModal.code
        fetch(url, requestOptions)
            .then(response => {
              console.log(response)
              this.deleteModalState(false)
              let alert = {title: 'Success', message: 'Class Deleted', type: 'positive', alertState: true}
              this.createAlert(alert);                  
            });
  }

  createAlert = (alert) => {
    this.setState({alert: alert})
    this.getClassesList()
  }

  getClassToAssign (code){
    let query = "http://localhost:8080/classes/get/"+code
    fetch(query)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            this.setState({ selectedClass: result, assignModalState: true});
        },
        (error) => {
            console.log(error);
        })
    query = "http://localhost:8080/students/all"
    fetch(query)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            let options = []
            let index = ''
            let student = {id: '', firstName: '', lastName: ''}
            for (index in result){
              student = result[index]
              options.push({key: student.id, value: student.id, text: student.firstName+" "+student.lastName})
            }
            this.setState({ assignModalOptions: options});
        },
        (error) => {
            console.log(error);
        })
  }

  assignModalState = (state, code) => {
    if (typeof code != "undefined"){
      this.getClassToAssign(code)
    }
    else{
      this.setState({
        assignModalState: state, 
        selectedClass: { title: '', description: '', code: '' }
      })
    }
  }


//The warning for "findDOMNode is deprecated in StrictMode" it's on the Button component 

    render(){
      let classes = this.state.classes
      let editModalState = this.state.editModalState
      let deleteModalState = this.state.deleteModalState
      let selectedClass = this.state.selectedClass
      let deleteModal = this.state.deleteModal
      let alert = this.state.alert
      let assignModalState = this.state.assignModalState
        return(
          <Segment>
            <Message alertData={alert}
              setOpen={this.handleAlert}
            />
            <div>
              <Button
                icon
                labelPosition='left'
                primary
                size='small'
                onClick={() => this.editModalState(true)}
              >
                <Icon name='user'/>New Class
              </Button>
              <ClassModal open={editModalState} class={selectedClass} 
                setOpen={this.editModalState}
                handleChange={this.handleChange}
                createAlert={this.createAlert}
                update={this.getClassesList}
              />
              <DeleteModal open={deleteModalState}
                setOpen={this.deleteModalState}
                handleDelete={this.handleDelete}
                data={deleteModal}
              />
              <AssignModal open={assignModalState}
                  setOpen={this.assignModalState}
                  class={selectedClass}
                  options={this.state.assignModalOptions}
              />
            </div>
            <Table compact celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell colSpan='1'>Edit</Table.HeaderCell>
                  <Table.HeaderCell colSpan='1'>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {classes.map((classroom) => 
                  <Table.Row key={classroom.code}>
                    <Table.Cell>{classroom.title}</Table.Cell>
                    <Table.Cell>{classroom.description}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic onClick={() => this.editModalState(true, classroom.code)}>
                        <Icon name='edit'/>Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic onClick={() => this.assignModalState(true, classroom.code)}>
                        <Icon name='list alternate outline'/>Assign
                      </Button>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic negative onClick={() => this.deleteModalState(true, classroom)}>
                        <Icon name='trash'/>Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row> 
                )}             
              </Table.Body>        
            </Table>
          </Segment>
        )
    }

}

export default ClassesPage