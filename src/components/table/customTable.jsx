import { React, Component } from 'react'
import { Table, Button, Icon} from 'semantic-ui-react';


class CustomTable extends Component{

    render(){
      let header = this.props.header
      let data = this.props.data  
      return(             
        <Table compact celled>
          <Table.Header>
            <Table.Row>
              {header.map((title, index) => 
                <Table.HeaderCell key={index}>{title}</Table.HeaderCell>
              )}
              {this.props.editFunction?<Table.HeaderCell>Edit</Table.HeaderCell>:null}              
              {this.props.deleteFunction?<Table.HeaderCell>Delete</Table.HeaderCell>:null}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row, index) =>
              <Table.Row key={index}>              
                {row.map((column, subindex) => 
                  {return (subindex === 0 )?null:<Table.Cell key={subindex}>{column}</Table.Cell>}
                )}  

                {this.props.editFunction?
                <Table.Cell collapsing>
                  <Button basic onClick={() => this.props.editFunction(true, row[0])}>
                    <Icon name='edit'/>Edit
                  </Button>
                </Table.Cell>
                :null}
                {this.props.deleteFunction?
                <Table.Cell collapsing>
                  <Button basic negative onClick={() => this.props.deleteFunction(true, row)}>
                    <Icon name='trash'/>Delete
                  </Button>
                </Table.Cell>
                :null}
              </Table.Row> 
            )}             
          </Table.Body>        
        </Table>        
      )
    }
}

export default CustomTable