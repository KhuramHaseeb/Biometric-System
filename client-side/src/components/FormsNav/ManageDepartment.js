import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../url.json";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../utils/PageHeader";
import { SuccessToast, ErrorToast } from "../../utils/ReactToastify";

const ManageDepartment = () => {
  const [searchVal, setSearchVal] = useState("");
  const [getDepartment, setGetDepartment] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [delId, setDelId] = useState(null);

  useEffect(() => {
    axios
      .get(`${url.department}/getDepartment`, {
        params: {},
      })
      .then((json) => {
        console.log("jsonData", json.data);
        setGetDepartment(json.data);
        setTableData(json.data);
      });
  }, [delId]);

  const delDepartment = (id) => {
    setDelId(id);
    axios
      .get(`${url.department}/delDepartment`, {
        params: { id },
      })
      .then((json) => {
        SuccessToast("🗑️ Deleted Successfully");
        console.log("DelDepartment", json.data);
        setDelId(null);
      })
      .catch(() => {
        ErrorToast("❌ Something is wrong");
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
                                <button className="btn btn-sm btn-primary ml-2">
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
