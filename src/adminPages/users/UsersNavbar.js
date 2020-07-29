import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useHistory} from "react-router-dom";

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function UsersNavbar() {
    let history = useHistory();
    {/*Licencias que uno se da a 3 dias de terminar.*/}
    const [value, setValue] = React.useState(history.location.pathname === "/users/add" ? 1 : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
            >
                <Tab label="List users" {...a11yProps(0)} onClick={() => history.push("/users/list")}/>
                <Tab label="Add user" {...a11yProps(1)} onClick={() => history.push("/users/add")}/>
            </Tabs>
        </div>
    );
}
