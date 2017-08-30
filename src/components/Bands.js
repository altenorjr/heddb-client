import React from 'react';
import jss from 'react-jss';

import Band from './Band';

const Bands = (({ bands, classes, showStateInformation = false }) => (
    <div className={classes.bands}>
        {
            bands.map((band) => (
                <Band key={band.get('objectId')} showStateInformation={showStateInformation} data={band} />
            ))
        }
    </div>
));

export default jss({
    bands: {
        width: '100%'
    }
})(Bands);