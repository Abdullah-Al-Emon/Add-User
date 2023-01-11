import { useState } from "react";
import Admin from "../../features/User/Admin/Admin";

import Employee from "../../features/User/Employee/Employee";
import "./Tabs.css";

function Tabs()
{
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) =>
    {
        setToggleState(index);
    };

    return (
        <div className="container">
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Employee
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Admin
                </button>
            </div>
            <div className="content-tabs">
                <Employee toggleState={toggleState} />
                <Admin toggleState={toggleState} />
            </div>
        </div>
    );
}

export default Tabs;