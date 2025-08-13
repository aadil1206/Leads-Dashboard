import { getLeads } from "../Api";

// Function to fetch leads with search and status filters
export const fetchLeads = async ({ search = "", status = "" } = {}) => {
    try {
      const response = await getLeads({ search, status });
      setGetLeadsData(response.data);
      if (response && response.data) {
        console.log("Fetched Leads:", response.data);
      } else {
        console.warn("No leads data found");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };