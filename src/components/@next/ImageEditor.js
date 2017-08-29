import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DropZone from 'react-dropzone';

import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import ClearIcon from 'material-ui/svg-icons/action/delete';


class ImageEditor extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        accept: PropTypes.string,
        shouldShowRemoveButton: PropTypes.func
    }

    static defaultProps = {
        accept: "image/jpeg, image/png",
        shouldShowRemoveButton: (newImage) => !!newImage
    }

    state = {
        newImage: null
    }

    onChooseImage = ([accepted], rejected) => {
        if (!accepted) {
            return;
        }
        
        var img = new Image();
        
        const self = this;
        
        img.onload = function () {
            const canvas = document.createElement('CANVAS');
            const ctx = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg');
            
            self.setState({ newImage: dataURL });
            
            self.props.onChange(dataURL);
            
            window.URL.revokeObjectURL(accepted.preview);
        }
        
        img.src = accepted.preview;
    }
    
    currentImageUrl = () => this.state.newImage || this.props.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAgMAAACf9p+rAAAADFBMVEUAAAD///////////84wDuoAAAAA3RSTlMAgADB9VyVAAAAiklEQVR4Xu3RoQ1CQRRFwUO7NEEpSAIlUQiOPASCEWDA8JO9apMjJnnbV1vb7S+vxft0/RCOtw/hcH8fzjMgQcyABDEDEsQMSBIiSYgkIZKESBIiSYgkIZKESBIiSYgkIZKESBIiSYgkIZKESBIiSYgkIRIEiB/1DE/597DCCm7bYdxsLPzhdVd4AP85wjFpkJ5/AAAAAElFTkSuQmCC";
    
    resetState = () => {
        this.setState({ newImage: null });

        this.props.onChange(null);
    }

    render = () => {
        const {
            title,
            accept,
            image,
            classes,
            shouldShowRemoveButton
        } = this.props;

        const {
            newImage
        } = this.state;

        return (
            <div className={classes.imageHolder}>
                <div className={classes.label}>{title}</div>
                <DropZone
                    accept={accept}
                    multiple={false}
                    className={classes.image}
                    style={{ 
                        backgroundImage: `url('${this.currentImageUrl()}')`,
                        backgroundSize: image || newImage ? 'cover' : '75px 75px'
                    }}
                    onDrop={this.onChooseImage}
                >
                    {
                        <div className={classes.imageUploader}>
                            <UploadIcon className={classes.upload} />
                        </div>
                    }
                </DropZone>
                {
                    shouldShowRemoveButton(this.state.newImage) && (
                        <div className={classes.resetImageButton}>
                            <FloatingActionButton 
                                onTouchTap={this.resetState}
                                mini
                                backgroundColor="rgba(0, 0, 0, .8)"
                            >
                                <ClearIcon />
                            </FloatingActionButton>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default jss({
    imageHolder: {
        marginTop: '14px',
        position: 'relative'
    },
    image: {
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '35vw',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: '#000'
    },
    imageUploader: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: '.3s',
        opacity: 0,
        padding: '50px',
        boxSizing: 'border-box',
        fontSize: '14px',
        fontWeight: 100,
        '&:hover': {
            opacity: 1
        }
    },
    resetImageButton: {
        position: 'absolute',
        bottom: '15px',
        right: '15px'
    },
    label: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
        marginBottom: '5px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upload: {
        color: 'rgba(255, 255, 255, 0.5) !important',
        width: '75px !important',
        height: '75px !important'
    }
})(ImageEditor);