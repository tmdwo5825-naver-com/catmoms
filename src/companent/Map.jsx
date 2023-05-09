import React, { useEffect } from "react";
import data from "../db/data.json"

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


        // 데이터에서 좌표와 이미지 가져와서 마커 생성
        data.data.forEach((item) => {
            const position = new kakao.maps.LatLng(item.y, item.x);

            // 마커 이미지 생성
            const markerImage = new kakao.maps.MarkerImage(
                item.imageUrl, // 이미지 URL
                new kakao.maps.Size(60, 60),
                { offset: new kakao.maps.Point(12, 35) }
            );

            const marker = new kakao.maps.Marker({
                position: position,
                image: markerImage,
            });
            marker.setMap(map);
        });


        return () => {
            kakao.maps.event.removeListener(map, "dragend");
        };
    }, []);

    return <div id="kakao-map" style={{ width: "630px", height: "630px" }} />;
}
export default Map;
