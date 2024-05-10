import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeTableRow from "../components/EmployeeTableRow";
import "../styles/employees.css";
import { getContacts } from "../api";
import {
  useLoaderData,
  Outlet,
  useNavigate,
  Form,
  useSubmit,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import prisma from "../lib/db.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const employees = await prisma.employees.findMany();
  // const employees = await getContacts(q);
  return json({ employees, q });
};

const employees = () => {
  const { employees, q } = useLoaderData();
  const [searchValue, setSearchValue] = useState(q || "");
  const [checkedEmployee, setCheckedEmployee] = useState([]);

  const navigate = useNavigate();
  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  const employeeArray = employees.map((emp) => {
    if (checkedEmployee.includes(emp.id)) {
      return {
        ...emp,
        checked: true,
      };
    } else {
      return {
        ...emp,
        checked: false,
      };
    }
  });

  const handleDeleteAllChecked = () => {
    const selectedEmployees = employeeArray
      .filter((emp) => emp.checked === true)
      .map((emp) => emp.id);
    if (selectedEmployees.length > 0) {
      handleDelete(selectedEmployees);
    } else {
      alert("No employees selected");
    }
  };

  const handleDelete = (ids) => {
    const answer = window.confirm("Confirm delete!");
    if (answer) {
      submit(
        { ids },
        {
          action: "delete",
          method: "post",
          ncType: "application/json",
        }
      );
    }
  };

  const checkAllEmployees = (checked) => {
    setCheckedEmployee(checked ? employeeArray.map((emp) => emp.id) : []);
  };

  const checkRowEmployee = (checked, eid) => {
    setCheckedEmployee((checkedEmployee) =>
      checked
        ? [...checkedEmployee, eid]
        : checkedEmployee.filter((emp) => emp !== eid)
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-2">
          <button
            className="btn btn-primary mr-3"
            type="button"
            onClick={() => {
              navigate("new");
            }}
          >
            + Add New
          </button>
        </div>
        <div className="col-lg-10 d-flex justify-content-end">
          <Form
            id="search-form"
            role="search"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
          >
            <div className="form-group has-search ">
              <span className=" form-control-feedback">🔍</span>
              <input
                type="search"
                name="q"
                className="form-control"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </Form>
          <button
            className="btn  btn-danger mr-3"
            type="button"
            onClick={handleDeleteAllChecked}
          >
            Delete Selected
          </button>
        </div>
        <div className="col-sm-12">
          <hr />
        </div>
        <div className="col-sm-12">
          <EmployeeTable
            checkAllEmployees={checkAllEmployees}
            isAllChecked={
              employeeArray.length <= 0
                ? false
                : checkedEmployee.length === employeeArray.length
            }
          >
            {employeeArray.map((employee) => (
              <EmployeeTableRow
                key={employee.id}
                employee={employee}
                checkRowEmployee={checkRowEmployee}
                onDelete={handleDelete}
              />
            ))}
          </EmployeeTable>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default employees;
