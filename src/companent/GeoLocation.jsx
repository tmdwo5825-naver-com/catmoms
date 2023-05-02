import React, { useState, useEffect } from "react";

function Geolocation(props) {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition(position);
                    if (props.onSuccess) {
                        props.onSuccess(position);
                    }
                },
                (error) => {
                    console.error(error);
                    if (props.onError) {
                        props.onError(error);
                    }
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            if (props.onError) {
                props.onError(new Error("Geolocation is not supported by this browser."));
            }
        }
    }, [props]);

    return null;
}

export default Geolocation;
