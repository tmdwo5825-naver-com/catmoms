import React, { useState } from "react";
import Map from "./companent/Map";
import Upload from "./companent/Upload";
import ToShowAll from "./companent/ToShowAll";
import NavigateBar from "./companent/NavigateBar";
function App() {
    return (
        <div>
            <Map/>
            <NavigateBar />
        </div>
    );
}

export default App;
