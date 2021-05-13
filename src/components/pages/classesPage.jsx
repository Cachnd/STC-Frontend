import React from 'react'
import { Table, Button, Icon, Segment } from 'semantic-ui-react';
import ClassModal from '../modal/classModal'
import DeleteModal from '../modal/deleteModal'
import AssignModal from '../modal/assignModal'
import Message from '../message/index'

class ClassesPage extends React.Component{

  constructor(props){
    super(props)
    this.state = { classes: [{title: null, description: null, class_code: null}] ,
                  editModalState: false,
                  selectedClass: {title: '', description: '', class_code: ''},
                  alert: {title: '', message: '', type: '', alertState: false,},
                  deleteModalState: false,
                  deleteModal: {title: '', message: '', class_code: ''},
                  assignModalOptions: [],
                  assignModalState: false,
                  studentId: ''
                 }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getClassesList = this.getClassesList.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  getClass(class_code){
    let query = "http://localhost:8080/classes/"+class_code
    const options = { method: 'GET' }
    fetch(query, options)
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

  editModalState = (state, class_code) => {
    if (typeof class_code != "undefined"){
      this.getClass(class_code, state)
    }
    else{
      this.setState({
        editModalState: state, 
        selectedClass: { title: '', description: '', class_code: '' }
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
            class_code: classroom.class_code
        },
        deleteModalState: state
      }));   
  }

  handleDelete () {
    console.log("DELETE")
        const requestOptions = {
            method: 'DELETE',
        }
        let url = "http://localhost:8080/classes/delete/"+this.state.deleteModal.class_code
        fetch(url, requestOptions)
            .then(response => {
              console.log(response)
              this.deleteModalState(false)
              let alert = {}
              if (response.status !== 204){
                alert = {title: 'Error', message: 'Class can\'t be Deleted it was assigned to at least one Student', 
                          type: 'negative', alertState: true}
              }
              else {
                alert = {title: 'Success', message: 'Student Deleted', type: 'positive', alertState: true}
              } 
              this.createAlert(alert);                  
            });
  }

  createAlert = (alert) => {
    this.setState({alert: alert})
    this.getClassesList()
  }

  getClassToAssign (class_code){
    let query = "http://localhost:8080/classes/"+class_code
    const options = { method: 'GET' }
    fetch(query, options)
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
            let student = {student_id: '', firstName: '', lastName: ''}
            for (index in result){
              student = result[index]
              options.push({key: student.student_id, value: student.student_id, text: student.firstName+" "+student.lastName})
            }
            this.setState({ assignModalOptions: options});
        },
        (error) => {
            console.log(error);
        })
  }

  assignModalState = (state, class_code) => {
    if (typeof class_code != "undefined"){
      this.getClassToAssign(class_code)
    }
    else{
      this.setState({
        assignModalState: state, 
        selectedClass: { title: '', description: '', class_code: '' }
      })
    }
  }

  handleAssign (id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({class_code: this.state.selectedClass.class_code, student_id: this.state.studentId})
    }
    let url = "http://localhost:8080/classes/assign/"
    fetch(url, requestOptions)
        .then(response => {
          console.log(response)
          this.assignModalState(false)
          let alert = {title: 'Success', message: 'Student Assigned', type: 'positive', alertState: true}
          this.createAlert(alert);
        });
  }

  handleSelect(event, data) {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    this.setState({studentId: key})
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
                  handlePost={this.handleAssign}
                  handleChange={this.handleSelect}
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
                  <Table.Row key={classroom.class_code}>
                    <Table.Cell>{classroom.title}</Table.Cell>
                    <Table.Cell>{classroom.description}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic onClick={() => this.editModalState(true, classroom.class_code)}>
                        <Icon name='edit'/>Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic onClick={() => this.assignModalState(true, classroom.class_code)}>
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