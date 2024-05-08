import React from "react";
import AppModal from "../components/AppModal";
import EmployeeForm from "../components/EmployeeForm";
import { getContact, updateContact } from "../api";
import { json, useLoaderData, useNavigate } from "@remix-run/react";

export async function loader({ params }) {
  const employee = await getContact(params.id);
  if (!employee) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ employee });
}
// export const action = async ({ params, request }) => {
//   const formData = await request.formData();
//   // console.log(formData);
//   return updateContact(formData.get("id"), formData);
// };

export async function action({ params, request }) {
  // console.log({ params });
  // console.log({ request });
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const result = await updateContact(params.id, updates);
  console.log(result);
  return result;
}

export default function Employees() {
  // console.log(useLoaderData());
  const { employee } = useLoaderData();
  console.log({ employee });

  const navigate = useNavigate();

  return (
    <div>
      <AppModal
        show
        title={"Employee Information"}
        handleClose={() => {
          navigate("/employees");
        }}
        size={"lg"}
      >
        {" "}
        <EmployeeForm employee={employee} method="post" />
      </AppModal>
    </div>
  );
}
