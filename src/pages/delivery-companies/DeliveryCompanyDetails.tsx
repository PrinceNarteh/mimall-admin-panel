import DetailsCard from "@components/shared/DetailsCard";
import DetailsCardItem from "@components/shared/DetailsCardItem";
import { Admin } from "@custom-types/index";
import { Icon } from "@iconify/react";
import { fetchImage } from "@utils/fetchImage";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";

type DeliveryCompanyDetailsProps = {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  handleDelete: (admin: Admin | null) => Promise<void>;
};

const DeliveryCompanyDetails: React.FC<DeliveryCompanyDetailsProps> = ({
  admin = null,
  setAdmin,
  handleDelete,
}) => {
  return (
    <DetailsCard
      heading="Admin Details"
      title={`${admin?.first_name} ${admin?.middle_name} ${admin?.last_name}`}
      description={`${admin?.email}`}
      closeDetails={() => setAdmin(null)}
      image={`${fetchImage({
        imageName: admin?.profile_image,
        entity: "admins",
      })}`}
      openDetails={!!admin}
      editLink={`/admins/${admin?._id}/edit`}
      actionButtons={() => (
        <button onClick={() => handleDelete(admin)}>
          <Icon
            icon="fluent:delete-28-regular"
            className="text-xl text-red-500"
          />
        </button>
      )}
    >
      <div className="bg-white flex flex-col md:flex-row gap-5 p-5 rounded-md">
        <div className="shrink-0 md:w-60 md:h-60 mx-auto">
          <img
            src={`${fetchImage({
              imageName: admin?.profile_image,
              entity: "admins",
            })}`}
            alt=""
            className="rounded-md"
          />
        </div>
        <div className="w-full space-y-2">
          <DetailsCardItem
            label="Phone Number"
            value={formatPhoneNumberIntl(admin?.phone_number ?? "")}
          />
          <DetailsCardItem
            label="Alternate Phone Number"
            value={formatPhoneNumberIntl(admin?.alternate_phone_number ?? "")}
          />
          <DetailsCardItem label="Address" value={admin?.address} />
          <DetailsCardItem label="Nationality" value={admin?.nationality} />
          <DetailsCardItem label="Role" value={admin?.role.name} />
          <DetailsCardItem
            label="Status"
            value={admin?.active ? "Active" : "Not Active"}
          />
        </div>
      </div>
    </DetailsCard>
  );
};

export default DeliveryCompanyDetails;
