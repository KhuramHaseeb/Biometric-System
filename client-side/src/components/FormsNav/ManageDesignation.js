import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../url.json";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../utils/PageHeader";
import { SuccessToast, ErrorToast } from "../../utils/ReactToastify";

const ManageDesignation = () => {
  const [searchVal, setSearchVal] = useState("");
  const [getDesignation, setGetDesignation] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [delId, setDelId] = useState(null);

  useEffect(() => {
    axios
      .get(`${url.designation}/getDesignation`, {
        params: {},
      })
      .then((json) => {
        console.log("jsonData", json.data);
        setGetDesignation(json.data);
        setTableData(json.data);
      })
      .catch(() => {
        ErrorToast("❌ Something is wrong");
      });
  }, [delId]);

  const delDesignation = (id) => {
    setDelId(id);
    axios
      .get(`${url.designation}/delDesignation`, {
        params: { id },
      })
      .then((json) => {
        SuccessToast("🗑️ Deleted Successfully");
        console.log("DelDesignation", json.data);
        setDelId(null);
      })
      .catch(() => {
        ErrorToast("❌ Something is wrong");
      });
  };

  return (
    <div className="main-container">
      <PageHeader
        title="Manage Designation"
        link1={
          <Link to="/dashboard/addDesignation">
            <div id="reportrange">
              <i style={{ margin: "auto" }}>
                <FaPlus style={{ paddingRight: "2px" }} />
                Add Designation
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
                        <th>Code</th>
                        <th>Name</th>
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
                      {(searchVal ? tableData : getDesignation)?.map(
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
                                to="/dashboard/addDesignation"
                                state={{ id, code, name }}
                              >
                                <button className="btn btn-sm btn-primary ml-2">
                                  <AiOutlineForm />
                                </button>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger ml-2"
                                onClick={() => delDesignation(id)}
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

export default ManageDesignation;
