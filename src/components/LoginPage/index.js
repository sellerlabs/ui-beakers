import React, { PropTypes } from 'react';
import { Card, RaisedButton } from 'material-ui';
import { Grid, Row, Column } from 'react-cellblock';

import menuLogoFbg from './images/menu-logo-fbg.svg';
import menuLogoPromote from './images/menu-logo-promote.svg';
import menuLogoQuantify from './images/menu-logo-quantify.svg';
import menuLogoScope from './images/menu-logo-scope.svg';

const LoginPage = (props) => {
    const { children, color, description, logo, paragraph, slappUrl } = props;
    const styles = {
        button: {
            backgroundColor: '#50c533',
        },
        container: {
            paddingTop: 78,
            textAlign: 'center',
        },
        description: {
            color,
            fontSize: 20,
        },
        footerRow: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 10,
        },
        img: {
            height: 90,
            marginTop: 35,
        },
        para: {
            fontSize: 16,
        },
        signLink: {
            color: '#007cd2',
            textDecoration: 'none',
        },
    };

    return (
        <Grid>
            <Row>
                <div style={ styles.container }>
                    <Column offset="1/6" width="2/3">
                        <Card>
                            <img
                                alt="Logo"
                                src={ logo }
                                style={ styles.img } />

                            <Row>
                                <span style={ styles.description }>
                                    { description }
                                </span>
                            </Row>

                            <Row>
                                <Column offset="1/12" width="5/6">
                                    <p style={ styles.para }>
                                        { paragraph }
                                    </p>
                                </Column>
                            </Row>

                            { children }

                            <Row style={{ marginTop: 10 }}>
                                <Column offset="1/3" width="1/3">
                                    <RaisedButton
                                        buttonStyle={ styles.button }
                                        href={ slappUrl }
                                        label="SIGN IN WITH SELLER LABS" />
                                </Column>
                            </Row>

                            <Row>
                                <Column>
                                    <p style={{ color: '#8d8d8d', marginBottom: 30 }}>
                                        Don&apos;t have a Seller Labs account?&nbsp;
                                        <a href={ `${slappUrl}&prefer_signup=true` } style={ styles.signLink }>
                                            Sign up here
                                        </a>
                                    </p>
                                </Column>
                            </Row>
                        </Card>

                        <Row>
                            <Column offset="1/6" width="3/4">
                                <div style={ styles.footerRow }>
                                    <p style={ styles.para }>
                                        More Great Seller Labs Products:
                                    </p>
                                    <a href="https://feedbackgenius.sellerlabs.com">
                                        <img alt="FBG Logo" src={ menuLogoFbg } />
                                    </a>
                                    <a href="https://quantify.sellerlabs.com/">
                                        <img alt="Quantify Logo" src={ menuLogoQuantify } />
                                    </a>
                                    <a href="https://scope.sellerlabs.com/">
                                        <img alt="Scope Logo" src={ menuLogoScope } />
                                    </a>
                                    <a href="https://promote.sellerlabs.com/">
                                        <img alt="Promote Logo" src={ menuLogoPromote } />
                                    </a>
                                </div>
                            </Column>
                        </Row>
                    </Column>
                </div>
            </Row>
        </Grid>
    );
};

LoginPage.propTypes = {
    children: PropTypes.object,
    color: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.string,
    paragraph: PropTypes.string,
    slappUrl: PropTypes.string.isRequired,
};

export default LoginPage;
