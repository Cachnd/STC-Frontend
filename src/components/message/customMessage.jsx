import React from 'react'

class CustomMessage extends React.Component{

    render (){
        let title = this.props.title
        let message = this.props.message
        let type = this.props.type
        let state = this.props.state
        return(
            <div className={"ui message " + type} style={{display: (state)?"block":"none"}}>
                <i aria-hidden="true" className="close icon" onClick={() => this.props.setOpen(false)}></i>
                <div className="content">
                    <div className="header">{title}</div>
                    <p>{message}</p>
                </div>
            </div>
        )
    }
}

export default CustomMessage