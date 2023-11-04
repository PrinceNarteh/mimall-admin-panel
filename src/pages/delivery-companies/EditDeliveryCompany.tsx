import DeliveryCompanyForm from "@components/forms/DeliveryCompanyForm";
import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import { DeliveryCompany } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { queryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

const EditDeliveryCompany = () => {
  const { deliveryCompanyId } = useParams();
  const { data, isLoading } = useGetQuery<DeliveryCompany>({
    queryKey: queryKeys.DeliveryCompany.key(deliveryCompanyId as string),
    url: queryKeys.DeliveryCompany.url(deliveryCompanyId as string),
  });

  return (
    <div className="px-5">
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="Update Delivery Company" />
      <DeliveryCompanyForm deliveryCompany={data} />
    </div>
  );
};

export default EditDeliveryCompany;
