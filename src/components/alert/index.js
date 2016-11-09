import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';

import { store } from './redux';

/**
 * Renders any alerts in the Alert store one at a time
 *
 * @author Ben Larkins <ben@sellerlabs.com>
 */
const AlertContainer = ({ alertComponent }) => {
    const Alert = connect(
        (state) => ({
            alert: state.get(0),
        })
    )(alertComponent);

    return (
        <Provider store={ store }>
            <Alert />
        </Provider>
    );
};

AlertContainer.propTypes = {
    alertComponent: PropTypes.element.isRequired,
};

export default AlertContainer;
