import React, {useState} from "react";
import classes from "./UploadBox.module.css";
import Geolocation from "./GeoLocation";

function InputUpload({ onSubmitSuccess }){
    // textbox에 입력받은 것을 저장해주는 함수 구현
    const [enteredText, setEnteredText] = useState('')
    const [position, setPosition] = useState(null);
    function changeTextHandler(event){
        setEnteredText(event.target.value);

    }

    function handleGeolocationSuccess(pos) { // 위치 정보 업데이트 함수
        setPosition(pos);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("comment", enteredText); // 사용자가 입력한 텍스트
        formdata.append("image", event.target['image'].files[0], "20vt87.jpg");
        if (position) {
            formdata.append("latitude", position.coords.latitude);
            formdata.append("longitude", position.coords.longitude);
        }

        fetch("http://127.0.0.1:8000/content-create", {
            method: "POST",
            body: formdata,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Upload failed.");
                }
                return response.text();
            })
            .then((result) => {
                console.log(result);
                onSubmitSuccess(); // 여기서 호출합니다.
            })
            .catch((error) => console.log("error", error))
            .finally(() => {
                onSubmitSuccess(); //통신 성공/실패에 관계없이 업로드 창이 닫힘
            });

    }

    //업로드 버튼 클릭시 생성되는 박스
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <p>
                <label htmlFor="name">Upload Cat Image</label>
                <input type="file" name="image" />
            </p>
            <p>
                <label htmlFor="name">This Cat Is</label>
                {/*onChange={changeTextHandler}는 textbox에 입력된 것을 받아주는 함수*/}
                <input type="text" id="body" required rows="1" placeholder="Explain your CAT" onChange={changeTextHandler}></input>
            </p>
                <button type="submit">제출</button>
            </form>
    );
};

export default InputUpload;