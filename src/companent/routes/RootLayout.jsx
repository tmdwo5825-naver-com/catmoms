import {Outlet} from 'react-router-dom'
import MainHeader from "./MainHeader";
import Upload from "./Upload";
import React from "react";
import ToShowAll from "../ToShowAll";

function RootLayout(){
    return(
        <>
            <MainHeader />
            <Upload/>
            <Outlet />
        </>
    )

}

export default RootLayout;