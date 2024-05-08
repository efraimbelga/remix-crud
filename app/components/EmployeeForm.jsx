import { Form } from "@remix-run/react";
import React from "react";

const EmployeeForm = ({ employee = null, method }) => {
  const firstName = employee !== null ? employee.firstName : "";
  const middleName = employee !== null ? employee.middleName : "";

  const lastName = employee !== null ? employee.lastName : "";
  const gender = employee !== null ? employee.gender : "";
  const address = employee !== null ? employee.address : "";
  const number = employee !== null ? employee.number : "";
  const jobTitle = employee !== null ? employee.jobTitle : "";
  return (
    <Form method={method}>
      {employee !== null && (
        <input type="hidden" name="id" defaultValue={employee.id} />
      )}
      <table style={{ width: "100%" }}>
        <tbody>
          <tr style={{ borderStyle: "none" }}>
            <td>Fullname:</td>
            <td>
              <input
                style={{ width: "33%" }}
                name="firstName"
                defaultValue={firstName}
                type="text"
                placeholder="Firstname"
                required
              />
              <input
                style={{ width: "33%" }}
                name="middleName"
                defaultValue={middleName}
                type="text"
                placeholder="Middlename"
                required
              />
              <input
                style={{ width: "34%" }}
                name="lastName"
                defaultValue={lastName}
                type="text"
                placeholder="Lastname"
                required
              />
            </td>
          </tr>
          <tr style={{ borderStyle: "none" }}>
            <td>Gender:</td>
            <td>
              <select
                required
                name="gender"
                defaultValue={gender}
                style={{ width: "33%" }}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
          </tr>
          <tr style={{ borderStyle: "none" }}>
            <td>Address</td>
            <td>
              <input
                required
                style={{ width: "100%" }}
                type="text"
                name="address"
                defaultValue={address}
              />
            </td>
          </tr>
          <tr style={{ borderStyle: "none" }}>
            <td>Number</td>
            <td>
              <input
                required
                style={{ width: "33%" }}
                type="text"
                name="number"
                defaultValue={number}
              />
            </td>
          </tr>
          <tr style={{ borderStyle: "none" }}>
            <td>Job Title</td>
            <td>
              <input
                required
                style={{ width: "100%" }}
                type="text"
                name="jobTitle"
                defaultValue={jobTitle}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button className="btn btn-xs btn-info" type="submit">
        {employee !== null ? "Update" : "Add"} User
      </button>
    </Form>
  );
};

export default EmployeeForm;
