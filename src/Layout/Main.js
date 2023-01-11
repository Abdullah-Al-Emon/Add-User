import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Component/Header/Header';
// import Home from '../Component/Home/Home';

const Main = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Main;