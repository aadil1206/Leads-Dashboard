import axios from "axios";

const HOST = "http://localhost:5000/api";

export const addLead = async (data) => {
  return await axios.post(`${HOST}/addLead`, data);
};
export const getLeads = async () => {
  return await axios.get(`${HOST}/getAllLeads`);
};
