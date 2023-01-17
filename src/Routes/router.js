import { createBrowserRouter } from "react-router-dom";
import Details from "../features/User/Details/Details";
import Home from "../Component/Home/Home";
import Main from "../Layout/Main";
import UpdateUsers from "../features/User/UpdateUsers/UpdateUsers";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/details/:id',
                element: <Details/>,
                loader: (({params}) => fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users/${params.id}`))
            },
            {
                path: '/updateUsers',
                element: <UpdateUsers/>,
            }
        ]
    }
]) 