import React, { useState } from 'react';
import Modal from '../../features/User/Modal/Modal';
import Tabs from '../Tabs/Tabs';



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

    return (
        <div>
            <div className='btn-div'>
                <button onClick={toggleModal} className="btn-modal">
                    Add User
                </button>
            </div>
            {modal && (<Modal toggleModal={toggleModal} setModal={setModal} modal={modal} />)}
            <Tabs />
        </div>
    );
};

export default Home;