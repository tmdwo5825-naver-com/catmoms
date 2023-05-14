import React, { useEffect } from "react";
import classes from "./Map.module.css";

/*global kakao*/
function Map() {
    useEffect(() => {
        const container = document.getElementById("kakao-map");

        //카카오 맵 띄우기
        const options = {
            center: new kakao.maps.LatLng(36.628113354779614, 127.45698538088607),
            draggable: false,
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        // 최대, 최소 축척 레벨 설정
        map.setMaxLevel(4);
        map.setMinLevel(2);

        return () => {
            kakao.maps.event.removeListener(map, "dragend");
        };
    }, []);

    return <div className={classes.map} id="kakao-map" />;
}
export default Map;
