import React from 'react'
import { Message } from 'semantic-ui-react'

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick () {
        this.props.deleteFlashMessage(this.props.message.id);
    }
    render() {
        const { id, type, title, text } = this.props.message;
        return (
            <Message floating className={type} onDismiss={this.onClick}>
                <Message.Header>{title}</Message.Header>
                <p>{text}</p>
            </Message>
        )
    }
}

export default FlashMessage;