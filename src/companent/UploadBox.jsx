import React, {useState} from "react";
import classes from "./UploadBox.module.css";

function InputUpload(){
    // textbox에 입력받은 것을 저장해주는 함수 구현
    const [enteredText, setEnteredText] = useState('')
    function changeTextHandler(event){
        setEnteredText(event.target.value);

    }
    //업로드 버튼 클릭시 생성되는 박스
    return (
        <form className={classes.form}>
            <p>
                <label htmlFor="name">Upload Cat Image</label>
                <input type={"file"}/>
            </p>
            <p>
                <label htmlFor="name">This Cat Is</label>
                {/*onChange={changeTextHandler}는 textbox에 입력된 것을 받아주는 함수*/}
                <input type="text" id="body" required rows="1" placeholder="Explain your CAT" onChange={changeTextHandler}></input>
            </p>
                <button >제출</button>
            </form>
    );
};

export default InputUpload;