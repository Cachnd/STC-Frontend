import React from 'react'
import { Table, Button, Icon, Segment } from 'semantic-ui-react';
import StudentModal from '../modal/index'
import Message from '../message/index'

class CustomTable extends React.Component{

  constructor(props){
    super(props)
    this.state = { students: [{firstName: null, lastName: null, id: null}] ,
                  openStudentModal: false,
                  alertState: true,
                  selectedStudent: {firstName: '', lastName: '', id: ''},
                  alert: {title: '', text: '', type: ''}
                 }
    this.handleChange = this.handleChange.bind(this);
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

  getStudent(id){
    let query = "http://localhost:8080/students/get/"+id
    fetch(query)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            this.setState({ selectedStudent: result, openStudentModal: true});
        },
        (error) => {
            console.log(error);
        })
  }

  openStudentModal = (open, studentId) => {
    if (typeof studentId != "undefined"){
      this.getStudent(studentId, open)
    }
    else{
      this.setState({
        openStudentModal: open, 
        selectedStudent: { firstName: '', lastName: '', id: '' }
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
    this.setState({alertState: state})
  }


//The warning for "findDOMNode is deprecated in StrictMode" it's on the Button component 

    render(){
      let students = this.state.students
      let openStudentModal = this.state.openStudentModal
      let selectedStudent = this.state.selectedStudent
      let alertState = this.state.alertState
        return(
          <Segment>
            <Message title="A" message="aaa" type="negative" state={alertState}
              setOpen={this.handleAlert}
            />
            <div>
              <Button
                icon
                labelPosition='left'
                primary
                size='small'
                onClick={() => this.openStudentModal(true)}
              >
                <Icon name='user'/>New Student
              </Button>
              <StudentModal open={openStudentModal} student={selectedStudent} 
                setOpen={this.openStudentModal}
                handleChange={this.handleChange}
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
                  <Table.Row key={student.id}>
                    <Table.Cell>{student.firstName}</Table.Cell>
                    <Table.Cell>{student.lastName}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic onClick={() => this.openStudentModal(true, student.id)}>
                        <Icon name='edit'/>Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button basic negative>
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

export default CustomTable