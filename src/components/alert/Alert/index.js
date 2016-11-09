import React, { PropTypes } from 'react';

import { removeAlert } from '../redux';

const handleClick = (alert) => () => {
    removeAlert(alert);
};

const Alert = (props) => {
    const { alert } = props;

    if (alert) {
        const { message, type } = alert;
        const alertTypes = {
            danger: '#CC2127',
            success: '#07CE8F',
            warning: '#FD7400',
        };
        const style = {
            container: {
                backgroundColor: alertTypes[type],
                color: '#fff',
                padding: 20,
                position: 'fixed',
                textAlign: 'center',
                top: 0,
                width: '100%',
                zIndex: 1031,
            },
            x: {
                cursor: 'pointer',
                fontSize: 30,
                padding: '0 10px',
                position: 'absolute',
                right: 10,
                top: 10,
            },
        };

        return (
            <div style={ style.container }>
                { message }

                <span
                    onClick={ handleClick(alert) }
                    style={ style.x }>
                    &times;
                </span>
            </div>
        );
    }

    return null;
};

Alert.propTypes = {
    alert: PropTypes.shape({
        message: PropTypes.node.isRequired,
        type: PropTypes.oneOf(['danger', 'success', 'warning']),
    }),
};

export default Alert;
