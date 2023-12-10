import "./OrderSideBar.css";
import { Link } from "react-router-dom";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import LibraryAddCheckSharpIcon from "@mui/icons-material/LibraryAddCheckSharp";
import DeliveryDiningSharpIcon from "@mui/icons-material/DeliveryDiningSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { useState } from "react";

const items = [
    {
        id: 1,
        name: "DashBoard",
        icon: <HomeSharpIcon />,
        path: "/order/dashboard",
    },

    {
        id: 2,
        name: "Orders",
        icon: <ContentPasteIcon />,
        path: "/order/orders",
    },

    {
        id: 3,
        name: "Pending Orders",
        icon: <PendingActionsSharpIcon />,
        path: "/order/pending",
    },

    {
        id: 4,
        name: "Completed Orders",
        icon: <LibraryAddCheckSharpIcon />,
        path: "/order/complete",
    },

    {
        id: 5,
        name: "Delivering Orders",
        icon: <DeliveryDiningSharpIcon />,
        path: "/order/delivering",
    },

    {
        id: 6,
        name: "Delivered Orders",
        icon: <CheckBoxSharpIcon />,
        path: "/order/deliver",
    },

    {
        id: 7,
        name: "Cancelled Orders",
        icon: <CancelSharpIcon />,
        path: "/order/cancel",
    },
];

function OrderSideBar() {
    const [active, setActive] = useState(1);

    const handleActive = (id) => {
        setActive(id);
        console.log(id)
    }

    return (
        <div className="sidebar-container">
            {items.map((item) => (
                <Link
                    to={item.path}
                    key={item.id}
                    className="sidebar-item"
                    onClick={() => handleActive(item.id)}
                    style={{
                        background: active === item.id ? "#CBCAFF" : "",
                    }}
                >
                    <div className="icon-name">
                        {item.icon}
                        {item.name}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default OrderSideBar;
