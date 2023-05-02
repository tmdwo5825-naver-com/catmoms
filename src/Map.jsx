import React, { useEffect } from "react";

function Map() {
    useEffect(() => {
        const container = document.getElementById("kakao-map");
        const options = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        return () => {
            kakao.maps.event.removeListener(map, "dragend");
        };
    }, []);

    return <div id="kakao-map" style={{ width: "500px", height: "500px" }} />;
}

export default Map;
