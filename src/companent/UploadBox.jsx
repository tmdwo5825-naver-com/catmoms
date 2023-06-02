//npm install axios, npm install react-toastify

import React, { useState } from "react";
import classes from "./UploadBox.module.css";
import Geolocation from "./GeoLocation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UploadBox({ onSubmitSuccess }) {
    const [enteredText, setEnteredText] = useState("");
    const [position, setPosition] = useState(null);

    function changeTextHandler(event) {
        setEnteredText(event.target.value);
    }

    function handleGeolocationSuccess(pos) {
        setPosition(pos);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("comment", enteredText);
        formdata.append("image", event.target["image"].files[0], "20vt87.jpg");
        if (position) {
            formdata.append("lat", position.coords.latitude);
            formdata.append("lon", position.coords.longitude);
        }

        axios
            .post("http://127.0.0.1:8000/content-create", formdata)
            .then((response) => {
                if (response.data.status_code === 201) {
                    toast.success("파일 업로드가 성공적으로 되었습니다!");
                } else {
                    toast.error("파일이 업로드가 되지 않았습니다.");
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                onSubmitSuccess();
            });
    }

    const buttonStyle = {
        position: "absolute",
        top: "77%",
        right: "47%",
        width: "40px",
        height: "40px",
        border: "none",
        backgroundColor: "transparent",
        fontSize: "30px",
        lineHeight: "1",
        textAlign: "center",
        cursor: "pointer",
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Geolocation onSuccess={handleGeolocationSuccess} />
                <p>
                    <label htmlFor="name">Upload Cat Image</label>
                    <input type="file" name="image" accept=".jpg,.jpeg,.heic,.png"/>
                </p>
                <p>
                    <label htmlFor="name">This Cat Is</label>
                    <input
                        type="text"
                        id="body"
                        required
                        rows="1"
                        placeholder="Explain your Cat"
                        onChange={changeTextHandler}
                    />
                </p>
                <button type="submit" className="material-icons" style={buttonStyle}>
                    pets
                </button>
            </form>
        </>
    );
}

export default UploadBox;
