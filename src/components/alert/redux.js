import { createStore } from 'redux';
import { fromJS } from 'immutable';

const ADD_ALERT = 'ADD_ALERT';
const REMOVE_ALERT = 'REMOVE_ALERT';

function alertReducer(state = fromJS([]), action) {
    switch (action.type) {
        case ADD_ALERT:
            return state.push(action.alert);

        case REMOVE_ALERT:
            return state.delete(state.indexOf(action.alert));

        default:
            return state;
    }
}

export const store = createStore(alertReducer);

export function addAlert(alert) {
    store.dispatch({
        alert,
        type: ADD_ALERT,
    });
}

export function removeAlert(alert) {
    store.dispatch({
        alert,
        type: REMOVE_ALERT,
    });
}

export function addTimedAlert(alert, displayTime = 5000) {
    addAlert(alert);

    setTimeout(
        () => {
            removeAlert(alert);
        },
        displayTime
    );
}
