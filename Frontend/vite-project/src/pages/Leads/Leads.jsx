import React, { use, useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { addLead, getLeads } from "../../Api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LeadsTable from "../../components/LeadsTable";
import UserContext from "../../context/UserContext/Context";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaFilterSolid } from "react-icons/lia";
import AddLeadsModal from "../../components/AddLeadsModal";
import ApplyFilters from "../../components/ApplyFilters";

const Leads = () => {
  // State to manage the Add Lead modal visibility
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = React.useState(false);

  // Context to manage sidebar and mobile menu states
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useContext(UserContext);

  // State to manage leads data and filter options
  const [getLeadsData, setGetLeadsData] = React.useState([]);

  // State for selected Status in the filter
  const [fieldStatus, setFieldStatus] = useState([]);

  // State For Applying Filters
  const [filterOn, setFilterOn] = React.useState(false);

  // State For Selected checkbox in filter
  const [matchType, setMatchType] = useState("AND");

  // State For Search input value
  const [searchValue, setSearchValue] = useState("");

  // Options for Status field
  const statusOptions = [
    { value: "new", label: "New" },
    { value: "follow-up", label: "Follow-Up" },
    { value: "qualified", label: "Qualified" },
    { value: "converted", label: "Converted" },
  ];

  // Options for the Qualification field
  const qualificationOptions = [
    { value: "high-school", label: "High School" },
    { value: "masters", label: "Masters" },
    { value: "phd", label: "PhD" },
  ];

  // Options for the interest field
  const interestFieldOptions = [
    { value: "web-dev", label: "Web Development" },
    { value: "mobile-dev", label: "Mobile Development" },
    { value: "data-science", label: "Data Science" },
  ];

  // Options for the source field
  const sourceOptions = [
    { value: "website", label: "Website" },
    { value: "social-media", label: "Social Media" },
    { value: "email-campaign", label: "Email Campaign" },
  ];

  // Options for the assigned to field
  const assignedToOptions = [
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
  ];

  // Common styles for Select components
  const commonSelectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      borderColor: "#d1d5db",
      padding: "2px",
      boxShadow: "none",
      "&:hover": { borderColor: "#3b82f6" },
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
      marginBottom: "4px",
    }),
  };

  //  Initial values for the form fields
  const initialValues = {
    name: "",
    phone: "",
    altPhone: "",
    email: "",
    altEmail: "",
    status: null,
    qualification: null,
    interestField: null,
    source: null,
    assignedTo: null,
    jobInterest: "",
    state: "",
    city: "",
    passoutYear: "",
    heardFrom: "",
  };

 

  // Function to handle form submission and add a new lead
  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      status: values.status?.value,
      qualification: values.qualification?.value,
      interestField: values.interestField?.value,
      source: values.source?.value,
      assignedTo: values.assignedTo?.value,
    };

    try {
      await addLead({ data: payload });
      setIsAddLeadModalOpen(false);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
    fetchLeads();
  };

  // Function to fetch leads with search and status filters
  const fetchLeads = async ({ search = "", status = "" } = {}) => {
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

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // State for Show selected Status in the ui
  const [statusShow, setStatusShow] = useState([]);

  //Function For Handle Status Change
  const handleStatusChange = (selected) => {
    setFieldStatus(selected ? selected.map((option) => option.value) : []);
  };

  //Function For Add Filter Status
  const addFilterStatus = () => {
    setFieldStatus([]);
    setStatusShow([...fieldStatus]);
  };

  //Function For Clear Filters Status
  const clearFiltersStatus = () => {
    setStatusShow([]);
    setFieldStatus([]);
    setFilterOn(false);
    fetchLeads({ search: searchValue, status: "" });
  };

  //Function For Apply Filters Status
  const applyFiltersStatus = () => {
    fetchLeads({ search: searchValue, status: statusShow });
    setFilterOn(false);
  };

  //Function For Handle Search Change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchLeads({ search: value, status: statusShow });
  };

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg shadow-md overflow-y-auto">
      <div className="flex justify-between h-[78px] items-center bg-white p-4  shadow-sm">
        <div className="flex items-center gap-2">
          <GiHamburgerMenu
            className="sm:hidden flex"
            onClick={() => {
              setIsMobileMenuOpen(true);
            }}
          />
          <div className="flex flex-col">
            <p className="text-[#020817] font-bold text-[21px]">Leads</p>
            <span className="text-[#64748b] font-normal text-[14px]">
              Manage And Track Your Leads
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          className="flex gap-2 items-center bg-[#0080ff] text-white sm:px-4 px-2 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaPlus />
          <span className="font-[500] text-[12px] text-[#fff]">Add Lead</span>
        </button>

        {isAddLeadModalOpen && (
         <AddLeadsModal />
        )}
      </div>
      <div className="p-4 w-full flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full sm:w-auto flex-1 px-3 py-2 border border-[#64768b]  rounded-lg text-sm text-[#64768b] "
            onChange={handleSearchChange}
          />

          <button
            onClick={() => setFilterOn(!filterOn)}
            className="flex items-center gap-2 px-4 py-2 border border-[#64768b]  rounded-lg text-sm  hover:bg-gray-50"
          >
            <LiaFilterSolid />
            <span className="text-[14px] font-medium text-[#020817]">
              Filters
            </span>
          </button>
        </div>
        {filterOn && (
        <ApplyFilters />
        )}
        <LeadsTable data={getLeadsData} />
      </div>
    </div>
  );
};

export default Leads;
