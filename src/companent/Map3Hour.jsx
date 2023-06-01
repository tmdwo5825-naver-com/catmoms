import React, { useState, useEffect } from "react";
import ExplainBox from "./ExplainBox";
import ClearModal from "./ClearModal";
import NavigateBar from "./NavigateBar";
import { convertImageToCircle } from "./CircleImage";
import Map from "./Map";
import classes from "./Map.module.css";
import Modal from "./Modal";
import InfoBox from "./InfoBox";
/* global kakao */

function Map3Hour() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [countData, setcountData] = useState([]);
    const [IsOverlayOpen, SetIsOverlayOpen] = useState(false);
    const [renderCount, setRenderCount] = useState(0);
    const [fetchCount, setFetchCount] = useState(0);

    const handleMarkerClick = (markerData) => {
        setSelectedMarker(markerData);
    };

    const closeExplainBox = () => {
        setSelectedMarker(null);
    };

    const handleButtonInfoClick = () => {
        SetIsOverlayOpen(true);
    };

    const handleOverlayClose = () => {
        SetIsOverlayOpen(false);
    };


    useEffect(() => {
        if (renderCount >= 1) {
            return;
        }
        const container = document.getElementById("kakao-map");

        const options = {
            center: new kakao.maps.LatLng(36.628113354779614, 127.45698538088607),
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        map.setMaxLevel(4);
        map.setMinLevel(2);

        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/3hours"); // FastAPI의 엔드포인트를 입력해야 합니다.
            const fetchedData = await response.json();
            console.log("Fetched data:", fetchedData);
            return fetchedData.data; // JSON 객체 배열을 반환하도록 수정
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

        async function fetchCountData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/count");
                const fetchedData = await response.json(); // "data2" 대신 fetchedData 변수명 변경
                const newData = fetchedData["data2"].map(item => { // "data2"에 접근하여 변환
                    return { id: item.id, count: item.count };
                });
                console.log(newData);
                setcountData(newData);
                console.log("CountData :", countData);
            } catch (err) {
                console.log(err);
            }
        }

        if (fetchCount < 1) {
            fetchCountData();
            setFetchCount(fetchCount + 1);
        }

        //캣타워 범위(원)
        const circles = [
            { lat: 36.62819021028072, lng: 127.45361612914417, strokeColor: "orange", fillColor: "orange", radius : 200},//양성재 좌측하단 36.62656935117971, 127.4515271608071  /우측상단 36.62981656325492, 127.45543688761717
            { lat: 36.63094320061501, lng: 127.45714296470376, strokeColor: "red",fillColor: "red", radius : 90},//개성재 좌측하단 36.63013839671825, 127.45610960893917  /우측상단 36.631698348276466, 127.458198409401
            { lat: 36.629052242081166, lng: 127.4567740263603, strokeColor: "blue", fillColor: "blue", radius : 100},//솔못 좌측하단 36.62842402748002, 127.45551254530146  /우측상단 36.62989716070364, 127.45791941588986
            { lat: 36.625140843044164, lng: 127.45807574430857, strokeColor: "green", fillColor: "green", radius : 150}//양진재  좌측하단 36.623792267078755, 127.45667591155414  /우측상단 36.62624935703808, 127.45979841801855
        ];
        circles.forEach((circleData, index) => {
            const circle = new kakao.maps.Circle({
                center: new kakao.maps.LatLng(circleData.lat, circleData.lng),
                radius: circleData.radius,
                strokeWeight: 2,
                strokeColor: circleData.strokeColor,
                strokeOpacity: 0.125,
                strokeStyle: "line",
                fillColor: circleData.fillColor,
                fillOpacity: 0.2,
            });
            circle.setMap(map);

            //캣타워(마커)
            const catTowerArea = [
                {
                    lat: 36.62819021028072,
                    lng: 127.45361612914417,
                    img: "sungjae.png",
                },
                {
                    lat: 36.63094320061501,
                    lng: 127.45714296470376,
                    img: "n14.png",
                },
                {
                    lat: 36.629052242081166,
                    lng: 127.4567740263603,
                    img: "sol.png",
                },
                {
                    lat: 36.625140843044164,
                    lng: 127.45807574430857,
                    img: "jinjae.png",
                }
            ];

            const tower = catTowerArea[index];
            var imageSize = new kakao.maps.Size(100, 100);
            var markerImage = new kakao.maps.MarkerImage(tower.img, imageSize);
            if (tower) {
                const catTowerMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(tower.lat-0.00005, tower.lng),
                    image: markerImage,
                });
                catTowerMarker.setMap(map);
            }

            //카운트
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

        if (renderCount >= 1) {
            return;
        }

        if (JSON.stringify(countData) === JSON.stringify([])) {
            setRenderCount(renderCount + 1);
        }



        setRenderCount(renderCount + 1);
    }, [countData, renderCount, fetchCount]);

    return (
        <>
            <button className={classes.infoButton} onClick={handleButtonInfoClick}>
                <span className="material-icons">help</span></button>
            {IsOverlayOpen && <Modal onClose={handleOverlayClose}><InfoBox /></Modal>}
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