import DetailsCard from "@components/shared/DetailsCard";
import DetailsCardItem from "@components/shared/DetailsCardItem";
import ImageGallery from "@components/shared/ImageGallery";
import { DeliveryCompany } from "@custom-types/index";
import { Icon } from "@iconify/react";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";

type DeliveryCompanyDetailsProps = {
  openDetails: boolean;
  handleEdit: (deliveryCompany: DeliveryCompany | null) => void;
  deliveryCompany: DeliveryCompany | null;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (deliveryCompany: DeliveryCompany | null) => Promise<void>;
};
const DeliveryCompanyDetails: React.FC<DeliveryCompanyDetailsProps> = ({
  deliveryCompany = null,
  openDetails,
  setOpenDetails,
  handleDelete,
  handleEdit,
}) => {
  const edit = () => {
    handleEdit(deliveryCompany);
    setOpenDetails(false);
  };

  return (
    <DetailsCard
      start={true}
      heading="Delivery Company Details"
      title={`${deliveryCompany?.name}`}
      description={`${deliveryCompany?.email}`}
      closeDetails={() => setOpenDetails(false)}
      image={deliveryCompany?.logo}
      openDetails={openDetails}
      actionButtons={() => (
        <>
          <button onClick={() => edit()}>
            <Icon
              icon="iconamoon:edit-light"
              className="text-xl text-primary"
            />
          </button>
          <button onClick={() => handleDelete(deliveryCompany)}>
            <Icon
              icon="fluent:delete-28-regular"
              className="text-xl text-red-500"
            />
          </button>
        </>
      )}
    >
      <div className="flex flex-col lg:flex-row gap-5 rounded-md mb-5">
        <div className="flex-1 bg-white p-5 rounded-md">
          <ImageGallery images={deliveryCompany?.slide_images} />
        </div>
        <div className="bg-white p-5 rounded-md w-full space-y-2 flex-1">
          <DetailsCardItem
            label="Location"
            value={deliveryCompany?.location}
            row="xl:flex-row"
          />
          <DetailsCardItem
            row="xl:flex-row"
            label="Phone Number"
            value={formatPhoneNumberIntl(deliveryCompany?.phone_number ?? "")}
          />
          <DetailsCardItem
            row="xl:flex-row"
            label="Alternate Phone Number"
            value={formatPhoneNumberIntl(
              deliveryCompany?.alternate_phone_number ?? ""
            )}
          />
          <DetailsCardItem
            row="xl:flex-row"
            label="Whatsapp Number"
            value={formatPhoneNumberIntl(
              deliveryCompany?.whatsapp_number ?? ""
            )}
          />

          <DetailsCardItem
            row="xl:flex-row"
            label="Owner's Name"
            value={`${deliveryCompany?.owner_first_name} ${deliveryCompany?.owner_last_name}`}
          />
          <DetailsCardItem
            row="xl:flex-row"
            label="Owner's Number"
            value={formatPhoneNumberIntl(
              deliveryCompany?.owner_phone_number ?? ""
            )}
          />
          <DetailsCardItem
            row="xl:flex-row"
            label="Role"
            value={deliveryCompany?.role.name}
          />
        </div>
      </div>
    </DetailsCard>
  );
};

export default DeliveryCompanyDetails;
