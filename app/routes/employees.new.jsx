import React from "react";
import AppModal from "../components/AppModal";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate } from "@remix-run/react";
import { createNew } from "../api";
import prisma from "../lib/db.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const newData = Object.fromEntries(formData);
  // const result = await createNew(updates);
  // return result;
  return await prisma.employees.create({
    data: newData,
  });
};

const employees = () => {
  const navigate = useNavigate();
  return (
    <AppModal
      show
      size="lg"
      title={"Add new employee"}
      handleClose={() => {
        navigate("/employees");
      }}
    >
      <EmployeeForm method="post" />
    </AppModal>
  );
};

export default employees;
