import React, { HTMLAttributes } from "react";

type ChipProps = {
  label: string;
  ActionButton?: () => JSX.Element;
} & HTMLAttributes<HTMLButtonElement>;

const Chip: React.FC<ChipProps> = ({ label, ActionButton }) => {
  return (
    <button className="bg-primary px-5 rounded-full py-2 max-w-fit text-white flex items-center gap-5">
      <span className="text-lg">{label}</span>
      {ActionButton ? <div>{<ActionButton />}</div> : null}
    </button>
  );
};

export default Chip;
