import React, { useRef, useEffect } from "react";
import classes from "./ExplainBox.module.css";

function ExplainBox({ marker, onCloseExplainBox }) {
    const imageRef = useRef(null);

    useEffect(() => {
        const resizeImage = () => {
            const image = imageRef.current;
            const container = image.parentNode;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const imageRatio = image.naturalWidth / image.naturalHeight;

            if (containerWidth / containerHeight > imageRatio) {
                image.style.width = "100%";
                image.style.height = "auto";
            } else {
                image.style.width = "auto";
                image.style.height = "100%";
            }
        };

        window.addEventListener("resize", resizeImage);
        resizeImage();

        return () => {
            window.removeEventListener("resize", resizeImage);
        };
    }, []);

    const handleExplainBox = () => {
        onCloseExplainBox();
    };

    return (
        <div className={classes.form}>
            <div className={classes.modal}>
                <div className={classes.modalHeader}>
                    <button className={classes.btnClose} onClick={handleExplainBox}>X</button>
                    <p>Upload Time: {marker.uploadTime}</p>
                </div>
                <div>
                    <img ref={imageRef} src={marker.imageUrl} alt="Cat Image" className={classes.image} />
                </div>
                <div>{marker.description}</div>
            </div>

        </div>
    );
}

export default ExplainBox;
