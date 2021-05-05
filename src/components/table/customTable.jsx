import React from 'react'
import { Table, Button, Icon, Segment } from 'semantic-ui-react';

class CustomTable extends React.Component{

  state = { students: [{firstName: null, lastName: null, id: null}] }

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
            console.log(result);
        },
        (error) => {
            console.log(error);
        })
  }


//The warning for "findDOMNode is deprecated in StrictMode" it's on the Button component 

    render(){
      const students = this.state.students;
        return(
          <Segment>
            <div>
              <Button
                icon
                labelPosition='left'
                primary
                size='small'
              >
                <Icon name='user'/> New Student
              </Button>
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
                    <Table.Cell colSpan='1'>Icon</Table.Cell>
                    <Table.Cell colSpan='1'>Icon</Table.Cell>
                  </Table.Row> 
                )}             
              </Table.Body>        
            </Table>
          </Segment>
        )
    }

}

export default CustomTable