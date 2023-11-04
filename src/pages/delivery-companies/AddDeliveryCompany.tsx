import DeliveryCompanyForm from "@components/forms/DeliveryCompanyForm";
import Heading from "@components/shared/Heading";

const AddDeliveryCompany = () => {
  return (
    <div className="px-5">
      <Heading label="Add Delivery Company" />
      <DeliveryCompanyForm />
    </div>
  );
};

export default AddDeliveryCompany;
