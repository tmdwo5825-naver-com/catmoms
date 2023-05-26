import React, { useState, useEffect } from "react";
import ExplainBox from "./ExplainBox";
import ClearModal from "./ClearModal";
import NavigateBar from "./NavigateBar";
import { convertImageToCircle } from "./CircleImage";
import Map from "./Map";

/* global kakao */

function Map2() {
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (markerData) => {
        setSelectedMarker(markerData);
    };

    const closeExplainBox = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        const container = document.getElementById("kakao-map");

        const options = {
            center: new kakao.maps.LatLng(36.628113354779614, 127.45698538088607),
            // draggable: false,// 맵 드래그 불가
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        map.setMaxLevel(4);
        map.setMinLevel(2);

        // 서버에서 JSON 데이터를 가져올 함수
        async function fetchData() {
            const response = await fetch("your_fastapi_endpoint"); // FastAPI의 엔드포인트를 입력해야 합니다.
            const fetchedData = await response.json();

            return fetchedData;
        }

        // 어떤 작업을 할 때마다 마커를 추가
        async function createMarker(item) {
            const position = new kakao.maps.LatLng(item.y, item.x);
            const markerImageUrl = await convertImageToCircle(item.imageUrl);

            const markerImage = new kakao.maps.MarkerImage(
                markerImageUrl,
                new kakao.maps.Size(60, 60),
                { offset: new kakao.maps.Point(30, 30) }
            );

            const marker = new kakao.maps.Marker({
                position: position,
                image: markerImage,
            });
            marker.setMap(map);

            kakao.maps.event.addListener(marker, "click", () => {
                handleMarkerClick(item);
            });
        }

        fetchData().then((fetchedData) => {
            // 서버에서 가져온 데이터로 마커 생성
            fetchedData.forEach((item) => {
                createMarker(item);
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
                    <ExplainBox marker={selectedMarker} />
                </ClearModal>
            )}
        </>
    );
}

export default Map2;

