import DetailsCard from "@components/shared/DetailsCard";
import DetailsCardItem from "@components/shared/DetailsCardItem";
import { DeliveryCompany } from "@custom-types/index";
import { Icon } from "@iconify/react";
import { fetchImage } from "@utils/fetchImage";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";

type DeliveryCompanyDetailsProps = {
  deliveryCompany: DeliveryCompany | null;
  setDeliveryCompany: React.Dispatch<
    React.SetStateAction<DeliveryCompany | null>
  >;
  handleDelete: (deliveryCompany: DeliveryCompany | null) => Promise<void>;
};

const DeliveryCompanyDetails: React.FC<DeliveryCompanyDetailsProps> = ({
  deliveryCompany = null,
  setDeliveryCompany,
  handleDelete,
}) => {
  return (
    <DetailsCard
      heading="Delivery Company Details"
      title={`${deliveryCompany?.name}`}
      description={`${deliveryCompany?.email}`}
      closeDetails={() => setDeliveryCompany(null)}
      image={`${fetchImage({
        imageName: deliveryCompany?.slide_images[0],
        entity: "delivery-companies",
      })}`}
      openDetails={!!deliveryCompany}
      editLink={`/delivery-companies/${deliveryCompany?._id}/edit`}
      actionButtons={() => (
        <button onClick={() => handleDelete(deliveryCompany)}>
          <Icon
            icon="fluent:delete-28-regular"
            className="text-xl text-red-500"
          />
        </button>
      )}
    >
      <div className="bg-white flex flex-col md:flex-row gap-5 p-5 rounded-md">
        <div className="shrink-0 md:w-60 mx-auto">
          <img
            src={`${fetchImage({
              imageName: deliveryCompany?.slide_images[0],
              entity: "delivery-companies",
            })}`}
            alt=""
            className="rounded-md"
          />
        </div>
        <div className="w-full space-y-2">
          <DetailsCardItem label="Address" value={deliveryCompany?.address} />
          <DetailsCardItem label="Location" value={deliveryCompany?.location} />
          <DetailsCardItem
            label="Phone Number"
            value={formatPhoneNumberIntl(deliveryCompany?.phone_number ?? "")}
          />
          <DetailsCardItem
            label="Alternate Phone Number"
            value={formatPhoneNumberIntl(
              deliveryCompany?.alternate_phone_number ?? ""
            )}
          />
          <DetailsCardItem
            label="Whatsapp Number"
            value={formatPhoneNumberIntl(
              deliveryCompany?.whatsapp_number ?? ""
            )}
          />

          <DetailsCardItem
            label="Owner's Name"
            value={`${deliveryCompany?.owner_first_name} ${deliveryCompany?.owner_last_name}`}
          />
          <DetailsCardItem
            label="Owner's Number"
            value={formatPhoneNumberIntl(
              deliveryCompany?.owner_phone_number ?? ""
            )}
          />
          <DetailsCardItem label="Role" value={deliveryCompany?.role.name} />
        </div>
      </div>
    </DetailsCard>
  );
};

export default DeliveryCompanyDetails;
