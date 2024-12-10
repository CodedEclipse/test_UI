import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { admin_logged_data, decrypt, encrypt, has_admin_permission } from '../../Configuration';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Collapse } from 'react-bootstrap';
// import { admMenuItems } from '../../admin/components/admMenuItems';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const Usermenu = ['/user-list', '/add-user', '/roles']
  const mastermenu = ['/countries', "/locale-config", "/bank-list", `/bank-ifsc/${params?.bank_id}`]
  const manageTemplateMenu = ['/sms-template', '/email-template']
  const entityConfigMenu = ['/user-designations', "/user-documents", "/csr-documents", "/documents", "/entity-form-fields", "/entity-types", "/parent-oragnizations", "/registration-types", "/area-of-experties", "/services-head"]
  const entityRegsMenu = ['/corporate-list', '/foundation-list', '/implementing-list', '/vendor-list', '/accreditation-list', '/philanthropist-list', '/consultant-list']
  const contentMenu = ['/terms-and-conditions']

  const [open, setOpen] = useState(Usermenu.includes(location.pathname));

  const [open1, setOpen1] = useState(mastermenu.includes(location.pathname));
  const [open2, setOpen2] = useState(manageTemplateMenu.includes(location.pathname));
  const [open3, setOpen3] = useState(entityConfigMenu.includes(location.pathname));
  const [open4, setOpen4] = useState(entityRegsMenu.includes(location.pathname));
  const [open5, setOpen5] = useState(contentMenu.includes(location.pathname));
  const [currentPage, setCurrentPage] = useState('');
  const [loggedData, setLoggedData] = useState({});

  
  const [openSection, setOpenSection] = useState(null);


  const sections = {
    admin_user_management: 'ADMIN_USER_MANAGEMENT',
    dashboard: 'DASHBOARD',
    health_dashboard: 'HEALTH_DASHBOARD',
    overall_reports: 'OVERALL_REPORTS',
    data_uploads: 'DATA_UPLOADS',
    invalid_records: 'INVALID_RECORDS',
    dedupe_status: 'DEDUPE_STUTUS',
    cersai_result: 'CERSAI_RESULT',
    cersai_error: 'CERSAI_ERROR',
    admin_profile_request: 'ADMIN_PROFILE_REQUEST',
    employee_management: 'EMPLOYEE_MANAGEMENT',
    manage_template: 'MANAGE_TEMPLATE',
    master_entry: 'MASTER_ENTRY',
    profile: 'Profile',

  }



  const nav_links = {
    admin_user_management: {
      section_name: sections.admin_user_management,
      links: ['/user-list', '/add-user', '/roles']
    },

    dashboard: {
      section_name: sections.dashboard,
      links: ['/dashboard'],
    },

    health_dashboard: {
      section_name: sections.health_dashboard,
      links: ['/Healthdashboard'],
    },

    overall_reports: {
      section_name: sections.overall_reports,
      links: ['/overall-reports'],
    },

    data_uploads: {
      section_name: sections.data_uploads,
      links: ['/DataUpload'],
    },

    invalid_records: {
      section_name: sections.invalid_records,
      links: ['/invalid-records'],
    },

    dedupe_status: {
      section_name: sections.dedupe_status,
      links: ['/dedupe-status'],
    },

    cersai_result: {
      section_name: sections.cersai_result,
      links: ['/data-mismatch']['/data-mismatch', '/success', '/cersai-reject', '/upload-success', '/upload-reject', '/probable-match'],
    },

    cersai_error: {
      section_name: sections.cersai_error,
      links: ['interanl-ckyc-data'],
    },

    entity_profile_request: {
      section_name: sections.entity_profile_request,
      links: ['/entity-profile-request'],
    },
    admin_profile_request: {
      section_name: sections.admin_profile_request,
      links: ['/admin-profile-request'],
    },


    employee_management: {
      section_name: sections.employee_management,
      links: ['/employee-list', '/add-new-employee']
    },
    manage_template: {
      section_name: sections.manage_template,
      links: ['/sms-template', '/email-template']
    },

    master_entry: {
      section_name: sections.master_entry,
      links: ['/countries', "/locale-config", "/bank-list", `/bank-ifsc/${params?.bank_id}`]
    },

    profile: {
      section_name: sections.profile,
      links: ['/Profile']
    }

  }

  useEffect(() => {
    var tempLogged = admin_logged_data();
    if (tempLogged == null || !tempLogged.access_token || tempLogged.access_token.length <= 0) {
      navigate("/login");
      return;
    }
    setCurrentPage(location.pathname);
  }, []);

 






  function hideBackdrop() {
    var backdrop = document.getElementById("custom-backdrop");
    if (backdrop) {
      document.body.removeChild(backdrop);
      document.body.style.overflow = null;
      document.body.style.paddingRight = null;
    }
  }
  function showBackdropAndOpenMob() {
    let a = document.querySelector('[data-layout-position="fixed"]');
    let attribute = a.getAttribute('data-sidenav-size')
    const sidebar = document.getElementById('admin-sidebar');
    if (attribute === 'full') {
      sidebar.style.zIndex = 1055;
      const sidebarMZ = document.querySelectorAll('.sb-margin-zero-mob');
      sidebarMZ.forEach((item) => item.classList.add('ms-0'));
      a.setAttribute('data-sidenav-size', 'default');
    } else if (attribute === 'default') {
      //a.setAttribute('data-sidenav-size','condensed')
      a.setAttribute('data-sidenav-size', 'full');
      hideBackdrop();
    } else {
      a.setAttribute('data-sidenav-size', 'default')
    }
  }

  function handleSidebarClose() {
    showBackdropAndOpenMob();
  }
  function handleSidebarCloseMob() {
    let a = document.getElementById('sidebar-close-btn-mob')
    if (a) {
      if (760 > window.innerWidth) {
        a.click()
      }
    } else {
      return
    }
  }


  const handleToggleSection = (section) => {
    if (openSection !== section) {
      setOpenSection(section);
    } else {
      setOpenSection(null);
    }
  }

  function CloseButton() {
    const offcanvasclosebtn = document.getElementById('offcanvasclosebtn');
    offcanvasclosebtn.click();
  }

  return (

    <div>
      <div className="offcanvas offcanvas-start offcanvas_wid" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header px-4">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">  <i className="fas fa-bars font-toggle-btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i><span className='ms-3'>Menu</span></h5>
          <button type="button" className="btn-close offcanvas-closebtn text-reset" id='offcanvasclosebtn' data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0 sidebar" >
          {/* <ul className='menu-link'>
            {has_admin_permission(admMenuItems.DASHBOARD) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.dashboard ? ' side_header_active ' : '')}>
                <NavLink to="/dashboard" className="roboto-regular text-decoration-none text-dark font-15"
                  onClick={() => { handleToggleSection(sections.dashboard); CloseButton(); }}>
                  Dashboard
                </NavLink>
              </li>
            }
            {has_admin_permission(admMenuItems.HEALTH_DASHBOARD) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.health_dashboard ? ' side_header_active ' : '')}>
                <NavLink to='Healthdashboard' onClick={() => { handleToggleSection(sections.health_dashboard); CloseButton(); }} className='roboto-regular text-decoration-none text-dark font-15'>Health dashboard</NavLink>
              </li>
            }

            {has_admin_permission(admMenuItems.OVERALL_REPORTS) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.overall_reports ? ' side_header_active ' : '')}>
                <NavLink to='' onClick={() => { handleToggleSection(sections.overall_reports); CloseButton(); }} className='roboto-regular text-decoration-none text-dark font-15'>Overall Reports</NavLink>
              </li>
            }
            {has_admin_permission(admMenuItems.DATA_UPLOADS) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.data_uploads ? ' side_header_active ' : '')}>
                <NavLink to='DataUpload' onClick={() => { handleToggleSection(sections.data_uploads); CloseButton(); }} className='roboto-regular text-decoration-none text-dark font-15'>Data Upload</NavLink>
              </li>
            }

            {has_admin_permission(admMenuItems.INVALID_RECORDS) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.invalid_records ? ' side_header_active ' : '')}>
                <NavLink to='InvalidRecords' className='roboto-regular text-decoration-none text-dark font-15' onClick={() => { handleToggleSection(sections.invalid_records); CloseButton(); }}>Invalid Record</NavLink>
              </li>
            }
             {has_admin_permission(admMenuItems.PROFILE) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.profile ? ' side_header_active ' : '')}>
                <NavLink to="/Profile" className="roboto-regular text-decoration-none text-dark font-15"
                  onClick={() => { handleToggleSection(sections.profile); CloseButton(); }}>
                  Profile
                </NavLink>
              </li>
            }
           
            <Accordion className='p-0'>
              {
                has_admin_permission(admMenuItems.DEDUPE_STUTUS) &&
                <li className={" py-2 px-4 side-nav-item"}>
                  <Accordion.Item eventKey="0" className='border-0 p-0'>
                    <Accordion.Header className='p-0 accordion-btn roboto-regular text-dark font-15'>Dedupe Status</Accordion.Header>
                    <Accordion.Body className='p-0'>
                      <ul className='menu-link'>
                        {
                          has_admin_permission(admMenuItems.CHEKER_REVIEW) &&
                          <li className='py-2'>
                            <NavLink to="" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? ' sub-item-active active' : 'inactive'}`}>
                              Cheker Review
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.AUTHORIZER_APPROVAL) &&
                          <li className='py-2'>
                            <NavLink to="" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? ' sub-item-active active' : 'inactive'}`}>
                              Authorizer Approval
                            </NavLink>
                          </li>
                        }


                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              }
              {
                has_admin_permission(admMenuItems.CERSAI_RESULT) &&
                <li className={" py-2 px-4 side-nav-item"}>
                  <Accordion.Item eventKey="1" className='border-0 p-0'>
                    <Accordion.Header className='p-0 accordion-btn roboto-regular'>CERSAI Result</Accordion.Header>
                    <Accordion.Body className='p-0'>
                      <ul className='menu-link'>
                        {
                          has_admin_permission(admMenuItems.DATA_MISMATCH) &&
                          <li className='py-2'>
                            <NavLink to="user-list" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Data Mismatch
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.SUCCESS) &&
                          <li className='py-2'>
                            <NavLink to="user-list" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Success
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.CERSAI_REJECT) &&
                          <li className='py-2'>
                            <NavLink to="user-list" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              CERSAI Reject
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.UPLOAD_SUCCESS) &&
                          <li className='py-2'>
                            <NavLink to="user-list" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Upload Success
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.UPLOAD_REJECT) &&
                          <li className='py-2'>
                            <NavLink to="user-list" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Upload Reject
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.PROBABLE_MATCH) &&
                          <li className='py-2'>
                            <NavLink to="user-list" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Probable Match
                            </NavLink>
                          </li>
                        }
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              }
              {
                has_admin_permission(admMenuItems.CERSAI_ERROR) &&
                <li className={" py-2 px-4 side-nav-item"}>
                  <Accordion.Item eventKey="2" className='border-0 p-0'>
                    <Accordion.Header className='p-0 accordion-btn'>CERSAI Error</Accordion.Header>
                    <Accordion.Body className='p-0'>
                      <ul className='menu-link'>
                        {
                          has_admin_permission(admMenuItems.INTERNAL_CKYC_DATA) &&
                          <li className='py-2'>
                            <NavLink to="" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Internal CKYC Data
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.INTERNAL_CKYC_DATA) &&
                          <li className='py-2'>
                            <NavLink to="" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Internal CKYC Data 2
                            </NavLink>
                          </li>
                        }
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              }

              {
                has_admin_permission(admMenuItems.ADMIN_USER_MANAGEMENT) &&
                <li className={" py-2 px-4 side-nav-item"}>
                  <Accordion.Item eventKey="3" className='border-0 p-0'>
                    <Accordion.Header className='p-0 accordion-btn' onClick={() => handleToggleSection(sections.admin_user_management)}>Admin User <br /> Management</Accordion.Header>
                    <Accordion.Body className='p-0'>
                      <ul className='menu-link'>
                        {
                          has_admin_permission(admMenuItems.AUM_VIEW_USER_LIST) &&
                         <li className='py-2'>
                            <NavLink onClick={CloseButton} to="user-list"  className={({ isActive }) => ` roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              View User List
                            </NavLink>
                            </li>
                        }
                      


                        {
                          has_admin_permission(admMenuItems.AUM_ADD_NEW_USER) &&
                          <li className=''>
                            <NavLink to="add-user" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Add New User
                            </NavLink>
                          </li>
                        }
                        {
                          has_admin_permission(admMenuItems.ANU_MANAGE_ROLES) &&
                          <li className='py-2'>
                            <NavLink to="roles" onClick={CloseButton} className={({ isActive }) => `roboto-regular text-decoration-none text-dark font-15 py-2 d-block px-3 ${isActive ? 'sub-item-active active' : 'inactive'}`}>
                              Manage Roles
                            </NavLink>
                          </li>
                        }

                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              }

            </Accordion>

            {has_admin_permission(admMenuItems.INTERNAL_CKYC_DATA) &&
              <li className={"py-2 px-4 list-style-none" + (openSection === sections.InternalCKYCData ? ' side_header_active ' : '')}>
                <NavLink to="/InternalCKYCData" className="roboto-regular text-decoration-none text-dark font-15"
                  onClick={() => { handleToggleSection(sections.InternalCKYCData); CloseButton(); }}>
                  Internal CKYC Data
                </NavLink>
              </li>
            }
          </ul> */}
        </div>
      </div>
    </div>

  );
}

export default Sidebar;




