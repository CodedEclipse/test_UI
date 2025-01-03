import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { admin_logged_data, admin_logged_clear } from '../../Configuration';
import { admin_post_data } from '../../ApiServices.js';
import Dropdown from 'react-bootstrap/Dropdown';
import '../assets/vendor/css/core.css'
import '../assets/vendor/fonts/boxicons.css'
import '../assets/vendor/css/theme-default.css'
import '../assets/css/demo.css'
import '../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../assets/vendor/libs/apex-charts/apex-charts.css'


import { Toast } from '../../ToasterService.js';


function Header({ toggleSidebar }) {
  const [action, setAction] = useState(false);

  const toggleAction = () => {
    setAction(prevAction => !prevAction);
    toggleSidebar();
  };

  const navigate = useNavigate();
  const [loggedData, setLoggedData] = useState({});

  useEffect(() => {
    var tempLogged = admin_logged_data();
    setLoggedData(tempLogged);
    if (tempLogged == null || tempLogged.status === false) {
      navigate("/");
    }
  }, [navigate]);

  const logout = async () => {

    await admin_post_data('/admin/logout', {}, admin_logged_data())
      .then((res) => {
        res.data = JSON.parse(res.data)
        console.log('res.data', res.data);

        if (res.data.status) {
          admin_logged_clear();
          navigate("/login");
        } else {
          Toast(2, res.data.message);
        }
      }).catch((e) => {
        console.log('e', e);
        Toast(2, e.response.data.error);
      });

  }


  return (
    <>
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
            <i className="bx bx-menu bx-md"></i>
          </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search bx-md"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none ps-1 ps-sm-2"
                placeholder="Search..."
                aria-label="Search..." />
            </div>
          </div>
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-4">
              <a
                className="github-button"
                href="https://github.com/themeselection/sneat-html-admin-template-free"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
              >Star</a
              >
            </li>
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow p-0"
                href="javascript:void(0);"
                data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">John Doe</h6>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user bx-md me-3"></i><span>My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#"> <i className="bx bx-cog bx-md me-3"></i><span>Settings</span> </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 bx bx-credit-card bx-md me-3"></i
                      ><span className="flex-grow-1 align-middle">Billing Plan</span>
                      <span className="flex-shrink-0 badge rounded-pill bg-danger">4</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:void(0);">
                    <i className="bx bx-power-off bx-md me-3"></i><span>Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;