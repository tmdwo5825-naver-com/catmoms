import React, { useState } from "react";
import Map from "./companent/Map";
import Geolocation from "./companent/GeoLocation";

function App() {
    const [position, setPosition] = useState(null);

    const handleSuccess = (position) => {
        setPosition(position);
    };

    const handleError = (error) => {
        console.error(error);
    };

    return (
        <div>
            <h1>카카오맵</h1>
            <Map />
            <Geolocation onSuccess={handleSuccess} onError={handleError} />
            {position ? (
                <div>
                    <p>위도: {position.coords.latitude}</p>
                    <p>경도: {position.coords.longitude}</p>
                    <Map />
                </div>
            ) : (
                <p>위치 정보 가져오는 중...</p>
            )}
        </div>
    );
}

export default App;
