import AdminForm from "@components/forms/AdminForm";
import Heading from "@components/shared/Heading";

const AddAdmin = () => {
  return (
    <div className="px-5">
      <Heading label="Add Administrators" />
      <AdminForm />
    </div>
  );
};

export default AddAdmin;
