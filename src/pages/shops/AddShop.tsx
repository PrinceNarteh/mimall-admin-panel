import ShopForm from "@components/forms/ShopForm";
import Heading from "@components/shared/Heading";

const AddShop = () => {
  return (
    <div className="px-5">
      <Heading label="Add Shops" />
      <ShopForm />
    </div>
  );
};

export default AddShop;
