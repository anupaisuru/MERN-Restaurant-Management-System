import React from 'react'
import './Ksidebar.css'
import { Link } from 'react-router-dom'

function Ksidebar() {
    return (
        
            <div className=" ksidebar">
                <ul class="nav flex-column ">
                    <Link to="/kitchen"><li class="nav-item ">
                        <span class="material-symbols-outlined">
                            home</span>&nbsp;  &nbsp;Dashboard</li></Link>
                    <Link to="/kitchen/pending-order"><li class="nav-item"><span class="material-symbols-outlined">
                        local_dining
                    </span>&nbsp;  &nbsp;Pending Order</li></Link>
                    <Link to="/kitchen/complete-order"><li class="nav-item"><span class="material-symbols-outlined">
                        select_check_box
                    </span> &nbsp;  &nbsp;Complete Orders</li></Link>
                </ul>
            </div>
      
    )
}

export default Ksidebar