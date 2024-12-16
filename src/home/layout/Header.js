import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { admin_logged_data, admin_logged_clear, set_alert_msg } from '../../Configuration';
import Dropdown from 'react-bootstrap/Dropdown';
import '../assets/css/style.css';
// import '../assets/js/js-config.js';
// import '../assets/js/main.js';
import { Toast } from '../../ToasterService.js';
function Header() {
  const navigate = useNavigate();
  const [loggedData, setLoggedData] = useState({});

  return (
    <>
      <header class="container header">
        <nav class="nav">
          <div class="logo">
            <h2>Devkit.</h2>
          </div>

          <div class="nav_menu" id="nav_menu">
            <button class="close_btn" id="close_btn">
              <i class="ri-close-fill"></i>
            </button>

            <ul class="nav_menu_list">
              <li class="nav_menu_item">
                <a href="#" class="nav_menu_link">account</a>
              </li>
              <li class="nav_menu_item">
                <a href="#" class="nav_menu_link">about</a>
              </li>
              <li class="nav_menu_item">
                <a href="#" class="nav_menu_link">service</a>
              </li>
              <li class="nav_menu_item">
                <a href="#" class="nav_menu_link">contact</a>
              </li>
            </ul>
          </div>

          <button class="toggle_btn" id="toggle_btn">
            <i class="ri-menu-line"></i>
          </button>
        </nav>
      </header>
    </>
  );
}

export default Header;