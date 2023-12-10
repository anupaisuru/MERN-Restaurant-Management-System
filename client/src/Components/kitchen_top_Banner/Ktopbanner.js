import React, { useState, useEffect } from 'react';

function Ktopbanner() {
    const [curDT, setCurDT] = useState(new Date().toLocaleString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurDT(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="card bg-dark p-2 top-dashboard">
                <p className="text-dark text-center dttm">Welcome to Dashboard</p>
                <p className="card-text text-end text-dark">{curDT}</p>
            </div>
        </div>
    );
}

export default Ktopbanner;
