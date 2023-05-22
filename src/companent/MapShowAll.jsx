import React, { useState, useEffect } from "react";
import data from "../db/data.json";
import Map from "./Map";
import ExplainBox from "./ExplainBox";
import ClearModal from "./ClearModal";
import NavigateBar from "./NavigateBar";
import { convertImageToCircle } from "./CircleImage";

/* global kakao */

function MapShowAll() {
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

        const createMarker = async (item) => {
            const position = new kakao.maps.LatLng(item.y, item.x);
            const markerImageUrl = await convertImageToCircle(item.imageUrl);//마커 이미지를 원으로 수정하여 설정

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
        };

        data.data.forEach((item) => {
            createMarker(item);
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

export default MapShowAll;
