import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmAppointmentModal = (props) => {

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm appointment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Book an appointment on <b>{props.date}</b> at <b>{props.time}</b></h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onConfirmed}>Confirm</Button>
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
      );

}

export default ConfirmAppointmentModal;