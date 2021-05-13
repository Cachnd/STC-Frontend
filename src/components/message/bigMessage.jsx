import { React , Component } from 'react'
import { Header, Icon, Segment} from 'semantic-ui-react';

class BigMessage extends Component{

    render (){
        let message = this.props.message
        return(
            <Segment placeholder>
                <Header icon>
                    <Icon name='search' />
                    {message}
                </Header>
            </Segment>
        )
    }
}

export default BigMessage