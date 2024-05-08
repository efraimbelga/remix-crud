import { Table } from "react-bootstrap";

const EmployeeTable = ({ checkAllEmployees, isAllChecked, children }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => checkAllEmployees(e.target.checked)}
              checked={isAllChecked}
            />
          </th>
          <th>Fullname</th>
          <th>Gender</th>
          <th>Job Title</th>
          <th>Address</th>
          <th>Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default EmployeeTable;
