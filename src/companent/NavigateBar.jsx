import classes from "./NavigateBar.module.css";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Modal from "./Modal";
import UploadBox from "./UploadBox";
function NavigateBar(){
    const navigate = useNavigate();
    const to24 = () => {
        navigate('/24hours');
    };
    const to3 = () => {
        navigate('/3hours');
    };

    //Overlay on/off 구현
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOverlayOpen(true);
    };

    const handleOverlayClose = () => {
        setIsOverlayOpen(false);
    };

    return (
        <div className={classes.bottomBar}>
            <button className={classes.bottomButton} onClick={to3}>
                <span className="material-icons">history</span>
                <div>3시간</div>
            </button>
            <button className={classes.bottomButton} onClick={handleButtonClick}>
            <span className="material-icons">add</span>
            <div>사진 추가</div>
            </button>
            {isOverlayOpen && <Modal onClose={handleOverlayClose}><UploadBox onSubmitSuccess={handleOverlayClose} /></Modal>}
            <button className={classes.bottomButton} onClick={to24}>
                <span className="material-icons">today</span>
                <div>24시간</div>
            </button>

        </div>
    )
}

export default NavigateBar;