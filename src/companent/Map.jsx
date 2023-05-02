import React, { useEffect } from "react";

/*global kakao*/
function Map() {
    useEffect(() => {
        const container = document.getElementById("kakao-map");
        const options = {
            center: new kakao.maps.LatLng(36.628113354779614, 127.45698538088607),
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);

        return () => {
            kakao.maps.event.removeListener(map, "dragend");
        };
    }, []);

    return <div id="kakao-map" style={{ width: "630px", height: "630px" }} />;
}

export default Map;