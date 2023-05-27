import React, { useState, useEffect } from "react";
import ExplainBox from "./ExplainBox";
import ClearModal from "./ClearModal";
import NavigateBar from "./NavigateBar";
import { convertImageToCircle } from "./CircleImage";
import Map from "./Map";
import classes from "./Map.module.css";
/* global kakao */

function Map3Hour() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [countData, setCountData] = useState([]);

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
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        map.setMaxLevel(4);
        map.setMinLevel(2);

        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/first-data"); // 첫 번째 데이터를 가져오는 엔드포인트
            const fetchedData = await response.json();
            console.log("First data:", fetchedData);
            return fetchedData;
        }

        // 어떤 작업을 할 때마다 마커를 추가
        async function createMarker(item) {
            const position = new kakao.maps.LatLng(item.y, item.x);
            const markerImageUrl = await convertImageToCircle(item.url);

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
            fetchedData.forEach((item) => {
                createMarker(item);
            });
        });

        const countData = [
            { id: 1, count: 3 },
            { id: 2, count: 5 },
            { id: 3, count: 2 },
        ];
        setCountData(countData);

        const circles = [
            { lat: 36.62785410610158, lng: 127.45313788589664, strokeColor: "red", fillColor: "red"},
            { lat: 36.63054690049551, lng: 127.4568566387854, strokeColor: "blue",fillColor: "blue"},
            { lat: 36.628825506703954, lng: 127.45738760306085, strokeColor: "orange", fillColor: "orange"}
        ];

        circles.forEach((circleData, index) => {
            const circle = new kakao.maps.Circle({
                center: new kakao.maps.LatLng(circleData.lat, circleData.lng),
                radius: 120,
                strokeWeight: 2,
                strokeColor: circleData.strokeColor,
                strokeOpacity: 0.2,
                strokeStyle: "line",
                fillColor: circleData.fillColor,
                fillOpacity: 0.4,
            });
            circle.setMap(map);

            const count = countData[index];
            if (count) {
                const countMarker = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(circleData.lat, circleData.lng),
                    content: `<div class="${classes.countMarker}">${count.count}</div>`,
                    zIndex: 1,
                });
                countMarker.setMap(map);
            }
        });

        function panTo() {
            var moveLatLon = new kakao.maps.LatLng(
                36.628113354779614,
                127.45698538088607
            );
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

export default Map3Hour;


/* 백엔드와 연결할 수 있는 코드
import React, { useState, useEffect } from "react";
import ExplainBox from "./ExplainBox";
import ClearModal from "./ClearModal";
import NavigateBar from "./NavigateBar";
import { convertImageToCircle } from "./CircleImage";
import Map from "./Map";
import classes from "./Map.module.css";


function Map3Hour() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [countData, setCountData] = useState([]);

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
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        map.setMaxLevel(4);
        map.setMinLevel(2);

        // 첫 번째 데이터를 가져오는 함수
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/first-data");
            const fetchedData = await response.json();
            console.log("First data:", fetchedData);
            return fetchedData;
        }

        // 마커 생성 함수
        async function createMarker(item) {
            const position = new kakao.maps.LatLng(item.y, item.x);
            const markerImageUrl = await convertImageToCircle(item.url);

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

        // 첫 번째 데이터를 가져와서 마커 생성
        fetchData().then((fetchedData) => {
            fetchedData.forEach((item) => {
                createMarker(item);
            });
        });

        // countData를 가져오는 함수
        async function fetchCountData() {
            const response = await fetch("http://127.0.0.1:8000/count-data");
            const fetchedData = await response.json();
            console.log("Count data:", fetchedData);
            setCountData(fetchedData);
        }

        // countData를 가져와서 원과 카운터 표시
        fetchCountData();

        const circles = [
            {
                lat: 36.62785410610158,
                lng: 127.45313788589664,
                strokeColor: "red",
                fillColor: "red",
            },
            {
                lat: 36.63054690049551,
                lng: 127.4568566387854,
                strokeColor: "blue",
                fillColor: "blue",
            },
            {
                lat: 36.628825506703954,
                lng: 127.45738760306085,
                strokeColor: "orange",
                fillColor: "orange",
            },
        ];

        circles.forEach((circleData, index) => {
            const circle = new kakao.maps.Circle({
                center: new kakao.maps.LatLng(circleData.lat, circleData.lng),
                radius: 120,
                strokeWeight: 2,
                strokeColor: circleData.strokeColor,
                strokeOpacity: 0.2,
                strokeStyle: "line",
                fillColor: circleData.fillColor,
                fillOpacity: 0.4,
            });
            circle.setMap(map);

            const count = countData[index];
            if (count) {
                const countMarker = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(circleData.lat, circleData.lng),
                    content: `<div class="${classes.countMarker}">${count.count}</div>`,
                    zIndex: 1,
                });
                countMarker.setMap(map);
            }
        });

        function panTo() {
            var moveLatLon = new kakao.maps.LatLng(
                36.628113354779614,
                127.45698538088607
            );
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

export default Map3Hour;

 */