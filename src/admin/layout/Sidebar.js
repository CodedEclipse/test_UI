import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, NavLink } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([false]);

  const toggleAction = index => {
    setActions(prevActions => 
      prevActions.map((action, i) => i === index ? !action : action)
    );
  };


  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink to="/">
              <i className="fas fa-th"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" onClick={() => toggleAction(0)}>
              <i className="fas fa-bars"></i><span>Components</span>
              {actions[0] ? (
                <i className="fas fa-chevron-up ms-auto"></i>
              ) : (
                <i className="fas fa-chevron-down ms-auto"></i>
              )}
            </a>
            <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <NavLink to="/user-list">
                    <i className="far fa-circle"></i><span>Users List</span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="users-profile.html">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </a>
          </li> */}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;




