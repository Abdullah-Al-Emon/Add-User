import React from 'react';

const BulkModal = ({toggleBulkModal, setBulkModal, bulkModal}) => {
    return (
        <div className="modal">
        <div onClick={toggleBulkModal} className="overlay"></div>
        <div className="modal-content">
            <h2>Bulk User</h2>

            <button className="close-modal" onClick={toggleBulkModal}>
                CLOSE
            </button>
        </div>
    </div>
    );
};

export default BulkModal;