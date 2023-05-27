import React, { useEffect } from "react";
import classes from "./Map.module.css";

/*global kakao*/
function Map() {
    useEffect(() => {
        const container = document.getElementById("kakao-map");

        //카카오 맵 띄우기
        const options = {
            center: new kakao.maps.LatLng(36.628113354779614, 127.45698538088607),
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        // 최대, 최소 축척 레벨 설정
        map.setMaxLevel(4);
        map.setMinLevel(2);

        function panTo() {
            // 이동할 위도 경도 위치를 생성합니다
            var moveLatLon = new kakao.maps.LatLng(36.628113354779614, 127.45698538088607);

            // 지도 중심을 부드럽게 이동시킵니다
            // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
            map.panTo(moveLatLon);
        }

        const button = document.createElement("button");
        button.addEventListener("click", panTo);
        button.className = classes.panToButton;
        const icon = document.createElement("i");
        icon.className = "material-icons";
        icon.innerHTML = "my_location";
        button.appendChild(icon);
        container.appendChild(button);


        return () => {
            kakao.maps.event.removeListener(map, "dragend");
        };
    }, []);

    return <div className={classes.map} id="kakao-map" />;
}
export default Map;