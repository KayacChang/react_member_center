import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {

    return {
        top: `49%`,
        left: `49%`,
        transform: `translate(-49%, -49%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #FFF',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        textAlign: 'center',
    },
}));

export default function SimpleModal({ setFunc, modalData }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const handleClose = () => {
        setFunc({ ...modalData, open: false, });
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <p id="simple-modal-description">
                {modalData.alertText}
            </p>
            <br />
            <br />
            <div className='wid100 fx fx_center linkText' onClick={handleClose}>我知道了</div>
        </div>
    );

    return (
        <div>
            <Modal
                open={modalData.open}
                onClose={handleClose}
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}