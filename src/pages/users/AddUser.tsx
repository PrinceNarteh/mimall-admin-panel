import UserForm from "@components/forms/UserForm";
import Heading from "@components/shared/Heading";

const AddUser = () => {
  return (
    <div className="px-5">
      <Heading label="Add Users" />
      <UserForm />
    </div>
  );
};

export default AddUser;
