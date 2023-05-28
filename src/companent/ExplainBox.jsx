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
            image.style.width = "100%";
            image.style.height = "100%";
        };

        window.addEventListener("resize", resizeImage);
        resizeImage();

        return () => {
            window.removeEventListener("resize", resizeImage);
        };
    }, []);

    console.log(marker); // Add this line to check marker data structure

    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <img ref={imageRef} src={marker.url} alt="Cat Image" className={classes.image}/>
                <div className={classes.form2}>
                    <label>Upload Time: {marker.created_at}</label>
                    <hr width="100%"/>
                    <textarea value={marker.comment} readOnly />
                </div>
            </div>
        </div>
    );
}

export default ExplainBox;
