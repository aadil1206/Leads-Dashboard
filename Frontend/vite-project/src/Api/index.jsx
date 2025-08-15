import axios from "axios";

const HOST = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const addLead = async (data) => {
  return await axios.post(`${HOST}/addLead`, data);
};
export const getLeads = async ({ search = "", status = [] } = {}) => {
  return await axios.get(`${HOST}/getAllLeads`, {
    params: {
      search,
      status: Array.isArray(status) ? status.join(",") : status,
    },
  });
};
