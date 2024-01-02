import DetailsCard from "@components/shared/DetailsCard";
import { Shop } from "@custom-types/index";
import { Icon } from "@iconify/react";
import { fetchImage } from "@utils/fetchImage";
import React from "react";

type ShopDetailsProps = {
  openDetails: boolean;
  shop: Shop | null;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (shop: Shop | null) => Promise<void>;
};

const ShopDetails: React.FC<ShopDetailsProps> = ({
  shop = null,
  openDetails,
  setOpenDetails,
  handleDelete,
}) => {
  console.log(shop);
  return (
    <DetailsCard
      heading="Shop Details"
      title={`${shop?.name}`}
      description={`${shop?.description}`}
      closeDetails={() => setOpenDetails(false)}
      image={`${fetchImage({
        imageName: shop?.profile_image,
        entity: "shops",
      })}`}
      openDetails={openDetails}
      editLink={`/admins/${shop?._id}/edit`}
      actionButtons={() => (
        <button onClick={() => handleDelete(shop)}>
          <Icon
            icon="fluent:delete-28-regular"
            className="text-xl text-red-500"
          />
        </button>
      )}
    >
      <div className="bg-white flex flex-wrap justify-center gap-5 p-5 rounded-md">
        <Item label="Shop Code" value={`${shop?.shop_code}`} />
        <Item label="Plain Password" value={`${shop?.plain_password}`} />
        <Item label="Status" value={shop?.active ? "Active" : "Not Active"} />
        <Item label="Location" value={`${shop?.location}`} />
        <Item label="Map Direction" value={`${shop?.map_direction}`} />
        <Item label="Phone Number" value={`${shop?.phone_number}`} />
        <Item
          label="Alternate Phone Number"
          value={`${shop?.alternate_phone_number}`}
        />
        <Item label="Whatsapp Number" value={`${shop?.whatsapp_number}`} />
        <Item label="Opening Time" value={`${shop?.opening_time}`} />
        <Item label="Closing Time" value={`${shop?.closing_time}`} />
        <Item label="Facebook Handle" value={`${shop?.facebook_handle}`} />
        <Item label="Instagram Handle" value={`${shop?.instagram_handle}`} />
        <Item label="Twitter Handle" value={`${shop?.twitter_handle}`} />
        <Item label="TikTok Handle" value={`${shop?.tiktok_handle}`} />
      </div>

      {shop?.banner ? (
        <div className="bg-white p-5 rounded-md">
          <img src={shop?.banner} alt="" />
        </div>
      ) : null}
    </DetailsCard>
  );
};

const Item = ({ label, value }: { label: string; value: string }) => (
  <div className="border rounded-md p-2 w-80 cursor-pointer hover:bg-primary duration-500 group">
    <h6 className="font-bold text-gray-700 group-hover:text-white">{label}</h6>
    <p className="text-gray-600 text-sm group-hover:text-white">{value}</p>
  </div>
);

export default ShopDetails;
