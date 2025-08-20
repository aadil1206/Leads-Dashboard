import React, { use, useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { addLead, getLeads } from "../../Api";
import { fetchLeads } from "../../services/leadsService";
import LeadsTable from "../../components/LeadsTable";
import UserContext from "../../context/UserContext/Context";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaFilterSolid } from "react-icons/lia";
import AddLeadsModal from "../../components/AddLeadsModal";
import ApplyFilters from "../../components/ApplyFilters";
import { debounce } from "lodash";
import { useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";


const Leads = () => {
  // State to manage the Add Lead modal visibility

  // Context to manage sidebar and mobile menu states
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useContext(UserContext);

  // State to manage leads data and filter options
  const [getLeadsData, setGetLeadsData] = React.useState([]);

  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // State For Applying Filters
  const [filterOn, setFilterOn] = React.useState(false);

  // State For Search input value
  const [searchValue, setSearchValue] = useState("");

  // Fetch leads on component mount
  useEffect(() => {
    const loadLeads = async () => {
      const data = await fetchLeads({ search: "", status: [] });
      setGetLeadsData(data);
    };
    loadLeads();
    console.log("useEffect called");
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      const data = await fetchLeads({ search: value, status: [] });
      setGetLeadsData(data);
    }, 500),
    []
  );

  //Function For Handle Search Change
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

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
            <span className="text-[#64748b] font-normal text-[14px] mt-[4px]">
              Manage And Track Your Leads
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          className="flex gap-2 items-center bg-[#0080ff] text-white sm:px-4 px-4  h-[40px] rounded-[6px] hover:bg-blue-600 transition-colors"
        >
          <FaPlus />
          <span className="font-[500] text-[14px] text-[#fff]">Add Lead</span>
        </button>

        {isAddLeadModalOpen && (
          <AddLeadsModal
            isAddLeadModalOpen={isAddLeadModalOpen}
            setIsAddLeadModalOpen={setIsAddLeadModalOpen}
            setGetLeadsData={setGetLeadsData}
          />
        )}
      </div>
      <div className="p-4 w-full flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="w-full sm:w-auto flex-1 relative">

          <IoSearchOutline className="flex absolute text-[14px] text-[#64768b] "/>
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full px-3 py-2 border border-[#64768b]  rounded-lg text-sm text-[#64768b] "
            onChange={handleSearchChange}
          />
          
</div>
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
          <ApplyFilters
            searchValue={searchValue}
            filterOn={filterOn}
            setFilterOn={setFilterOn}
            setGetLeadsData={setGetLeadsData}
          />
        )}
        <LeadsTable data={getLeadsData} />
      </div>
    </div>
  );
};

export default Leads;
