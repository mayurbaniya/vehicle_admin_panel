import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState("NEW");

  const handleSelectChange = (e) => {
    setSelectedEnvironment(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light slim-navbar">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto" style={{ marginLeft: "auto" }}>
          <li className="nav-item">
            <div className="d-flex align-items-center">
              <span className="mr-2">Sort By:</span>
              <select
                className="form-control mr-2"
                value={selectedEnvironment}
                onChange={handleSelectChange}
                style={{ width: "auto" }}
              >
                <option value="NEW">Date</option>
                <option value="NAME">Name</option>
                <option value="PRIORITY">Priority</option>
              </select>
              <select
                className="form-control"
                value={selectedEnvironment}
                onChange={handleSelectChange}
                style={{ width: "auto" }}
              >
                <option value="ENVIRONMENT">ENVIRONMENT</option>
                <option value="NEW">NEW</option>
                <option value="USED">USED</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
