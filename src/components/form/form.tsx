import * as React from 'react';
import twitch from '../../twitch.png';
import './form.scss';
import TextField from '@material-ui/core/TextField';

const Form = (props: any) => {

    const [value, setValue] = React.useState(undefined);
    const [error, setError] = React.useState(false);

    const handleChange = (event: any) => {
        setError(false);
        setValue(event.target.value);
    };

    const saveStreamer = () => {
        if (!value) {
            setError(true);
            return;
        }
        localStorage.setItem('streamerId', `${value}`);
        props.setStreamerExist(true);
    };

    return (
        <div className={'form-container'}>
            <img src={twitch} alt={'Twitch'}/>
            <div className={'label'}>Provide Your favorite Streamer ID</div>
            <TextField
                id="streamer-name"
                label="Streamer ID"
                value={value}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                fullWidth={true}
                error={error}
            />
            <div onClick={saveStreamer} className={'button'}>
                Submit
            </div>
        </div>
    );
};

export default Form;