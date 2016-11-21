/** @flow */

import React, { Component, PropTypes } from 'react';

import Renderer from './Renderer';

const style = {
    background: {
        height: '100%',
        position: 'fixed',
        width: '100%',
        zIndex: '-1',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    img: {
        height: 150,
        marginBottom: 50,
        marginTop: 100,
    },
    logo: {
        textAlign: 'center',
        width: '100%',
    },
};

/**
 * Class HomeCanvas
 *
 * Sets up the background animation
 */
export default class HomePage extends Component {
    componentDidMount(): void {
        const {
            backgroundColor = '#ffffff',
            backgroundEndColor,
            lineColor = '#000000',
            particleColor = '#000000',
            ringColor = '#000000',
        } = this.props;

        const renderer = new Renderer(
            'welcomeCanvas',
            {
                background: backgroundColor,
                backgroundEnd: backgroundEndColor,
                line: lineColor,
                particle: particleColor,
                ring: ringColor,
            }
        );

        renderer.seed();

        renderer.run();
    }

    /**
     * Render the component
     *
     * @returns {ReactElement}
     */
    render = (): React$Element<any> => {
        const { children, logoSrc, logoStyle = {} } = this.props;

        return (
            <div>
                <div style={ style.background }>
                    <canvas id="welcomeCanvas" />
                </div>

                <div style={ style.contentContainer }>
                    {
                        logoSrc
                        ? (
                            <div style={ style.logo }>
                                <img
                                    alt="application-logo"
                                    src={ logoSrc }
                                    style={ Object.assign(
                                        {},
                                        style.img,
                                        logoStyle
                                    ) } />
                            </div>
                        ) : null
                    }

                    { children }
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    backgroundColor: PropTypes.string,
    backgroundEndColor: PropTypes.string,
    children: PropTypes.node,
    lineColor: PropTypes.string,
    logoSrc: PropTypes.string,
    logoStyle: PropTypes.object,
    particleColor: PropTypes.string,
    ringColor: PropTypes.string,
};
