import { getLeads } from "../Api";

// Function to fetch leads with search and status filters
export const fetchLeads = async ({ search = "", status = "" } = {}) => {
  try {
    const response = await getLeads({ search, status });

    if (response && response.data) {
      console.log("Fetched Leads:", response.data);
      return response.data;
    } else {
      console.warn("No leads data found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching leads:", error);
  }
};
