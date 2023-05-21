import {Outlet} from 'react-router-dom'
import React from "react";


function RootLayout(){
    return(
        <div style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
            <Outlet />
        </ div>
    )

}

export default RootLayout;