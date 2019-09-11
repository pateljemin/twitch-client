import * as React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import { CHAT_CLIENT } from "./realtimeEvent";
import './chatBox.scss';
import { messageSent } from "../../store/action";
import { compose, Dispatch } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectMessages } from "../../store/selector";
import { connect } from "react-redux";
import Interweave from 'interweave';
import randomColor from "randomcolor";

/**
 * Chat container: It is connected with Redux store. It renders every time new message arrives. It also send user
 * messages.
 *
 * @param props
 * @constructor
 */
const ChatBox = (props: any) => {
    const streamerId = localStorage.getItem('streamerId');
    const strUser = localStorage.getItem('user');
    const user = strUser ? JSON.parse(strUser) : {};
    const [value, setValue] = React.useState('');

    const sendMessage = () => {
        if (CHAT_CLIENT === undefined) {
            return;
        }
        // @ts-ignore
        CHAT_CLIENT.say(`#${streamerId}`, value);
        const color = randomColor({ luminosity: 'dark' });
        props.dispatch(messageSent({
            user: `<span style="font-weight: bold;color: ${color}">${user.name}</span>`,
            message: value
        }));
        setValue('');
    };

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const keyPress = (event: any) => { // Detect Enter press.
        if (event.keyCode === 13) {
            sendMessage();
        }
    };

    return (
        <div>
            <div className={'chat-container'}>
                <div className={'message-list'}>
                    {
                        props.messages.map((message: any) => {
                            return (<div><Interweave content={message.user}/>: <span>{message.message}</span>
                            </div>);
                        })
                    }
                </div>
                <div className={'user-input'}>
                    <TextField
                        id="chat-message"
                        label="Message"
                        value={value}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        style={{ width: '280px' }}
                        onKeyDown={keyPress}
                    />
                    <div className={'send-button'} onClick={sendMessage}>Send</div>
                </div>
            </div>
        </div>
    );
};


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
