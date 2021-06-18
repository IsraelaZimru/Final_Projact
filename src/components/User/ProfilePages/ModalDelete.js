import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
// import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ModalDelete = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <FontAwesomeIcon onClick={handleShow} icon={faTrashAlt} style={{ cursor: "pointer" }} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>
                        This will permanently delete the recipe, are you sure?
                    </strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        return back
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;