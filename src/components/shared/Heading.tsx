import React from "react";

type HeadingProps = {
  label: string;
};

const Heading: React.FC<HeadingProps> = ({ label }) => {
  return <div className="text-blue-900 text-3xl font-bold">{label}</div>;
};

export default Heading;
