import React from "react";

type DetailsCardItemProps = {
  label: string;
  value: React.ReactNode;
};

const DetailsCardItem: React.FC<DetailsCardItemProps> = ({ label, value }) => {
  return (
    <div className="flex gap-x-5 flex-col lg:flex-row lg:items-center">
      <h4 className="text-primary font-bold text-lg max-w-[220px] w-full whitespace-nowrap">
        {label}
      </h4>
      <p className="flex-[4]">{value}</p>
    </div>
  );
};

export default DetailsCardItem;
