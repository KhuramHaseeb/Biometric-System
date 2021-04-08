import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../url.json";
// import "../../../assets/vendor/datatables/dataTables.bs4.css";
// import "../../../assets/vendor/datatables/dataTables.bs4-custom.css";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../utils/PageHeader";
// import { useFormik } from "formik";
// import * as Yup from "yup";

const ManageDepartment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [getDepartment, setGetDepartment] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataLoading, setTableDataLoading] = useState(false);
  // const [delLoading, setDelLoading] = useState(false);
  const [delId, setDelId] = useState(null);

  useEffect(() => {
    setTableDataLoading(true);
    axios
      .get(`${url.department}/getDepartment`, {
        params: {}, // typeId: 0
      })
      .then((json) => {
        console.log("jsonData", json.data);
        setGetDepartment(json.data);
        setTableData(json.data);
        setTableDataLoading(false);
        setLoading(false);
      });
  }, [delId]);

  // const searchDropDown = (name) => {
  //   console.log("clicked", name);
  //   setTableDataLoading(true);
  //   axios
  //     .get(`${url.department}/getDepartment`, {
  //       params: { typeId: name },
  //     })
  //     .then((json) => {
  //       console.log("jsonData", json.data);
  //       // setGetDepartmentManageDepartment(json.data);
  //       setTableData(json.data);
  //       // setLoading(false);
  //       setTableDataLoading(false);
  //       setSearchVal(name);
  //     });
  // };

  const delDepartment = (id) => {
    setDelId(id);
    axios
      .get(`${url.department}/delDepartment`, {
        params: { id },
      })
      .then((json) => {
        console.log("DelDepartment", json.data);
        setDelId(null);
      });
  };

  return (
    <div className="main-container">
      <PageHeader
        title="Manage Department"
        link1={
          <Link to="/dashboard/addDepartment">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaPlus style={{ paddingRight: "2px" }} />
                Add Department
              </i>
            </div>
          </Link>
        }
      />
      <div className="content-wrapper">
        {/* <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="py-2"
        >
          <label style={{ margin: "auto" }} className="px-3">
            Search:
          </label>
          <select
            className="form-control"
            id="inputtypeId"
            name="typeId"
            value={searchVal}
            onChange={(e) => searchDropDown(e.target.value)}
            aria-describedby="typeId"
          >
            <option value="">
              {!loading ? "Select One" : "Loading . . ."}
            </option>
            {getDepartmentManageDepartment.data?.map(({ name, id }, i) =>
              name ? (
                <option key={name} value={id}>
                  {name
                    .toLowerCase()
                    .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                </option>
              ) : null
            )}
          </select>
        </div> */}
        {/* <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_length" id="basicExample_length">
              <label>
                Show{" "}
                <select
                  name="basicExample_length"
                  aria-controls="basicExample"
                  className="form-control form-control-sm selectpicker"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>{" "}
                entries
              </label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div id="basicExample_filter" className="dataTables_filter">
              <label>
                Search:
                <input
                  type="search"
                  className="form-control form-control-sm selectpicker"
                  placeholder
                  aria-controls="basicExample"
                />
              </label>
            </div>
          </div>
        </div> */}

        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="basicExample" className="table m-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        // searchVal ? (
                        tableData.length === 0 ? (
                          // tableData?
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
                        ) : null
                        // ) : null
                      }
                      {(searchVal ? tableData : getDepartment)?.map(
                        ({ id, code, name }, i) => (
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{code}</td>
                            <td>
                              {name
                                .toLowerCase()
                                .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                            </td>
                            <td width="15%">
                              <Link
                                to="/dashboard/addDepartment"
                                state={{ id, code, name }}
                              >
                                <button
                                  className="btn btn-sm btn-primary ml-2"
                                  // onClick={() =>
                                  // navigate("/dashboard/manageConstant", {
                                  //   state: { id, code, name, value, typeId },
                                  // })
                                  // }
                                >
                                  <AiOutlineForm />
                                </button>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger ml-2"
                                onClick={() => delDepartment(id)}
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

export default ManageDepartment;
