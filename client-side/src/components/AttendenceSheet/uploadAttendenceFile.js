
import PageHeader from "../../utils/UploadSheet";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import "../../css/uploadFile.css";
const UploadEmployeeFile = () => {
  const [checkinFile, setcheckinFile] = useState('');
  const [checkout, setCheckoutFile] = useState("");

  const handlecheckinFile = (e) => {
    setcheckinFile(e.target.files[0]);
  };
  const handlecheckoutFile = (e) => {
    setCheckoutFile(e.target.files[0]);
  };
  const sumbitfile1 = (e) => {
    e.preventDefault();
   
    const formData = new FormData()
    formData.append('checkInUser', checkinFile)
    axios
    .post(`http://localhost:3001/Checkinlist`, formData)
    .then(res => console.log(res.body))
    .catch(err => {
        console.log(err); 
    }); 

   
  };


  const sumbitfile2 = (e) => {
    e.preventDefault();
   
    const formData = new FormData()
    formData.append('checkoutUser', checkout)
    axios
    .post(`http://localhost:3001/Checkoutlist`, formData)
    .then(res => console.log(res.body))
    .catch(err => {
        console.log(err); 
    }); 

   
  };
  return (
    <div className="main-container">
      <PageHeader title="Upload Excel File" />
      <div className="content-wrapper">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h4>Checkin file</h4>
                    <li className="item-excel">
                      <input
                        name="checkInUser"
                        id="checkInUser"
                        onChange={
                            handlecheckinFile
                        }
                        type="file"
                        accept=".xlsx"
                      />
                    </li>

                    <div className="update">
                      <button
                        onClick={(e) => {
                            sumbitfile1(e);
                        }}
                        className="btn btn-primary"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <h4>Checkout file</h4>
                    <li className="item-excel">
                      <input
                        name="checkoutUser"
                        id="checkoutUser"
                        onChange={handlecheckoutFile}
                        type="file"
                        accept=".xlsx"
                      />
                    </li>

                    <div className="update">
                      <button
                        onClick={(e) => {
                            sumbitfile2(e);
                        }}
                        className="btn btn-primary"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadEmployeeFile;
