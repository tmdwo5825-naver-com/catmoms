import React, {useState} from "react";
import classes from "./Upload.module.css";
import UploadBox from "./UploadBox";
import Modal from "./Modal";


function Upload() {

    //Overlay on/off 구현
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOverlayOpen(true);
    };

    const handleOverlayClose = () => {
        setIsOverlayOpen(false);
    };


    return (

        <>
            {/*업로드 버튼 생성*/}
            <button className={classes.buttonWrapper} onClick={handleButtonClick}></button>
            {/*업로드 버튼 클릭시 오버레이 키고 x버튼 누를 시오버레이 끄기*/}



            {isOverlayOpen && <Modal onClose={handleOverlayClose}><UploadBox /></Modal>}
        </>
    );
};

export default Upload;
