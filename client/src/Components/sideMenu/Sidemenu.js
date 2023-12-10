import React from 'react';
import "./Sidemenu.css"
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export const SidemenuData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/dashboard"
  },

  {
    title: "Customers",
    icon: <AccountBoxIcon />,
    link: "/customer"
  },
  {
    title: "Products",
    icon: <ShoppingCartIcon />,
    link: "/products"
  },
  {
    title: "Transaction",
    icon: <LibraryBooksIcon />,
    link: "/transaction"
  },
  {
    title: "Order",
    icon: <ContentPasteIcon />,
    link: "/order/dashboard"
  },

  {
    title: "Employees",
    icon: <GroupsIcon />,
    link: "/employees"
  },
  {
    title: "Suppliers",
    icon: <SupervisedUserCircleIcon />,
    link: "/suppliers"
  },
  {
    title: "Stock",
    icon: <Inventory2Icon />,
    link: "/stock"
  },

  {
    title: "Managers",
    icon: <SupportAgentIcon />,
    link: "/subadmin"
  },

];

function Sidemenu() {
  return (
    <div className="SideMenu col-2" >
      <ul className="sidebarList">
        {SidemenuData.map((val, key) => {
          return (
            <li
              key={key}
              className="sm-line"
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>

  );
}

export default Sidemenu;
