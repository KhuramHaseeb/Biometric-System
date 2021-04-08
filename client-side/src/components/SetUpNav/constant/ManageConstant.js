import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../url.json";
// import "../../../assets/vendor/datatables/dataTables.bs4.css";
// import "../../../assets/vendor/datatables/dataTables.bs4-custom.css";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../../utils/PageHeader";
// import { useFormik } from "formik";
// import * as Yup from "yup";

const ManageConstant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [getConstant_typeId, setGetConstant_typeId] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataLoading, setTableDataLoading] = useState(false);
  // const [delLoading, setDelLoading] = useState(false);
  const [delId, setDelId] = useState(null);

  useEffect(() => {
    axios
      .get(`${url.constant}/getConstant_typeId`, {
        params: { typeId: 0 }, // typeId: 0
      })
      .then((json) => {
        console.log("jsonData", json.data);
        setGetConstant_typeId(json.data);
        setTableData(json.data);
        setLoading(false);
      });
  }, [delId]);

  const searchDropDown = (name) => {
    console.log("clicked", name);
    setTableDataLoading(true);
    setTableData([]);
    setSearchVal(name);
    axios
      .get(`${url.constant}/getConstant_typeId`, {
        params: { typeId: name },
      })
      .then((json) => {
        console.log("jsonData", json.data);
        // setGetConstant_typeId(json.data);
        setTableData(json.data);
        // setLoading(false);
        setTableDataLoading(false);
        setSearchVal(name);
      });
  };

  const delConstant = (constantId) => {
    setDelId(constantId);
    axios
      .get(`${url.constant}/delConstant_typeId`, {
        params: { constantId },
      })
      .then((json) => {
        console.log("DelConstant", json.data);
        setDelId(null);
      });
  };

  return (
    <div className="main-container">
      <PageHeader
        title="Manage Constant"
        link1={
          <Link to="/dashboard/addConstant">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaPlus style={{ paddingRight: "2px" }} />
                Add Constant
              </i>
            </div>
          </Link>
        }
      />
      <div className="content-wrapper">
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="py-2 px-3"
        >
          <label style={{ margin: "auto" }} className="pr-3">
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
            {getConstant_typeId.data?.map(({ name, id }, i) =>
              name ? (
                <option key={name} value={id}>
                  {name
                    .toLowerCase()
                    .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                </option>
              ) : null
            )}
          </select>
        </div>
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
                        <th>Constant ID</th>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Type Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchVal ? (
                        tableData.data?.length === 0 ||
                        tableData.data === undefined ? (
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
                              {tableDataLoading
                                ? "Loading . . ."
                                : "No Data Available"}
                            </td>
                          </tr>
                        ) : null
                      ) : null}
                      {/* {searchVal? tableData?.data.length === 0? console.log("search", tableData.data) : console.log("worked") : null} */}
                      {(searchVal
                        ? tableData?.data
                        : getConstant_typeId?.data
                      )?.map(
                        ({ constantId, id, code, name, value, typeId }, i) => (
                          <tr key={id}>
                            <td>{constantId}</td>
                            <td>{id}</td>
                            <td>{code}</td>
                            <td>
                              {name
                                .toLowerCase()
                                .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                            </td>
                            <td>{value}</td>
                            <td>
                              {searchVal ? (
                                getConstant_typeId.data?.map((data) =>
                                  searchVal == data.id
                                    ? data.name
                                        .toLowerCase()
                                        .replace(/\b(\w)/g, (s) =>
                                          s.toUpperCase()
                                        )
                                    : null
                                )
                              ) : typeId === 0 ? (
                                <div className="pl-4">-</div>
                              ) : (
                                getConstant_typeId.data?.map(({ name, id }) =>
                                  typeId === id
                                    ? name
                                        .toLowerCase()
                                        .replace(/\b(\w)/g, (s) =>
                                          s.toUpperCase()
                                        )
                                    : null
                                )
                              )}
                            </td>
                            <td width="15%">
                              <Link
                                to="/dashboard/addConstant"
                                state={{
                                  constantId,
                                  id,
                                  code,
                                  name,
                                  value,
                                  typeId,
                                }}
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
                                onClick={() => delConstant(constantId)}
                              >
                                {delId === constantId ? (
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

export default ManageConstant;
