import DetailsCard from "@components/shared/DetailsCard";
import DetailsCardItem from "@components/shared/DetailsCardItem";
import Gallery from "@components/shared/Gallery";
import ImageGallery from "@components/shared/ImageGallery";
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
      start={true}
      heading="Delivery Company Details"
      title={`${deliveryCompany?.name}`}
      description={`${deliveryCompany?.email}`}
      closeDetails={() => setDeliveryCompany(null)}
      image={`${fetchImage({
        imageName: deliveryCompany?.logo,
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
      <div className="flex flex-col lg:flex-row gap-5 rounded-md mb-5">
        <div className="flex-1 bg-white p-5 rounded-md">
          <ImageGallery
            entity="delivery-companies"
            images={deliveryCompany?.slide_images}
          />
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
