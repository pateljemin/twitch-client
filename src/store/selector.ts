import { createSelector } from "reselect";

// This file contain different selectors which is used to select data from store.

const selectSpace = (state: any) => state;

const makeSelectMessages = () =>
    createSelector(selectSpace, (substate: any) => substate.messages);

const makeSelectEvents = () =>
    createSelector(selectSpace, (substate: any) => substate.events);

export {
    makeSelectEvents,
    makeSelectMessages
}
