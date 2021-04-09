
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { employeByid } from "../../store/action/action";

import '../../css/employeeByid.css';
import {
  
  useParams
} from 'react-router-dom';



 

const AttendenceSheetById = () => {
  const dispatch = useDispatch();
 

  const employee_Byid = useSelector(
    (state) => state.root.employee_Byid
  );
  let { id } = useParams();
  useEffect(() => {
   
    dispatch(employeByid(id));
    
  }, []);
  
  const data2 = employee_Byid
    .filter(
      (person) =>
        person.checkout_id && person.checkoutTime && person.checkoutDate
    )
    .map((result, i) => {
      // console.log("ll",result)
      return (
        <tr>
          <td>{result.checkout_id}</td>
          <td>{result.checkoutTime}</td>
          <td>{result.checkoutDate}</td>
        </tr>
      );
    });

//   const filteremployData=
//   employee_Byid.filter((person)=>{
// if(person.checkinDate)
// {
//   checkin.push(person.checkinTime);
//   // console.log("pp",data);
// }
//   });

  const data = employee_Byid
    .filter(
      (person) => person.checkIn_id && person.checkinDate && person.checkinTime
    )
    .map((result, i) => {
      return (
        <tr>
          <td>{result.checkIn_id}</td>
          <td>{result.checkinTime}</td>
          <td>{result.checkinDate}</td>
        </tr>
      );
    });


    const data3 = employee_Byid
    .filter(
      (person) =>
        person.firstName &&
        person.lastName &&
        person.designation &&
        person.department &&
        person.fatherName
    )
    .slice(0, 1)
    .map((result, i) => {
      return (
        <>
       
          <div class="row" style={{marginTop: "20px"}}>
            <div
              class="col-sm-6"
              style={{ display: "flex", fontWeight: "700" }}
            >
              <h4>Employee Name: </h4>
              <p className="dispay-data">
                {result.firstName} {result.lastname}
              </p>
            </div>
            <div
              class="col-sm-6 "
              style={{ display: "flex", fontWeight: "700" }}
            >
              <h4>Father Name:</h4>
              <p className="dispay-data">{result.fatherName}</p>
            </div>
          </div>

          <div class="row">
            <div
              class="col-sm-6 "
              style={{ display: "flex", fontWeight: "700" }}
            >
              <h4>Department:</h4>
              <p className="dispay-data">{result.department}</p>
            </div>
            <div
              class="col-sm-6 "
              style={{ display: "flex", fontWeight: "700" }}
            >
              <h4>Designation:</h4>
              <p className="dispay-data">{result.designation}</p>
            </div>
          </div>
        </>
      );
    });


  return (
    <div class="container-fluid" className="main-employ-list">
    
      {data3}
      <div class="row" style={{marginTop:'30px'}}>
        <div class="col-6">
          <div class="table-responsive">
            <table class="table  table-striped table-bordered table-hover">
              <thead class="employee-head">
                <tr>
                  <th>Checkin Id</th>
                  <th>Checkin Time</th>
                  <th>Checkin Date</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
        </div>
        <div class="col-6" style={{ marginLeft: "-32px" }}>
          <div class="table-responsive">
            <table class="table  table-striped table-bordered table-hover">
              <thead class="employee-head">
                <tr>
                  <th>Checkout Id</th>
                  <th>Checkout Time</th>
                  <th>Checkout Date</th>
                </tr>
              </thead>
              <tbody>{data2}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendenceSheetById;
