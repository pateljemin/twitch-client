import * as React from 'react';
import { CHAT_CLIENT } from "./realtimeEvent";
import Interweave from "interweave";
import TextField from "@material-ui/core/TextField/TextField";
import { compose, Dispatch } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectMessages } from "../../store/selector";
import { connect } from "react-redux";
import './chatBox.scss';
import { messageSent } from "../../store/action";

class ChatBox extends React.PureComponent<any, any> {

    private streamerId = localStorage.getItem('streamerId');

    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        };
    }

    sendMessage = () => {
        if (CHAT_CLIENT === undefined) {
            return;
        }
        console.log(`steamer Id:#${this.streamerId}`);
        const message = this.state.value;
        // @ts-ignore
        CHAT_CLIENT.say(`#${this.streamerId}`, message);
        this.props.dispatch(messageSent({

        }));
        this.setState({ value: '' });
        console.log(`[init] Message sent`);
    };

    handleChange = (event: any) => {
        this.setState({ value: event.target.value });
    };

    render() {
        return (
            <div>
                <div className={'chat-container'}>
                    <div className={'message-list'}>
                        {
                            this.props.messages.map((message: any) => {
                                return (
                                    <div><Interweave content={message.user}/>: <span>{message.message}</span></div>);
                            })
                        }
                    </div>
                    <div className={'user-input'}>
                        <TextField
                            id="chat-message"
                            label="Message"
                            value={this.state.value}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            style={{ width: '280px' }}
                        />
                        <div className={'send-button'} onClick={this.sendMessage}>Send</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    };
};
const mapStateToProps = createStructuredSelector({
    messages: makeSelectMessages()
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(ChatBox);
