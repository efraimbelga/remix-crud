import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

const add = () => {
  const [isAdded, setIsAdded] = useState(false);
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center justify-content-center">
        <div className="col-lg-8">
          <EmployeeForm />
          {isAdded && <p>Employee data added!</p>}
        </div>
      </div>
    </div>
  );
};

export default add;
