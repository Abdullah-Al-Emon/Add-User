import React, { useState } from 'react';
import { Tab, Tabs } from '../Tabs/Tabs';
import AdminPagination from '../User/Admin/AdminPagination';
import EmployeePagination from '../User/Employee/EmployeePagination';
import BulkModal from '../BulkModal/BulkModal';
import './Home.css'
import Modal from '../Modal/Modal';
import ExampleForm from '../ExampleForm';
import MoreExxample from '../MoreExample';


const Home = () =>
{
    const [modal, setModal] = useState(false);

    const toggleModal = () =>
    {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    const [bulkModal, setBulkModal] = useState(false);

    const toggleBulkModal = () =>
    {
        setBulkModal(!bulkModal);
    };

    if (bulkModal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div>
            <div className='btn-div'>
                <div className="btn-modal">
                    <button onClick={toggleModal} >
                        Add User
                    </button>
                    <button onClick={toggleBulkModal}>
                        Bulk User
                    </button>
                </div>
            </div>
            {modal && (<Modal toggleModal={toggleModal} setModal={setModal} modal={modal} />)}
            {bulkModal && (<BulkModal toggleBulkModal={toggleBulkModal} setBulkModal={setBulkModal} bulkModal={bulkModal} />)}
            <div className='tab'>
                <Tabs>
                    <Tab label={"Employee"} tabName={"Employee"}>
                        <EmployeePagination />
                    </Tab>
                    <Tab label={"Admin"} tabName={"Admin"}>
                        <AdminPagination />
                    </Tab>
                </Tabs>
            </div>
            {/* <ExampleForm/> */}
            {/* <MoreExxample/> */}
        </div>
    );
};

export default Home;