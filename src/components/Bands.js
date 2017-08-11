import React from 'react';
import jss from 'react-jss';

import Band from './Band';

const Bands = (({ bands, classes }) => (
    <div>
        {
            bands.map((band) => (
                <Band key={band.id} band={band} />
            ))
        }
    </div>
));

const styles = {
    bands: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100vw'
    },
    title: {
        fontWeight: 200,
        flex: 1,
        flexBasis: '100%'
    }
};

export default jss(styles)(Bands);