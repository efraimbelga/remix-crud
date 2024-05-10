import { Link } from "@remix-run/react";
import React from "react";

const EmployeeTableRow = ({ employee, checkRowEmployee, onDelete }) => {
  return (
    <>
      <tr key={employee.id}>
        <td>
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            className="form-check-input"
            checked={Boolean(employee.checked)}
            onChange={(e) => checkRowEmployee(e.target.checked, employee.id)}
          />
        </td>
        <td>
          {employee.firstName} {employee.middleName} {employee.lastName}
        </td>
        <td>{employee.gender}</td>
        <td>{employee.jobTitle}</td>
        <td>{employee.address}</td>
        <td>{employee.number}</td>
        <td>
          <Link to={employee.id} style={{ textDecoration: "none" }}>
            👁️
          </Link>
          <button
            className="btn btn-default"
            onClick={() => onDelete(employee.id)}
          >
            🗑️
          </button>
        </td>
      </tr>
    </>
  );
};

export default EmployeeTableRow;
