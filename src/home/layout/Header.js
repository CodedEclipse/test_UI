import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { admin_logged_data, admin_logged_clear, set_alert_msg } from '../../Configuration';
import Dropdown from 'react-bootstrap/Dropdown';
// import '../assets/styles/adminlayout.css';
// import '../assets/js/js-config.js';
// import '../assets/js/main.js';
import { Toast } from '../../ToasterService.js';
function Header() {
  const navigate = useNavigate();
  const [loggedData, setLoggedData] = useState({});

  return (
    <>
    </>
  );
}

export default Header;