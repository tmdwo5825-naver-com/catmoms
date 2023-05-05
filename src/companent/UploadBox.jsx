import React from "react";
import classes from "./Upload.module.css";

function inputUpload({onClose}){
    return (
        <form className={classes.form}>
            <button onClick={onClose} className={classes.closeButton}>
                X
            </button>
            <p>
                <label htmlFor="name">Upload Cat Image</label>
                <input type={"file"}/>
            </p>
            <p>
                <label htmlFor="name">This Cat Is</label>
                <input type="text" id="body" required rows="1" placeholder="Explain your CAT"></input>
            </p>
                <button>제출</button>
            </form>
    );
};

export default inputUpload;