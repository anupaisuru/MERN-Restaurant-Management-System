import React from 'react'
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";


function Loader() {

    let [loading, setLoading] = useState(true);

    const override  = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
      
    return (
        <div style={{marginTop:'180px'}}>
            <div className="sweet-loading text-center">

                <HashLoader
                         loading={loading}
                         color = '#6D9886'
                         cssOverride={override}
                         size={110}
                         aria-label="Loading Spinner"
                         data-testid="loader"
                />
            </div>

        </div>
    )
}

export default Loader