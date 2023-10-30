import AdminForm from "@src/components/forms/AdminForm";
import Heading from "@src/components/shared/Heading";
import React from "react";

const AddAdmin = () => {
  return (
    <div className="px-5">
      <Heading label="Add Administrators" />
      <AdminForm />
    </div>
  );
};

export default AddAdmin;
