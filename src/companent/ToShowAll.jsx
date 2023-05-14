import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "./ToShowAll.module.css";

function ShowAllButton() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/show-all');
    };


    return (
        <button className={classes.buttonWrapper2} onClick={handleButtonClick}>
            Show All
        </button>
    );
}

export default ShowAllButton;