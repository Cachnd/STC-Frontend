import React from 'react'
import { Table, Button, Icon, Segment } from 'semantic-ui-react';
import StudentModal from '../modal/studentModal'
import DeleteModal from '../modal/deleteModal'
import Message from '../message/index'

class StudentsPage extends React.Component{

  constructor(props){
    super(props)
    this.state = { students: [{firstName: null, lastName: null, student_id: null}] ,
                  editModalState: false,
                  selectedStudent: {firstName: '', lastName: '', student_id: ''},
                  alert: {title: '', message: '', type: '', alertState: false,},
                  deleteModalState: false,
                  deleteModal: {title: '', message: '', id: ''}
                 }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getStudentList = this.getStudentList.bind(this);
  }

  componentDidMount() {
    this.getStudentList();
  }

  getStudentList(){
    let query = "http://localhost:8080/students/all"
    fetch(query)
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({ students: result});
        },
        (error) => {
            console.log(error);
        })
  }

  getStudent(student_id){
    let query = "http://localhost:8080/students/"+student_id
    let options = {method: 'GET'}
    fetch(query, options)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            this.setState({ selectedStudent: result, editModalState: true});
        },
        (error) => {
            console.log(error);
        })
  }

  editModalState = (state, student_id) => {
    if (typeof student_id != "undefined"){
      this.getStudent(student_id, state)
    }
    else{
      this.setState({
        editModalState: state, 
        selectedStudent: { firstName: '', lastName: '', student_id: '' }
      })
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(prevState => ({
        selectedStudent: {
            ...prevState.selectedStudent,
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

  deleteModalState = (state, student) => {
    if (typeof student == "undefined"){
      this.setState({deleteModalState: state})
    }
    else
      this.setState(prevState => ({
        deleteModal: {
            title: "Delete",
            message: "Are you sure you want to Delete: "  + 
                      student.firstName + " " + student.lastName,
                      student_id: student.student_id
        },
        deleteModalState: state
      }));   
  }

  handleDelete () {
    const requestOptions = {
        method: 'DELETE',
    }
    let url = "http://localhost:8080/students/"+this.state.deleteModal.student_id
    fetch(url, requestOptions)
        .then(response => {
          console.log(response)
          this.deleteModalState(false)
          let alert = {}
          if (response.status !== 204){
            alert = {title: 'Error', message: 'Student can\'t be Deleted it was Assigned to a Class', 
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
    this.getStudentList()
  }


//The warning for "findDOMNode is deprecated in StrictMode" it's on the Button component 

    render(){
      let students = this.state.students
      let editModalState = this.state.editModalState
      let deleteModalState = this.state.deleteModalState
      let selectedStudent = this.state.selectedStudent
      let deleteModal = this.state.deleteModal
      let alert = this.state.alert
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
                <Icon name='user'/>New Student
              </Button>
              <StudentModal open={editModalState} student={selectedStudent} 
                setOpen={this.editModalState}
                handleChange={this.handleChange}
                createAlert={this.createAlert}
                update={this.getStudentList}
              />
              <DeleteModal open={deleteModalState}
                setOpen={this.deleteModalState}
                handleDelete={this.handleDelete}
                data={deleteModal}
              />
            </div>
            <Table compact celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell colSpan='1'>Edit</Table.HeaderCell>
                  <Table.HeaderCell colSpan='1'>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {students.map((student) => 
                  <Table.Row key={student.student_id}>
                    <Table.Cell>{student.firstName}</Table.Cell>
                    <Table.Cell>{student.lastName}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic onClick={() => this.editModalState(true, student.student_id)}>
                        <Icon name='edit'/>Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic negative onClick={() => this.deleteModalState(true, student)}>
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

export default StudentsPage