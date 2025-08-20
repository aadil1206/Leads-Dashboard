import React, { use, useCallback, useContext, useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { statusOptions } from "../constants/formOptions";
import { fetchLeads } from "../services/leadsService";
import UserContext from "../context/UserContext/Context";

const ApplyFilters = ({
  searchValue,
  setFilterOn,
  filterOn,
  setGetLeadsData,
}) => {
  // Context to manage status filters
  const { statusShow, setStatusShow } = useContext(UserContext);

  // State for selected status options
  const [fieldStatus, setFieldStatus] = useState([]);

  //Function For Handle Status Change
  const handleStatusChange = useCallback(
    (selected) => {
      setFieldStatus(selected ? selected.map((option) => option.value) : []);
    },
    [setFieldStatus]
  );

  // State For Selected checkbox in filter
  const [matchType, setMatchType] = useState("AND");

  //Function For Add Filter Status
  const addFilterStatus = useCallback(() => {
    setStatusShow([...fieldStatus]);
    setFieldStatus([]);
  }, [fieldStatus, setStatusShow]);

  //Function For Clear Filters Status
  const clearFiltersStatus = useCallback(async () => {
    setStatusShow([]);
    setFieldStatus([]);
    setFilterOn(false);
    const data = await fetchLeads({ search: searchValue, status: "" });
    setGetLeadsData(data);
  }, [searchValue, setStatusShow, setFilterOn, setGetLeadsData]);

  //Function For Apply Filters Status
  const applyFiltersStatus = useCallback(async () => {
    const data = await fetchLeads({ search: searchValue, status: statusShow });
    setGetLeadsData(data);
    setFilterOn(false);
  }, [searchValue, statusShow, setGetLeadsData, setFilterOn]);

  return (
    <div className="p-4 border rounded-lg border-[#64748b] shadow-sm">
      <h2 className="font-bold text-lg mb-4">Advanced Filters</h2>
      <div className="flex flex-col gap-2 border-b border-[64748b] pb-4 mb-4">
        <div className="mb-4 flex sm:flex-row flex-col gap-4 text-[14px]">
          <span>Match</span>
          <div className="flex  gap-2 sm:flex-row flex-col">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="matchType"
                value="AND"
                checked={matchType === "AND"}
                onChange={() => setMatchType("AND")}
              />
              ALL conditions (AND)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="matchType"
                value="OR"
                checked={matchType === "OR"}
                onChange={() => setMatchType("OR")}
              />
              ANY condition (OR)
            </label>
          </div>
        </div>

        <div className="flex  gap-3 w-full flex-col">
          <div className="w-full flex gap-2 flex-col sm:flex-row">
            <Select
              value={statusOptions.filter((opt) =>
                fieldStatus.includes(opt.value)
              )}
              onChange={handleStatusChange}
              options={statusOptions}
              placeholder="Select field"
              className="2xl:w-[20%] lg:w-[35%] sm:w-[50%] w-full"
              isMulti
            />

            <Select
              // value={value}
              // onChange={(selected) => setValue(selected)}
              // options={valueOptions}
              placeholder="Select value"
              isDisabled={true}
              className=" 2xl:w-[80%] lg:w-[65%] sm:w-[50%] w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3 ">
            {Array.isArray(statusShow) &&
              statusShow.length > 0 &&
              statusShow.map((status, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-[#020817] text-[#fff] rounded-full text-sm flex items-center gap-1"
                >
                  {status}
                  <button
                    onClick={() =>
                      setStatusShow(statusShow.filter((s) => s !== status))
                    }
                    className="text-white "
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={addFilterStatus}
          className="border border-[#64748b] px-4 py-1 rounded-[5px] hover:bg-gray-100 bg-white text-[#020817] w-fit"
        >
          Add Filter
        </button>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={clearFiltersStatus}
          className="border border-[#64748b] px-4 h-[40px]   rounded-[6px] hover:bg-gray-100 bg-white text-[#020817]"
        >
          Clear
        </button>
        <button
          onClick={applyFiltersStatus}
          className="bg-[#020817] text-white px-4 h-[40px]   rounded-[6px]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(ApplyFilters);
