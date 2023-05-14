import React, { useState } from "react";
import Map from "./companent/Map";
import Upload from "./companent/routes/Upload";
import ToShowAll from "./companent/ToShowAll";

function App() {
    return (
        <div>
            <Map/>
            <Upload />
            <ToShowAll />
        </div>
    );
}

export default App;
