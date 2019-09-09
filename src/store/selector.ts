import { createSelector } from "reselect";

const selectSpace = (state: any) => state;

const makeSelectMessages = () =>
    createSelector(selectSpace, (substate: any) => substate.messages);

const makeSelectEvents = () =>
    createSelector(selectSpace, (substate: any) => substate.events);

export {
    makeSelectEvents,
    makeSelectMessages
}
