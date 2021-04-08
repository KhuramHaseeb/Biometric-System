import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../url.json";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../utils/PageHeader";
import { SuccessToast, ErrorToast } from "../../utils/ReactToastify";

const ManageEmployee = () => {
  const [searchVal, setSearchVal] = useState("");
  const [getEmployee, setGetEmployee] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [getDesignation, setGetDesignation] = useState([]);
  const [getDepartment, setGetDepartment] = useState([]);

  const [delId, setDelId] = useState(null);

  useEffect(() => {
    axios
      .get(`${url.employee}/getEmployee`, {
        params: {},
      })
      .then((json) => {
        console.log("jsonData", json.data);
        setGetEmployee(json.data);
        setTableData(json.data);
      });
    axios
      .get(`${url.designation}/getDesignation`, {
        params: {},
      })
      .then((json) => {
        setGetDesignation(json.data);
      });
    axios
      .get(`${url.department}/getDepartment`, {
        params: {},
      })
      .then((json) => {
        setGetDepartment(json.data);
      });
  }, [delId]);

  const delEmployee = (id) => {
    setDelId(id);
    axios
      .get(`${url.employee}/delEmployee`, {
        params: { id },
      })
      .then((json) => {
        SuccessToast("🗑️ Deleted Successfully");
        console.log("DelEmployee", json.data);
        setDelId(null);
      })
      .catch(() => {
        ErrorToast("❌ Something is wrong");
      });
  };

  return (
    <div className="main-container">
      <PageHeader
        title="Manage Employee"
        link1={
          <Link to="/dashboard/addEmployee">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaPlus style={{ paddingRight: "2px" }} />
                Add Employee
              </i>
            </div>
          </Link>
        }
      />
      <div className="content-wrapper">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="basicExample" className="table m-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length === 0 ? (
                        <tr style={{ textAlign: "center" }} rowSpan="3">
                          <td
                            colSpan="7"
                            className="py-5"
                            style={{
                              color: "red",
                              fontSize: "25px",
                              fontWeight: "bold",
                            }}
                          >
                            Loading . . .
                          </td>
                        </tr>
                      ) : null}
                      {(searchVal ? tableData : getEmployee)?.map(
                        (
                          {
                            id,
                            firstName,
                            lastName,
                            fatherName,
                            department,
                            checkIn,
                            checkOut,
                            designation,
                            cell,
                            createdDate,
                            userName,
                            email,
                            createdAt,
                            updatedAt,
                            roleType,
                          },
                          i
                        ) => (
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{`${firstName} ${lastName}`}</td>
                            <td>
                              {fatherName
                                .toLowerCase()
                                .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                            </td>
                            <td>
                              {getDepartment?.map(({ name, id }) =>
                                id == department
                                  ? name
                                      .toLowerCase()
                                      .replace(/\b(\w)/g, (s) =>
                                        s.toUpperCase()
                                      )
                                  : null
                              )}
                            </td>
                            <td>
                              {getDesignation?.map(({ name, id }) =>
                                id == designation
                                  ? name
                                      .toLowerCase()
                                      .replace(/\b(\w)/g, (s) =>
                                        s.toUpperCase()
                                      )
                                  : null
                              )}
                            </td>

                            <td width="15%">
                              <Link
                                to="/dashboard/addEmployee"
                                state={{
                                  id,
                                  firstName,
                                  lastName,
                                  fatherName,
                                  department,
                                  checkIn,
                                  checkOut,
                                  designation,
                                  cell,
                                  createdDate,
                                  userName,
                                  email,
                                  createdAt,
                                  updatedAt,
                                  roleType,
                                }}
                              >
                                <button className="btn btn-sm btn-primary ml-2">
                                  <AiOutlineForm />
                                </button>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger ml-2"
                                onClick={() => delEmployee(id)}
                              >
                                {delId === id ? (
                                  "Loading"
                                ) : (
                                  <>
                                    <AiOutlineDelete />
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployee;
