import React, { useState, useEffect } from "react";
import data from "../db/data.json";
import Upload from "./Upload";
import ToShowAll from "./ToShowAll";
import Map from "./Map";
import ExplainBox from "./ExplainBox";
import ClearModal from "./ClearModal";
import NavigateBar from "./NavigateBar";



/*global kakao*/
function MapShowAll() {
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (markerData) => {
        setSelectedMarker(markerData); // 선택한 마커 정보를 상태에 저장
    };

    const closeExplainBox = () => {
        setSelectedMarker(null); // 오버레이 닫을 때 선택한 마커 정보 초기화
    };

    useEffect(() => {
        const container = document.getElementById("kakao-map");

        // 카카오 맵 띄우기
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

            // 마커 클릭 이벤트 리스너 등록
            kakao.maps.event.addListener(marker, "click", () => {
                handleMarkerClick(item); // 선택한 마커 정보를 핸들러에 전달
            });
        });

        return () => {
            kakao.maps.event.removeListener(map, "dragend");
        };
    }, []);

    return (
        <>
            <Map onMarkerClick={handleMarkerClick} />
            <NavigateBar />
            {selectedMarker && (
                <ClearModal onCloseExplainBox={closeExplainBox}>
                    <ExplainBox
                        marker={selectedMarker}
                    />
                </ClearModal>

            )}
        </>
    );
}

export default MapShowAll;
