const convertToISO = (dateString) => {
  if (!dateString || typeof dateString !== "string") return null;
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export default convertToISO;