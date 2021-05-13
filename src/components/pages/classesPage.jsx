import React from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react';
import ClassModal from '../modal/classModal'
import DeleteModal from '../modal/deleteModal'
import AssignModal from '../modal/assignModal'
import Message from '../message/index'
import CustomTable from '../table/index';
import axios from 'axios'

class ClassesPage extends React.Component{

  constructor(props){
    super(props)
    this.state = { classes: [] ,
                  editModalState: false,
                  selectedClass: {title: '', description: '', class_code: ''},
                  alert: {title: '', message: '', type: '', alertState: false,},
                  deleteModalState: false,
                  deleteModal: {title: '', message: '', class_code: ''},
                  assignModalOptions: [],
                  assignModalState: false,
                  studentId: '',
                  header: ['Title', 'Description'],
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
    axios.get('http://localhost:8080/classes/all')
        .then((response) => {
          let classes = []
          let index = ''
          let classroom = {class_code: '', title: '', description: ''}
          for (index in response.data){
            classroom = response.data[index]
            classes.push([classroom.class_code, classroom.title, classroom.description])
          }
          this.setState({ classes: classes})
          })
        .catch((error) => {
          console.log(error)
        })
  }

  getClass(class_code){    
    axios.get('http://localhost:8080/classes/'+class_code)
        .then((response) => {
          this.setState({ selectedClass: response.data, editModalState: true});
        })
        .catch((error) => {
          console.log(error)
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

  deleteModalState = (state, row) => {
    if (typeof row == "undefined"){
      this.setState({deleteModalState: state})
    }
    else
      this.setState(prevState => ({
        deleteModal: {
            title: "Delete",
            message: "Are you sure you want to Delete: " + row[1],
            class_code: row[0]
        },
        deleteModalState: state
      }));   
  }

  handleDelete () {
    axios.delete('http://localhost:8080/classes/'+this.state.deleteModal.class_code)
      .then((response) => {
        this.deleteModalState(false)
        let alert = {title: 'Success', message: 'Class Deleted', type: 'positive', alertState: true}         
        this.createAlert(alert)
      })
      .catch((error) => {
        console.log(error)
        this.deleteModalState(false)
        let alert = {title: 'Error', type: 'negative', alertState: true,
                    message: 'Class can\'t be Deleted it was assigned to at least one Student'}                    
        this.createAlert(alert)
      })        
  }

  createAlert = (alert) => {
    this.setState({alert: alert})
    this.getClassesList()
  }

  getClassToAssign (class_code){
    axios.get('http://localhost:8080/classes/'+class_code)
      .then((response) => {
        this.setState({ selectedClass: response.data, assignModalState: true})
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('http://localhost:8080/students/all')
      .then((response) => {
        let options = []
        let index = ''
        let student = {student_id: '', firstName: '', lastName: ''}
        for (index in response.data){
          student = response.data[index]
          options.push({key: student.student_id, value: student.student_id, text: student.firstName+" "+student.lastName})
        }
        this.setState({ assignModalOptions: options})
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

  handleAssign () {
    let payload = {class_code: this.state.selectedClass.class_code, student_id: this.state.studentId}
    axios.post('http://localhost:8080/classes/assign/', payload)
      .then((response) => {
        this.assignModalState(false)
        let alert = {title: 'Success', message: 'Student Assigned', type: 'positive', alertState: true}
        this.createAlert(alert);
      })    
  }

  handleSelect(event, data) {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    this.setState({studentId: key})
  }


//The warning for "findDOMNode is deprecated in StrictMode" it's on the Button component 

    render(){
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
            <CustomTable
              header = {this.state.header}
              data = {this.state.classes}
              editFunction = {this.editModalState}
              deleteFunction = {this.deleteModalState}
              />
          </Segment>
        )
    }

}

export default ClassesPage