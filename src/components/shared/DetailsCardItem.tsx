import React from "react";

type DetailsCardItemProps = {
  label: string;
  value: React.ReactNode;
  row?: string;
};

const DetailsCardItem: React.FC<DetailsCardItemProps> = ({
  label,
  value,
  row,
}) => {
  return (
    <div className={`flex gap-x-5 flex-col ${row ? row : "lg:flex-row"}`}>
      <h4 className="text-primary font-bold text-lg max-w-[220px] w-full whitespace-nowrap">
        {label}
      </h4>
      <p className="flex-[4] text-lg text-gray-800">{value}</p>
    </div>
  );
};

export default DetailsCardItem;
