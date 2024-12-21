import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../css/dashboard/Leads.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { fetchData, updateLead } from "../../service/LeadsService";
import PaginationFooter from "../commons/PaginationFooter";
import { Stack, Alert } from "react-bootstrap"; // Import Alert from react-bootstrap
import Navbar from "../specific/LeadsNavbar";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [editLeadId, setEditLeadId] = useState(null);
  const [editLeadData, setEditLeadData] = useState({});
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const timerRef = useRef(null);

  useEffect(() => {
    fetchLeads();
    if (message) {
      timerRef.current = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timerRef.current);
    }
  }, [message]);

  function formatDatetime(datetime) {
    var date = new Date(datetime);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
    var day = ('0' + date.getDate()).slice(-2); // add leading zero if needed
    var hours = ('0' + date.getHours()).slice(-2); // add leading zero if needed
    var minutes = ('0' + date.getMinutes()).slice(-2); // add leading zero if needed
    return year + '-' + month + '-' + day + ' ' + hours + '-' + minutes;
  }


  const fetchLeads = async () => {
    const { statusCode, data } = await fetchData();

    if (statusCode === 200) {
      switch (data.status) {
        case "SUCCESS":
          setSeverity("success");
          setLeads(data.data.content);
          break;
        case "EMPTY":
          setSeverity("error");
          setMessage(data.msg || "empty response");
          break;
        case "ERROR":
          setSeverity("error");
          setMessage(data.msg || "error");
          break;
        default:
          setSeverity("info");
          setMessage(data.msg || "Unexpected response from server.");
      }
    } else {
      setSeverity("error");
      setMessage(data.msg || "An error occurred. Please try again.");
    }
  };

  const handleEditClick = (lead) => {
    setEditLeadId(lead.interestID);
    // print(lead.interestID)
    setEditLeadData(lead);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditLeadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const updatedLeads = leads.map((lead) =>
      lead.interestID === editLeadData.interestID ? editLeadData : lead
    );
    const resp = await updateLead(editLeadData);
    setLeads(updatedLeads);
    setEditLeadId(null);
  };

  const handleCancelClick = () => {
    setEditLeadId(null);
  };

  return (
    <div>
         <Navbar />
    <div className="container-fluid mt-2">
      {message && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
          <Stack sx={{ width: "auto" }} spacing={2}>
            <Alert variant="filled" severity={severity}>
              {message}
            </Alert>
          </Stack>
        </div>
      )}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark ">
          <tr>
            <th>
              User Name
              <input type="text" placeholder="Search" className="form-control" />
            </th>
            <th>
              Phone
              <input type="text" placeholder="Search" className="form-control" />
            </th>
            <th>
              Email
              <input type="text" placeholder="Search" className="form-control" />
            </th>
            <th>
              Vehicle Model
              <input type="text" placeholder="Search" className="form-control" />
            </th>
            <th>
              Interested
              <select className="form-control">
                <option value="">All</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </th>
            <th>
              Status
              <select className="form-control">
                <option value="">All</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSE">CLOSE</option>
              </select>
            </th>
            <th>
              Called
              <select className="form-control">
                <option value="">All</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </th>
            <th>
              Answered
              <select className="form-control">
                <option value="">All</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </th>
            <th>
              Last Call
              <input type="text" placeholder="Search" className="form-control" />
            </th>
            <th>
              Notes
              <input type="text" placeholder="Search" className="form-control" />
            </th>
            <th>
              Priority
              <select className="form-control">
                <option value="">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.interestID}>
              {editLeadId === lead.interestID ? (
                <>
                  <td>{lead.user.name}</td>
                  <td>{lead.user.phone}</td>
                  <td>{lead.user.email}</td>
                  <td>{lead.vehicle.model}</td>
                  <td>
                    <select
                      className="form-control"
                      name="interested"
                      value={editLeadData.interested === 'Y' ? 'Y' : 'N'} // Corrected value mapping
                      onChange={handleInputChange}
                    >
                      <option value="Y">YES</option>
                      <option value="N">NO</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="status"
                      value={editLeadData.status}
                      onChange={handleInputChange}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CLOSE">CLOSE</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="didAdminCalled"
                      value={editLeadData.didAdminCalled === 'Y' ? 'Y' : 'N'}
                      onChange={handleInputChange}
                    >
                      <option value="Y">YES</option>
                      <option value="N">NO</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="didUserAnswered"
                      value={editLeadData.didUserAnswered === 'Y' ? 'Y' : 'N'}
                      onChange={handleInputChange}
                    >
                      <option value="Y">YES</option>
                      <option value="N">NO</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      type="datetime-local"
                      name="lastCallTime"
                      value={editLeadData.lastCallTime}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="notes-cell">
                    <textarea
                      className="form-control"
                      type="text"
                      name="notes"
                      value={editLeadData.notes}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      className="form-control form-control-sm"
                      name="priority"
                      value={editLeadData.priority ? editLeadData.priority : 0}
                      onChange={handleInputChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={handleSaveClick}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleCancelClick}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{lead.user.name}</td>
                  <td>{lead.user.phone}</td>
                  <td>{lead.user.email}</td>
                  <td>{lead.vehicle.model}</td>
                  <td>{lead.interested === 'Y' ? 'YES' : 'NO'}</td>
                  <td>{lead.status}</td>
                  <td>{lead.didAdminCalled === 'Y' ? 'YES' : 'NO'}</td>
                  <td>{lead.didUserAnswered === 'Y' ? 'YES' : 'NO'}</td>
                  <td>{formatDatetime(lead.lastCallTime)}</td>
                  <td>{lead.notes}</td>
                  <td>{lead.priority}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(lead)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <PaginationFooter /> */}
    </div>
  );
};

export default Leads;
