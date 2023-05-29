import React, {useState} from "react";
import classes from "./InfoBox.module.css";


function InfoBox(){


    return (
        <form className={classes.form} >
            <h1 className={classes.main}>Info</h1>
            <h1 className={classes.title}>📌3시간</h1>
            <h1 className={classes.title}>📌24시간</h1>
            </form>
    );
};

export default InfoBox;