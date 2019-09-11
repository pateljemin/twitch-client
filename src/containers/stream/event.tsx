import * as React from 'react';
import './event.scss';
import { createStructuredSelector } from "reselect";
import { makeSelectEvents } from "../../store/selector";
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

/**
 * This container is connected with Redux store and renders every time there is new event Ex. Subscription,
 * Re-Subscription, Gift.
 *
 * @param props
 * @constructor
 */
const EventsList = (props: any) => {
    return (
        <div className={'event-container'}>
            {props.events && props.events.map((event: any) => {
                return <p>{event}</p>
            })}
            {props.events.length === 0 && <div>No Recent Events </div>}
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    };
};
const mapStateToProps = createStructuredSelector({
    events: makeSelectEvents()
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(EventsList);