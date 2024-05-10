import { redirect } from "@remix-run/node";
import React from "react";
import { deleteContact } from "../api";
import prisma from "../lib/db.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const ids = data.ids.split(",");
  for (const id of ids) {
    // await deleteContact(id);
    await prisma.employees.delete({
      where: {
        id,
      },
    });
  }
  return redirect("/employees");
};
