import React from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react';
import StudentModal from '../modal/studentModal'
import DeleteModal from '../modal/deleteModal'
import Message from '../message/index'
import axios from 'axios'
import CustomTable from '../table/customTable';

class StudentsPage extends React.Component{

  constructor(props){
    super(props)
    this.state = { data: [],
                  editModalState: false,
                  selectedStudent: {firstName: '', lastName: '', student_id: ''},
                  alert: {title: '', message: '', type: '', alertState: false,},
                  deleteModalState: false,
                  deleteModal: {title: '', message: '', id: ''},
                  header: ['First Name', 'Last Name'],
                 }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getStudentList = this.getStudentList.bind(this);
  }

  componentDidMount() {
    this.getStudentList();
  }

  getStudentList(){
    axios.get('http://localhost:8080/students/all')
      .then((response) => {
        let data = []
        let index = ''
        let student = {student_id: '', firstName: '', lastName: ''}
        for (index in response.data){
          student = response.data[index]
          data.push([student.student_id, student.firstName, student.lastName])
        }
        this.setState({ data: data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getStudent(student_id){
    axios.get('http://localhost:8080/students/'+student_id)
      .then((response) => {
        this.setState({ selectedStudent: response.data, editModalState: true })
      })
      .catch((error) => {
        console.log(error)
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

  deleteModalState = (state, row) => {
    if (typeof row == "undefined"){
      this.setState({deleteModalState: state})
    }
    else{      
      this.setState(prevState => ({
        deleteModal: {
            title: "Delete",
            message: "Are you sure you want to Delete: "  + 
                      row[1] + " " + row[2],
            student_id: row[0]
        },
        deleteModalState: state
      }));
    }
      
  }

  handleDelete () {
    let student_id = this.state.deleteModal.student_id
    axios.delete('http://localhost:8080/students/' + student_id)
      .then((response) => {
        this.deleteModalState(false)
        let alert = {title: 'Success', message: 'Student Deleted', type: 'positive', alertState: true}
        this.createAlert(alert)
      })
      .catch((error) => {
        console.log(error)
        this.deleteModalState(false)
        let alert = {title: 'Error', message: 'Student can\'t be Deleted it was Assigned to a Class', 
                      type: 'negative', alertState: true}
        this.createAlert(alert)
      })
  }

  createAlert = (alert) => {
    this.setState({alert: alert})
    this.getStudentList()
  }


//The warning for "findDOMNode is deprecated in StrictMode" it's on the Button component 

    render(){
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
            <CustomTable
              header = {this.state.header}
              data = {this.state.data}
              editFunction = {this.editModalState}
              deleteFunction = {this.deleteModalState}
              />
          </Segment>
        )
    }

}

export default StudentsPage