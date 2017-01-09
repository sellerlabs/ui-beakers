import React from 'react';
import { Row, Column } from 'react-cellblock';

const Bullet = () => {
    const styles = {
        Il: {
            backgroundColor: '#f7f7f7',
            border: '#000 1px dashed',
            marginRight: 20,
            padding: 20,
        },
        infoCol: {
            alignItems: 'center',
            display: 'flex',
            textAlign: 'left',
        },
    };

    return (
        <div>
            <Row>
                <Column offset="1/12" width="5/12">
                    <div style={ styles.infoCol }>
                        <p style={ styles.Il }>Ilus</p>
                        Create a Custom Landing Page with a
                        special offer on your product
                    </div>
                </Column>
                <Column width="5/12">
                    <div style={ styles.infoCol }>
                        <p style={ styles.Il }>Ilus</p>
                        Manage your campaigns with our campaign management tools
                    </div>
                </Column>
            </Row>

            <Row>
                <Column offset="1/12" width="5/12">
                    <div style={ styles.infoCol }>
                        <p style={ styles.Il }>Ilus</p>
                        Monitor campaign stats like conversion and redemption rate
                    </div>
                </Column>
                <Column width="5/12">
                    <div style={ styles.infoCol }>
                        <p style={ styles.Il }>Ilus</p>
                        Collect emails from your shoppers and sync to your email lists
                    </div>
                </Column>
            </Row>
        </div>
    );
};

export default Bullet;
