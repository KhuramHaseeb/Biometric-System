
import React, { useEffect, useState } from "react";

import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { first_case_one } from "../../store/action/action";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../utils/PageHeader";
const AtttendenceSheet = () => {
  const employeeData = useSelector((state) => state.root.employee_data);
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    dispatch(first_case_one());

  }, []);

  return (
    <div className="main-container">
    <PageHeader
      title="Employee Attendence Sheet "
    
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
                      <th >ID</th>
                      <th>Name</th>
                      <th>Father Name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {employeeData.map((result,i) => {
                    console.log("result",result)
            return (
              <tr key={i}>
              <td>{result.id}</td>
                <td>{result.firstName} {""} {result.lastName}</td>
                <td>{result.fatherName}</td>
                <td>{result.designation}</td>
                <td>{result.department}</td>
               <td> <Link to={`/dashboard/attendenceSheetbyid/${result._id}`}class="btn btn-primary btn-sm">  <AiOutlineForm /></Link>
               </td>
                
              </tr>
            );
          })}
                  
                 
                     
                  
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

export default AtttendenceSheet;
