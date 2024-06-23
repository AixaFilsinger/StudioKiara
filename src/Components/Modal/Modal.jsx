// src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-content">
                {children}
                <button className="close-button" onClick={handleClose}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Modal;
