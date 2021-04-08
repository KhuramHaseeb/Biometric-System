import React, { useEffect, useState } from "react";
import PageHeader from "../../utils/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import user from "../../assets/img/user.png";
import axios from "axios";
import url from "../../url.json";
import jwt_decode from "jwt-decode";
import { userLoginDetails } from "../../store/action/action";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.root.userDetails);
  const [userData, setUserData] = useState([]);
  const [getDesignation, setGetDesignation] = useState([]);
  const [getDepartment, setGetDepartment] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token").length > 0
    ) {
      var token = localStorage.getItem("token");
      var decode = jwt_decode(token);
      console.log(decode);
      axios
        .get(`${url.constant}/getConstant_typeId`, {
          params: { typeId: 1 },
        })
        .then(async (d) => {
          await d.data.data?.map(({ name, id }, i) => {
            if (decode.roleType === id) {
              console.log("RoleType", name);
              dispatch(userLoginDetails({ auth: decode, roleType: name }));
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    (async () => {
      const emp = await axios.get(`${url.employee}/getEmployee`, {
        params: { email: userDetails?.auth?.email },
      });
      setUserData(emp.data);
      const des = await axios.get(`${url.designation}/getDesignation`, {
        params: { id: userData.designation },
      });
      setGetDesignation(des.data);
      const dep = await axios.get(`${url.department}/getDepartment`, {
        params: { id: userData.department },
      });
      setGetDepartment(dep.data);
    })();
  }, [userData.department, userData.designation, userDetails.auth?.email]);
  console.log(userData);

  return (
    <div className="main-container">
      <PageHeader
        title={
          userDetails.roleType == "Admin"
            ? "Admin's Profile"
            : `${userDetails.roleType}'s Profile`
        }
      />
      <div className="content-wrapper">
        <div style={{ textAlign: "center" }}>
          <img
            src={user}
            width="150px"
            height="150"
            alt="Reatil Admin"
            style={{ borderRadius: "5px" }}
          />
          <div style={{ fontSize: "18px" }} className="mt-3">
            <span style={{ fontWeight: "bold" }}>Status: </span>
            {userDetails.roleType == "Admin" ? "Admin" : userDetails.roleType}
          </div>
        </div>
        <div className="row gutters mt-4">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="row gutters">
                  <div className="table-responsive">
                    <table id="basicExample" className="table m-0">
                      {userData?.map(
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
                            joiningDate,
                            userName,
                            email,
                            createdAt,
                            updatedAt,
                            adminId,
                          },
                          i
                        ) => (
                          <tbody key={id}>
                            <tr>
                              <th>ID</th>
                              <td>{id}</td>
                              <th>User Name</th>
                              <td>{userName}</td>
                            </tr>
                            <tr>
                              <th>Name</th>
                              <td>{firstName + " " + lastName}</td>
                              <th>Father Name</th>
                              <td>{fatherName}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{email}</td>
                              <th>Cell No</th>
                              <td>{cell}</td>
                            </tr>
                            <tr>
                              <th>Department</th>
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
                              <th>Designation</th>
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
                            </tr>
                            <tr>
                              <th>Check In</th>
                              <td>{checkIn}</td>
                              <th>Check Out</th>
                              <td>{checkOut}</td>
                            </tr>
                            <tr>
                              <th>CreatedAt</th>
                              <td>{new Date(createdAt).toLocaleString()}</td>
                              <th>Updated At</th>
                              <td>
                                {createdAt >= updatedAt
                                  ? "Not Available"
                                  : new Date(updatedAt).toLocaleString()}
                              </td>
                            </tr>
                            <tr>
                              <th>Joining Date</th>
                              <td>{new Date(joiningDate).toLocaleString()}</td>
                              {userDetails.roleType != "Admin" ? (
                                <>
                                  <th>Editor Name</th>
                                  <td>{adminId}</td>
                                </>
                              ) : null}
                            </tr>
                          </tbody>
                        )
                      )}
                    </table>
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

export default UserProfile;
