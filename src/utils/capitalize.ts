export const capitalize = (word?: string, seperator?: string) => {
  if (!word) return "";
  return word
    .split(seperator ?? "_")
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(" ");
};
