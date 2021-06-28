import axios from "axios";

export const checkUserIsAdmin = user => {
  // Accepts user and returns boolean of its existence
  if(!user) return false;
  const { userRoles } = user;
  if(Array.isArray(userRoles) && userRoles.includes('admin')) return true;
  return false;
}

export const getDate = (dateReceived) => {
  // Receives a date string and returns in DD MMM YYYY format ex: 11 Sept 2022

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dateHere = new Date(dateReceived);
  const sendDate = `${dateHere.getDate()} ${
    months[dateHere.getMonth()]
  } ${dateHere.getFullYear()}`;

  return sendDate
}

export const apiInstance = axios.create({
  baseUrl: "http://localhost:4242"
});

export const checkAddressExists = (addressObj) => {
  // Accepts address object and return boolean of its existence
  let exists = true;
  if (!addressObj) return false;
  if (
    !addressObj.addr_line_1 ||
    !addressObj.addr_line_2 ||
    !addressObj.city ||
    !addressObj.state ||
    !addressObj.zip_code
  ) {
    exists = false;
  }
  return exists;
};

export const getRandomRating = (min, max) => {
  return Math.random() * (max - min) + min;
};